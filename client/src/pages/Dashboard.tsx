import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/zod/form.zod";
import type { EventForm } from "@/types/zod.types";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function Dashboard() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  if (token) localStorage.setItem("token", token);

  const [message, setMessage] = useState<string>("");

  const notify = (val: boolean) => {
    if (val) {
      toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error("Failed to create event", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

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
    setMessage("loading");
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

  useEffect(() => {
    if (message === "Event created successfully") {
      notify(true);
    } else if (message === "loading") {
      console.log(message);
    } else {
      notify(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  if (!token) return <h1>Unauthorized</h1>;

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <h2 className="text-2xl font-semibold outfit ml-1 mb-2">Add Event</h2>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {message === "loading" && (
        <div
          role="status"
          className="absolute bg-gray-500 h-screen w-full -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 flex justify-center items-center opacity-40"
        >
          <svg
            aria-hidden="true"
            className="h-15 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
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
