import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

type Mail = {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: Date | undefined;
  recpientEmail: string;
};

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [message, setMessage] = useState<string>("");

  const [mailData, setMailData] = useState<Mail>({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    date: undefined,
    recpientEmail: "",
  });

  const handleSubmit = async () => {
    setMessage("loading");
    const startUTC = new Date(mailData.startTime).toISOString();
    const endUTC = new Date(mailData.endTime).toISOString();

    const updatedMailData = {
      ...mailData,
      startTime: startUTC,
      endTime: endUTC,
    };

    try {
      const response = await axios.post<{ message: string }>(
        `${import.meta.env.VITE_BACKEND_URL}/calendar/send`,
        updatedMailData
      );
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
    }
  };

  return (
    <div>
      {message && (
        <p className="text-center mt-2 font-semibold inter">{message}</p>
      )}

      <div className="max-w-1/3 mx-auto mt-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* Title */}
          <Label className="mb-2">Title</Label>
          <Input
            placeholder="Team Sync Meeting"
            required
            onChange={(e) =>
              setMailData({ ...mailData, title: e.target.value })
            }
          />

          {/* Description */}
          <div className="mt-3">
            <Label className="mb-2">Description</Label>
            <Textarea
              placeholder="Weekly sync-up with the product team..."
              required
              rows={5}
              onChange={(e) =>
                setMailData({ ...mailData, description: e.target.value })
              }
            />
          </div>

          {/* Recipients */}
          <div className="mt-6">
            <Label className="mb-2">Add Recipients</Label>
            <Input
              placeholder="yourcolleague@gmail.com"
              required
              onChange={(e) =>
                setMailData({ ...mailData, recpientEmail: e.target.value })
              }
            />
          </div>

          {/* Date */}
          <div className="mt-5">
            <Label htmlFor="date" className="px-1 mb-2">
              Select a date
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(selected) => {
                    setDate(selected);
                    setMailData({ ...mailData, date: selected });
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time */}
          <div className="mt-3 flex gap-2">
            <div className="mt-2">
              <Label className="mb-2">From</Label>
              <Input
                type="datetime-local"
                required
                onChange={(e) =>
                  setMailData({ ...mailData, startTime: e.target.value })
                }
              />
            </div>
            <div className="mt-2">
              <Label className="mb-2">To</Label>
              <Input
                type="datetime-local"
                required
                onChange={(e) =>
                  setMailData({ ...mailData, endTime: e.target.value })
                }
              />
            </div>
          </div>

          <Button type="submit" className="mt-4 cursor-pointer">
            Set Mail
          </Button>
        </form>
      </div>
    </div>
  );
}
