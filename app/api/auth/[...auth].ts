// app/api/auth/[...auth].ts
import { passportAuth } from "blitz"
import db from "db"
import { Strategy as GithubStrategy } from "passport-github"

export default passportAuth({
  successRedirectUrl: "/",
  errorRedirectUrl: "/",
  strategies: [
    {
      strategy: new GithubStrategy(
        {
          clientID: "53249fcb124466c5422f",
          clientSecret: "4436083d5115e6b1afc0f540a4d1c1bf0236303e",
          callbackUrl: "http://localhost:3000/api/auth/github/callback",
        },
        async function (_token, _tokenSecret, profile, done) {
          console.log(profile)
          const email = profile.emails && profile.emails[0]?.value

          if (!email) {
            // This can happen if you haven't enabled email access in your twitter app permissions
            return done(new Error("Github OAuth response doesn't have email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              name: profile.displayName,
            },
            update: { email },
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: "github",
          }
          done(undefined, { publicData })
        }
      ),
    },
  ],
})
