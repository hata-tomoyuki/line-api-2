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
  return NextResponse.json({
    method: 'GET'
  });
}

export async function POST() {
  try {
    const messages = [{
      type: 'text',
      text: 'Hello World.'
    }];

    await client.broadcast(messages);
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({
    method: 'POST'
  });
}