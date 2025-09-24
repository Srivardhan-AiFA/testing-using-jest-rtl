import passport from "passport";
import { Profile, Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";
import { User } from "../models/users.model";

config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done
    ) => {
      if (!profile.emails) {
        return done("user email not found", profile);
      }

      let user = await User.findOne({ email: profile.emails[0].value });
      if (!user) {
        user = await User.create({
          id: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
        });
      }

      return done(null, user);
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
