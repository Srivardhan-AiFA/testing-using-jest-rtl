import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";

type Attendee = {
  email: string;
};

type Mail = {
  summary: string;
  description: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  attendees: Attendee[];
};

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  if (token) localStorage.setItem("token", token);

  const [message, setMessage] = useState<string>("");

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(timeZone);

  const [mailData, setMailData] = useState<Mail>({
    summary: "",
    description: "",
    startTime: "",
    endTime: "",
    timeZone: timeZone,
    attendees: [{ email: "" }],
  });

  // Add a new recipient input
  const addRecipient = () => {
    setMailData({
      ...mailData,
      attendees: [...mailData.attendees, { email: "" }],
    });
  };

  // Update a specific attendee's email
  const updateRecipient = (index: number, email: string) => {
    const updatedAttendees = [...mailData.attendees];
    updatedAttendees[index].email = email;
    setMailData({ ...mailData, attendees: updatedAttendees });
  };

  const handleSubmit = async () => {
    setMessage("loading...");

    const eventPayload = {
      summary: mailData.summary,
      description: mailData.description,
      start: {
        dateTime: new Date(mailData.startTime).toISOString(),
        timeZone: mailData.timeZone,
      },
      end: {
        dateTime: new Date(mailData.endTime).toISOString(),
        timeZone: mailData.timeZone,
      },
      attendees: mailData.attendees.filter((a) => a.email.trim() !== ""),
    };

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post<{ message: string }>(
        `${import.meta.env.VITE_BACKEND_URL}/calendar/create`,
        eventPayload,
        config
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  if (!token) {
    return <h1>Unauthorized</h1>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10">
      {message && <p className="text-center mt-2 font-semibold">{message}</p>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex flex-col gap-4"
      >
        {/* Title */}
        <div>
          <Label className="mb-2">Title</Label>
          <Input
            placeholder="Team Sync Meeting"
            required
            value={mailData.summary}
            onChange={(e) =>
              setMailData({ ...mailData, summary: e.target.value })
            }
          />
        </div>

        {/* Description */}
        <div>
          <Label className="mb-2">Description</Label>
          <Textarea
            placeholder="Weekly sync-up with the product team..."
            required
            rows={5}
            value={mailData.description}
            onChange={(e) =>
              setMailData({ ...mailData, description: e.target.value })
            }
          />
        </div>

        {/* Recipients */}
        <div>
          <Label className="mb-2">Recipients</Label>
          {mailData.attendees.map((attendee, idx) => (
            <Input
              key={idx}
              placeholder="email@example.com"
              required
              value={attendee.email}
              onChange={(e) => updateRecipient(idx, e.target.value)}
              className="mb-2"
            />
          ))}
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={addRecipient}
          >
            + Add another recipient
          </Button>
        </div>

        {/* Time */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="mb-2">From</Label>
            <Input
              type="datetime-local"
              required
              value={mailData.startTime}
              onChange={(e) =>
                setMailData({ ...mailData, startTime: e.target.value })
              }
            />
          </div>
          <div className="flex-1">
            <Label className="mb-2">To</Label>
            <Input
              type="datetime-local"
              required
              value={mailData.endTime}
              onChange={(e) =>
                setMailData({ ...mailData, endTime: e.target.value })
              }
            />
          </div>
        </div>

        <Button type="submit" className="mt-4 cursor-pointer">
          Create Event
        </Button>
      </form>
    </div>
  );
}
