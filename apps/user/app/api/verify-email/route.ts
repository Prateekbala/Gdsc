import { NextResponse } from 'next/server';
import db from '@repo/db/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, verifyTokenEncoded } = body;
    console.log("Came to /api/verify-email");
    console.log("email:", email);
    console.log("code:", verifyTokenEncoded);

    if (!email) {
      return NextResponse.json({ error: 'Error in api/Verify-email' }, { status: 400 });
    }

    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Please First Sign-Up' },
        { status: 404 }
      );
    }

    console.log("user.verify code is :", user.verifyToken);
    console.log("verify token is :", verifyTokenEncoded);
    const isCodeValid = user.verifyToken === verifyTokenEncoded;
    const expiryDate = new Date(user.verifyTokenExpiry);
    const currentDate = new Date();
    const isCodeNotExpired = expiryDate > currentDate;
    console.log(isCodeValid);
    console.log(isCodeNotExpired);

    if (isCodeValid && isCodeNotExpired) {
      await db.user.update({
        where: { email: email },
        data: { isverified: true },
      });
      return NextResponse.json(
        { success: true, message: 'Account verified successfully' },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Verification Link has expired. Please sign up again to get a new Link.',
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: 'Incorrect verification Link' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return NextResponse.json(
      { success: false, message: 'Error verifying user' },
      { status: 500 }
    );
  }
}
