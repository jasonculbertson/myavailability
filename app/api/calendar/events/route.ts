import { NextResponse } from 'next/server';
import { getGoogleCalendarEvents } from '@/lib/google-calendar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    if (!start || !end) {
      return NextResponse.json(
        { error: 'Missing start or end date' },
        { status: 400 }
      );
    }

    const startTime = new Date(start);
    const endTime = new Date(end);

    console.log('Fetching events for:', { startTime, endTime });
    const events = await getGoogleCalendarEvents(startTime, endTime);
    console.log('Retrieved events:', JSON.stringify(events, null, 2));
    
    return NextResponse.json(events);
  } catch (error: any) {
    console.error('Error in calendar events API:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch calendar events' },
      { status: 500 }
    );
  }
}
