import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, type EventForm } from "@/zod/form.zod";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  if (token) localStorage.setItem("token", token);

  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EventForm>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      summary: "",
      description: "",
      startTime: "",
      endTime: "",
      attendees: [{ email: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attendees",
  });

  const onSubmit = async (data: EventForm) => {
    setMessage("loading...");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Unauthorized");
        return;
      }

      const eventPayload = {
        summary: data.summary,
        description: data.description,
        start: {
          dateTime: new Date(data.startTime).toISOString(),
          timeZone,
        },
        end: {
          dateTime: new Date(data.endTime).toISOString(),
          timeZone,
        },
        attendees: data.attendees.filter((a) => a.email.trim() !== ""),
      };

      const formData = new FormData();
      formData.append("eventData", JSON.stringify(eventPayload));
      if (file) formData.append("file", file);

      const response = await axios.post<{ message: string }>(
        `${import.meta.env.VITE_BACKEND_URL}/calendar/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
      reset();
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong");
    }
  };

  if (!token) return <h1>Unauthorized</h1>;

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <h2 className="text-2xl font-semibold outfit ml-1 mb-2">Add Event</h2>

      {message && (
        <p className="text-center mt-2 font-semibold mb-4">{message}</p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 border-2 p-4 rounded-md inter"
      >
        {/* Title */}
        <div>
          <Label className="mb-2 after:content-['*'] after:text-red-500">
            Title
          </Label>
          <Input placeholder="Team Sync Meeting" {...register("summary")} />
          {errors.summary && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.summary.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label className="mb-2 after:content-['*'] after:text-red-500">
            Description
          </Label>
          <Textarea
            placeholder="Weekly sync-up with the product team..."
            rows={5}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Recipients */}
        <div>
          <Label className="mb-2 after:content-['*'] after:text-red-500">
            Recipients
          </Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <div className="flex-1">
                <Input
                  placeholder="email@example.com"
                  {...register(`attendees.${index}.email`)}
                />
                {errors.attendees?.[index]?.email && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.attendees[index]?.email?.message}
                  </p>
                )}
              </div>

              {fields.length > 1 && (
                <span onClick={() => remove(index)}>
                  <Trash size={15} className="text-red-600 cursor-pointer" />
                </span>
              )}
            </div>
          ))}

          {errors.attendees && (
            <p className="text-red-500 text-xs mt-1 ml-1">
              {errors.attendees?.message as string}
            </p>
          )}
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={() => append({ email: "" })}
          >
            + Add another recipient
          </Button>
        </div>

        {/* Time */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="mb-2 after:content-['*'] after:text-red-500">
              From
            </Label>
            <Input type="datetime-local" {...register("startTime")} />
            {errors.startTime && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.startTime.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Label className="mb-2 after:content-['*'] after:text-red-500">
              To
            </Label>
            <Input type="datetime-local" {...register("endTime")} />
            {errors.endTime && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {errors.endTime.message}
              </p>
            )}
          </div>
        </div>

        {/* File upload */}
        <div>
          <div className="flex gap-1">
            <Label className="mb-2">File</Label>
            <span className="text-xs text-gray-500">(optional)</span>
          </div>
          <Input
            type="file"
            className="cursor-pointer"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
        {file && (
          <>
            <p className="text-sm font-medium">PDF Preview:</p>
            <iframe
              src={URL.createObjectURL(file)}
              width="100%"
              height="400px"
              className="border rounded-md"
            />
          </>
        )}

        <Button type="submit" className="mt-4 cursor-pointer">
          Create Event
        </Button>
      </form>
    </div>
  );
}
