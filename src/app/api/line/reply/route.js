import * as dotenv from 'dotenv';
import { Client } from '@line/bot-sdk';
import { NextResponse } from 'next/server';

dotenv.config();

const { CHANNEL_SECRET, CHANNEL_TOKEN } = process.env;
const config = {
  channelSecret: CHANNEL_SECRET,
  channelAccessToken: CHANNEL_TOKEN
};
const client = new Client(config);

export function GET() {
  return NextResponse.json({ method: 'GET' });
}

export async function POST(request) {
  const req = await request.json();

  await Promise.all((req.events || []).map((event) => (async () => {
    switch(event.type) {
      case 'message': {
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: 'Hello World.'
        });
      }
    }
  })()));

  return NextResponse.json({ method: 'POST' });
}