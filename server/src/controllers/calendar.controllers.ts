import { Request, Response } from "express";
import { google } from "googleapis";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import dotenv from "dotenv";
import { User } from "../models/users.model";
import { v4 as uuid } from "uuid";
import { Readable } from "stream";

dayjs.extend(utc);
dotenv.config();

interface EventData {
  summary: string;
  description: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  attendees: { email: string }[];
}

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { summary, description, start, end, attendees }: EventData =
      JSON.parse(req.body.eventData);

    const file = req.file;
    if (file) {
      console.log("File received:", file.originalname);
      console.log("Buffer length:", file.buffer.length);
    }

    const email = (req as any).email;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const { refreshToken } = user;

    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    );

    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    const accessTokenResponse = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token;
    if (!accessToken)
      return res.status(500).json({ message: "Failed to get access token" });
    // oAuth2Client.setCredentials({ access_token: accessToken });
    // oAuth2Client.setCredentials({ refresh_token: "" });

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
    const drive = google.drive({ version: "v3", auth: oAuth2Client });

    let event: any = {
      summary,
      description,
      start: {
        dateTime: dayjs(start.dateTime).toISOString(),
        timeZone: start.timeZone,
      },
      end: {
        dateTime: dayjs(end.dateTime).toISOString(),
        timeZone: end.timeZone,
      },
      attendees: attendees.map((a: { email: string }) => ({ email: a.email })),
      conferenceData: { createRequest: { requestId: uuid() } },
    };

    if (file) {
      const bufferStream = new Readable();
      bufferStream.push(file.buffer);
      bufferStream.push(null);

      const fileResponse = await drive.files.create({
        requestBody: {
          name: file.originalname,
          parents: [process.env.DRIVE_FOLDER_ID!],
        },
        media: { mimeType: file.mimetype, body: bufferStream },
        fields: "id, webViewLink",
      });

      await drive.permissions.create({
        fileId: fileResponse.data.id!,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      // Add Drive attachment
      event.attachments = [
        {
          fileId: fileResponse.data.id!,
          title: file.originalname,
          mimeType: file.mimetype,
        },
      ];

      // Optionally add link in description too
      event.description = `${description || ""}\n\nView Attached file: ${
        fileResponse.data.webViewLink
      }`;
    }

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      sendUpdates: "all",
      conferenceDataVersion: 1,
    });

    return res
      .status(201)
      .json({ message: "Event created successfully", event: response.data });
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.message });
    }

    return res.status(500).json({ message: "Something went wrong" });
  }
};
