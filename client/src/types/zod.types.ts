import type { eventSchema } from "@/zod/form.zod";
import type z from "zod";

export type EventForm = z.infer<typeof eventSchema>;
