import { NextResponse } from "next/server"
import { google } from "googleapis"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const REDIRECT_URI = `${process.env.VERCEL_URL || "http://localhost:3000"}/api/auth/callback`

const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI)

export async function POST(request: Request) {
  const { accessToken, dateRange, duration } = await request.json()

  if (!accessToken || !dateRange || !duration) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  oauth2Client.setCredentials({ access_token: accessToken })

  const calendar = google.calendar({ version: "v3", auth: oauth2Client })

  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: dateRange.from,
        timeMax: dateRange.to,
        items: [{ id: "primary" }],
      },
    })

    // Process the response and calculate available slots
    // This is a placeholder and needs to be implemented
    const availableSlots = []

    return NextResponse.json({ availableSlots })
  } catch (error) {
    console.error("Error fetching availability:", error)
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 })
  }
}

