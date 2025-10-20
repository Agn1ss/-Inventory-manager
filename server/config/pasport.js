import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../prisma/prisma-client.js";
import dotenv from "dotenv";
import ApiError from "../exceptions/api-error.js";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const provider = "google";
        const providerId = profile.id;
        const email = profile.emails?.[0]?.value;
        let name = email.split("@")[0];

        const existingUser = await prisma.user.findUnique({ where: { name } });
        if(existingUser) {
          const randomIndex = Math.random().toString(36).substring(2, 5);
          name += `_${randomIndex}`;
        }

        let userOAuth = await prisma.userOAuth.findUnique({
          where: { provider_providerId: { provider, providerId } },
          include: { user: true },
        });

        let user;

        if (!userOAuth) {
          user = await prisma.user.findUnique({ where: { email } });

          if (!user) {
            user = await prisma.user.create({
              data: { name, email, role: "USER" },
            });
          }

          userOAuth = await prisma.userOAuth.create({
            data: { provider, providerId, userId: user.id },
            include: { user: true },
          });
        } else {
          user = userOAuth.user;
        }

        return done(null, user);
      } catch (error) {
        console.error(error);
        done(error, null);
      }
    }
  )
);



export default passport;
