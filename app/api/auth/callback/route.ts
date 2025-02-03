import { NextResponse } from "next/server"
import { google } from "googleapis"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = `${process.env.VERCEL_URL || "http://localhost:3000"}/api/auth/callback`

const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 })
  }

  try {
    const { tokens } = await oauth2Client.getToken(code)
    oauth2Client.setCredentials(tokens)

    // Get user info
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client })
    const { data } = await oauth2.userinfo.get()

    // Here you would typically save the tokens and user info to your database
    // For this example, we'll just return it to the client
    return NextResponse.json({
      user: data,
      tokens,
    })
  } catch (error) {
    console.error("Error during authentication:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

