import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import { Profile, Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";

config();

const app = express();

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Configure Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken: string, refreshToken: string, profile: Profile, done) => {
      // Save/find user in DB here
      return done(null, profile);
    }
  )
);

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Home Page");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    res.redirect("/profile");
  }
);

app.get("/profile", (req: Request, res: Response) => {
  if (!req.user) return res.redirect("/");
  res.send(`Hello, ${(req.user as any).displayName}`);
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
