import { Request, Response } from "express";
import { google } from "googleapis";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import dotenv from "dotenv";
import { User } from "../models/users.model";

dayjs.extend(utc);
dotenv.config();

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { summary, description, start, end, attendees } = req.body;
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

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const event = {
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
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      sendUpdates: "all",
    });

    return res
      .status(201)
      .json({ message: "Event created successfully", event: response.data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
};
