import { NextRequest, NextResponse } from 'next/server';
import { proxyUrl } from '@/lib/api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const proxyResponse = await fetch(proxyUrl('/api/auth/signup'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(body),
      cache: 'no-cache',
    });

    if (!proxyResponse.ok) {
      const errorData = await proxyResponse.json();
      const response = NextResponse.json(errorData, {
        status: proxyResponse.status,
      });

      return response;
    }

    const data = await proxyResponse.json();
    const response = NextResponse.json(data, { status: proxyResponse.status });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        code: 'SERVER_ERROR',
        message:
          error instanceof Error ? error.message : '서버에 연결할 수 없습니다.',
      },
      { status: 500 }
    );
  }
}
