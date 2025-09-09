import { Eye, EyeClosed, GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { User } from "@/types/user.type";
// import { signin } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [eye, setEye] = useState<true | false>(false);
  const [user, setUser] = useState<User>();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = () => {
    // dispatch(signin(user as User));
    navigate("/dashboard");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault(), handleSubmit();
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">
              Welcome to <span className="underline">Notly</span>.
            </h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value } as User);
                }}
                value={user?.email}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={eye ? "text" : "password"}
                  placeholder="********"
                  required
                  className="pr-10"
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value } as User);
                  }}
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  {eye ? (
                    <EyeClosed
                      className="cursor-pointer text-gray-500"
                      onClick={() => setEye(false)}
                      size={18}
                    />
                  ) : (
                    <Eye
                      className="cursor-pointer text-gray-500"
                      onClick={() => setEye(true)}
                      size={18}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Sign in
          </Button>
        </div>
      </form>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
