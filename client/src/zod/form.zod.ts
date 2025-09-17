import { z } from "zod";

export const eventSchema = z
  .object({
    summary: z.string().min(3, "Title must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
    startTime: z.string().nonempty("Start time is required"),
    endTime: z.string().nonempty("End time is required"),
    attendees: z
      .array(
        z.object({
          email: z
            .email({ message: "Enter email address" })
            .regex(/^[A-Za-z0-9._%+-]+@(gmail\.com)$/, {
              message: "Only @gmail.com allowed",
            }),
        })
      )
      .min(1, "At least one recipient is required"),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
  });
