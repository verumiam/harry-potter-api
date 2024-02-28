import { apiURL } from '@/constants';
import { NextResponse } from 'next/server';

export async function GET() {
  if (!apiURL) {
    throw new Error('API URL is not defined');
  }

  const students = await fetch(apiURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const studentsData = await students.json();

  return new NextResponse(JSON.stringify(studentsData), {
    status: 200,
  });
}
