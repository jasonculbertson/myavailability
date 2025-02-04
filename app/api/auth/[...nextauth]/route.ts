import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"

interface ExtendedSession extends Session {
  accessToken?: string
}

interface ExtendedToken extends JWT {
  accessToken?: string
}

export const authOptions = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Google({
      id: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            'https://www.googleapis.com/auth/calendar.readonly',
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
          ].join(' '),
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: ExtendedToken; account: any }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }: { session: ExtendedSession; token: ExtendedToken }) {
      session.accessToken = token.accessToken
      return session
    },
  },
  pages: {
    signIn: '/',
  },
  debug: true, // Temporarily enable debug for troubleshooting
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
