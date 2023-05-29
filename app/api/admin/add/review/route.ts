export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/db';
import { v4 as uuid } from 'uuid';
import { insertReviewSchema, reviews } from '@/db/schemas';

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
  console.log(body);

  if (!body) {
    return NextResponse.json({ response: 'No body', status: 400 });
  }

  const review = insertReviewSchema.parse(body);

  const res = await db.insert(reviews).values(review);

  if (res.rowsAffected === 1) {
    return NextResponse.json({ response: 'OK', status: 200 });
  } else {
    return NextResponse.json({ response: 'Error', status: 500 });
  }
}
