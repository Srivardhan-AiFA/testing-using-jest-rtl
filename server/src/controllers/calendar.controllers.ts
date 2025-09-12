import { Request, Response } from "express";
import nodemailer from "nodemailer";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import dotenv from "dotenv";

dayjs.extend(utc);

export const addEvent = async (req: Request, res: Response) => {
  dotenv.config();
  try {
    const data = req.body;

    // Convert to Google Calendar UTC format
    const start = dayjs(data.startTime).utc().format("YYYYMMDDTHHmmss[Z]");
    const end = dayjs(data.endTime).utc().format("YYYYMMDDTHHmmss[Z]");

    const googleCalLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      data.title
    )}&details=${encodeURIComponent(
      data.description
    )}&dates=${start}/${end}&location=${encodeURIComponent(
      data.location || ""
    )}&add=${encodeURIComponent(data.recpientEmail)}`;

    // 👇 Human-friendly formatting
    const prettyStart = dayjs(data.startTime).format(
      "dddd, MMMM D, YYYY h:mm A"
    );
    const prettyEnd = dayjs(data.endTime).format("dddd, MMMM D, YYYY h:mm A");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "slinterop@gmail.com",
        pass: process.env.MAIL_SECRET,
      },
    });

    const mailOptions = {
      from: "youfriend@gmail.com",
      to: data.recpientEmail,
      subject: `${data.title}`,
      html: `
      <table style="font-family:Arial, sans-serif; background:#f4f6f8; padding:20px; border-radius:8px;">
        <tr>
          <td>
            <h2 style="margin:0; color:#111;">Meeting Invitation</h2>
            <p style="margin:10px 0;">You have a meeting scheduled. Here are the details:</p>

            <p><b>Title:</b> ${data.title}</p>
            <p><b>Description:</b> ${data.description}</p>
            <p><b>Starts:</b> ${prettyStart}</p>
            <p><b>Ends:</b> ${prettyEnd}</p>

            <a href="${googleCalLink}" target="_blank"
              style="display:inline-block; margin:15px 0; padding:10px 16px; background:#2563eb; color:#fff; font-weight:bold; text-decoration:none; border-radius:6px;">
              Add to Google Calendar
            </a>
          </td>
        </tr>
      </table>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("ERROR: ", err);
        return res.status(500).json({ error: "Mail not sent" });
      }
      console.log("MAIL SENT: ", info.response);
      return res.status(200).json({ success: true, message: "Invite sent!" });
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
