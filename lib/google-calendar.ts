import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getGoogleCalendarEvents(startTime: Date, endTime: Date) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.accessToken) {
      throw new Error('Not authenticated or missing access token');
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
      access_token: session.accessToken as string,
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items?.filter(event => 
      event.start?.dateTime && 
      event.end?.dateTime
    ) || [];

    return events;
  } catch (error) {
    console.error('Detailed error in getGoogleCalendarEvents:', error);
    throw error;
  }
}
