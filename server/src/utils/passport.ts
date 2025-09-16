import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";
import { User } from "../models/users.model";
import { generateToken } from "./jwt.utils";

config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/auth/google/redirect",
      passReqToCallback: true,
    },
    async (_, accessToken, refreshToken, profile, done) => {
      // console.log("Refresh Token:", refreshToken);
      // console.log("Profile:", profile);
      try {
        if (profile) {
          let user = await User.findOne({ email: profile.emails![0].value });

          if (user) {
            user.refreshToken = refreshToken;
            await user.save();
          } else {
            user = await User.create({
              username: profile.name!["givenName"],
              email: profile.emails![0].value,
              name: profile.displayName,
              googleId: profile.id,
              refreshToken,
            });
          }
          const token = generateToken(profile.emails![0].value);
          (user as any).token = token;
          return done(null, user);
        }
      } catch (err) {
        return done(err, false);
      }
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

export default passport;
