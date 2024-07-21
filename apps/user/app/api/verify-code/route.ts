import db from '@repo/db/client';

export async function POST(request: Request) {

  try {
    const { email, code } = await request.json();
    console.log("Came to /api/verify-code")
    console.log("email:",email)
    console.log("code:",code)

    if (!code) {
      return Response.json({ error: ' Verify-Code is required.' }, { status: 400 });
    }

    const user = await db.user.findFirst({
      where:{
        email:email
      }
    });

    if (!user) {
      return Response.json(
        { success: false, message: 'User not Please Sign-Up' },
        { status: 404 }
      );
    }

    // Check if the code is correct and not expired
    console.log("user.verify code is :",user.verifyCode)
    const isCodeValid = (user.verifyCode==code)
    const expiryDate = new Date(user.verifycodeExpiry);
    const currentDate = new Date();
    const isCodeNotExpired = expiryDate > currentDate;
    console.log(isCodeNotExpired)
    try {
      if (isCodeValid && isCodeNotExpired) {
        await db.user.update({
          where: { email: email },
          data: { isVerified: true },
        });
        return Response.json(
          { success: true, message: 'Account verified successfully' },
          { status: 200 }
        );
      } else if (!isCodeNotExpired) {
        // Code has expired
        return Response.json(
          {
            success: false,
            message:
              'Verification code has expired. Please sign up again to get a new code.',
          },
          { status: 400 }
        );
      } else {
        // Code is incorrect
        return Response.json(
          { success: false, message: 'Incorrect verification code' },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('Error while verifying code: ', error);
      return Response.json(
        { success: false, message: 'Error while verifying code' },
        { status: 500 });
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return Response.json(
      { success: false, message: 'Error verifying user' },
      { status: 500 }
    );
  }
}
