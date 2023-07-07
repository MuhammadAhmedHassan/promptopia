import { User } from '@models/user.model'
import { connectToDB } from '@utils/database'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

console.log({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
})

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user?.email,
      })
      if (session.user) {
        // @ts-ignore
        session.user.id = sessionUser._id.toString()
      }
      return session
    },
    async signIn({ profile }) {
      try {
        await connectToDB()

        // Check if a user already exists
        const existingUser = await User.findOne({ email: profile?.email })

        // If not, create a new user
        if (!existingUser) {
          console.log({ profile })

          await User.create({
            email: profile?.email,
            username: profile?.name?.replaceAll(' ', '_').toLowerCase(),
            // @ts-ignore
            image: profile?.picture,
          })
        }
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
