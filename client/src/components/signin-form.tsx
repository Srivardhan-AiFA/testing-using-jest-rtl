import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // This URL should point to your backend OAuth route

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md"></div>
              <span className="sr-only">Notly</span>
            </a>
            <h1 className="text-xl font-bold">
              Welcome to <span className="underline">Notly</span>.
            </h1>
          </div>

          {/* Email + password inputs reomoved */}

          {/* Google OAuth Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => {
              window.location.href = "http://localhost:3000/auth/google";
            }}
          >
            Continue with Google
          </Button>
        </div>
      </form>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
