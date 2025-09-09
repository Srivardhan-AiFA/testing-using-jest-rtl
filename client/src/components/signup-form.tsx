// import { Eye, EyeClosed, GalleryVerticalEnd } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { signupAPI } from "@/features/auth/authSlice";
// import type { AppDispatch, RootState } from "@/app/store";

// export function SignupForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const [eye, setEye] = useState(false);
//   const [user, setUser] = useState<{
//     username: string;
//     email: string;
//     password: string;
//   }>({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [errorMessage, setError] = useState<string>();

//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const userResponse = useSelector((state: RootState) => state.user);

//   // const handleSubmit = async () => {
//   //   try {
//   //     await dispatch(signupAPI(user));
//   //     console.log("control", userResponse);
//   //     if (userResponse.error) {
//   //       setError(userResponse.error);
//   //       console.log("error message ", errorMessage);
//   //       return;
//   //     } else {
//   //       navigate("/signin");
//   //     }
//   //   } catch (error) {
//   //     if (error instanceof Error) {
//   //       setError(error.message);
//   //     } else {
//   //       setError(String(error));
//   //     }
//   //   }
//   // };
//   const handleSubmit = async () => {
//     try {
//       await dispatch(signupAPI(user)).unwrap();
//       navigate("/signin"); // only runs if signup succeeded
//     } catch (error) {
//       if (error instanceof Error) {
//         setError(error.message);
//       } else {
//         setError(String(error));
//       }
//     }
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <p className="text-red-500 text-sm">{errorMessage}</p>
//       <p>ERROR: {JSON.stringify(errorMessage)}</p>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleSubmit();
//         }}
//       >
//         <div className="flex flex-col gap-6">
//           <div className="flex flex-col items-center gap-2">
//             <a
//               href="#"
//               className="flex flex-col items-center gap-2 font-medium"
//             >
//               <div className="flex size-8 items-center justify-center rounded-md">
//                 <GalleryVerticalEnd className="size-6" />
//               </div>
//               <span className="sr-only">Notely</span>
//             </a>
//             <h1 className="text-xl font-bold">
//               Welcome to <span className="underline">Notely</span>.
//             </h1>
//           </div>

//           <div className="flex flex-col gap-6">
//             {/* Username */}
//             <div className="grid gap-3">
//               <Label htmlFor="username">Username</Label>
//               <Input
//                 id="username"
//                 type="text"
//                 placeholder="Mark"
//                 required
//                 value={user.username}
//                 onChange={(e) => setUser({ ...user, username: e.target.value })}
//               />
//             </div>

//             {/* Email */}
//             <div className="grid gap-3">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="mark@notely.com"
//                 required
//                 value={user.email}
//                 onChange={(e) => setUser({ ...user, email: e.target.value })}
//               />
//             </div>

//             {/* Password */}
//             <div className="grid gap-3">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Input
//                   id="password"
//                   type={eye ? "text" : "password"}
//                   placeholder="********"
//                   required
//                   className="pr-10"
//                   value={user.password}
//                   onChange={(e) =>
//                     setUser({ ...user, password: e.target.value })
//                   }
//                 />
//                 <div className="absolute inset-y-0 right-3 flex items-center">
//                   {eye ? (
//                     <EyeClosed
//                       className="cursor-pointer text-gray-500"
//                       onClick={() => setEye(false)}
//                       size={18}
//                     />
//                   ) : (
//                     <Eye
//                       className="cursor-pointer text-gray-500"
//                       onClick={() => setEye(true)}
//                       size={18}
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <Button
//             type="submit"
//             className="w-full cursor-pointer"
//             disabled={status === "loading"}
//           >
//             {status === "loading" ? "Signing up..." : "Sign up"}
//           </Button>
//         </div>
//       </form>

//       <div className="text-center text-sm">
//         Already have an account?{" "}
//         <Link to="/signin" className="underline underline-offset-4">
//           Sign in
//         </Link>
//       </div>

//       <div className="text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
//         By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
//         and <a href="#">Privacy Policy</a>.
//       </div>
//     </div>
//   );
// }

// src/features/auth/SignupForm.tsx
import { Eye, EyeClosed, GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupAPI } from "../features/auth/authSlice";
import type { AppDispatch, RootState } from "@/app/store";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [eye, setEye] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setError] = useState<string>();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.user);

  const handleSubmit = async () => {
    try {
      await dispatch(signupAPI(user)).unwrap();
      navigate("/signin"); // only runs if signup succeeded
    } catch (error) {
      setError(error as string); // error comes from rejectWithValue
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
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
              <span className="sr-only">Notely</span>
            </a>
            <h1 className="text-xl font-bold">
              Welcome to <span className="underline">Notely</span>.
            </h1>
          </div>

          {/* Username */}
          <div className="grid gap-3">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Mark"
              required
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          {/* Email */}
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="mark@notely.com"
              required
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={eye ? "text" : "password"}
                placeholder="********"
                required
                className="pr-10"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
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

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </Button>
        </div>
      </form>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/signin" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>

      <div className="text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}
    </div>
  );
}
