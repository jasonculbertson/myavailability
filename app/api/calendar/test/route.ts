import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { google } from 'googleapis'

export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    )

    oauth2Client.setCredentials({
      access_token: session.accessToken as string,
    })

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    // Get the next 10 events
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = response.data.items

    return NextResponse.json({ 
      message: 'Calendar connection successful!',
      events: events?.map(event => ({
        id: event.id,
        summary: event.summary,
        start: event.start,
        end: event.end
      }))
    })
  } catch (error: any) {
    console.error('Calendar test error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch calendar events',
      details: error.message 
    }, { 
      status: 500 
    })
  }
}
