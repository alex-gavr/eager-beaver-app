export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/db';
import { insertThematicEventsSchema, thematicEvents } from '@/db/schemas';
import { ZodError } from 'zod';

interface IBodyData {
  name: string;
  description: string;
  image: string;
}

export async function POST(request: NextRequest, response: NextResponse) {
  const { headers } = request;
  const auth = headers.get('Authorization');

  if (auth !== process.env.NEXT_PUBLIC_API_ROUTE_SECRET) {
    return NextResponse.json({ response: 'Unauthorized, fuck off', status: 401 });
  }

  const body = await request.json();

  if (!body) {
    return NextResponse.json({ response: 'No body', status: 400 });
  }

  const validEvent = await insertThematicEventsSchema.parseAsync(body).catch((err) => {
    if (err instanceof ZodError) {
      return err;
    }
    throw err;
  });

  if (validEvent instanceof ZodError) {
    return NextResponse.json({ response: 'Invalid body', status: 400 });
  }

  const res = await db.insert(thematicEvents).values(validEvent);

  if (res.rowsAffected === 1) {
    return NextResponse.json({ response: 'OK', status: 200 });
  } else {
    return NextResponse.json({ response: 'Error', status: 500 });
  }
}
