import  bcrypt  from 'bcrypt';
import db from "@repo/db/client"
import { sendVerificationEmail } from '../../api/send/route'
import {sendEmail} from "../../../mail/mailer"
export async function POST(req:Request){
  console.log("came to /api/sign-up");
    const body=await req.json();
    const {email,password}=body
    
    try {
      const existingUser=await db.user.findFirst({
        where:{
          email:email,
        }
      });

      const verifyTokenEncoded = (await bcrypt.hash(email,10)).toString();
      console.log(verifyTokenEncoded);
      if(existingUser)
        {
          if(existingUser.isverified)
          {
              return Response.json(
                {
                  success:false,
                  message:"User Already Exists from this Email"
                },
                {status:400}
                )
          }
          else{
            const hashedPassword=await bcrypt.hash(password,10);
            existingUser.password=hashedPassword
            existingUser.verifyToken=verifyTokenEncoded
            existingUser.verifyTokenExpiry= new Date(Date.now() + 3600000);
            existingUser.createdAt= new Date(Date.now())
          }
        }
      else{
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser= await db.user.create({
          data:{
            email:email,
            password:hashedPassword,
            isverified:false,
            verifyToken:verifyTokenEncoded,
            verifyTokenExpiry:new Date(Date.now()+3600000),
            createdAt: new Date(Date.now())
          }
        });
      }
      console.log("Error is in sing-up /api 1:")

    const emailResponse=await sendEmail({email,verifyTokenEncoded});
        console.log(emailResponse);
        // if (!emailResponse.success) {
        //   return Response.json(
        //     {
        //       success: false,
        //       message: emailResponse.message,
        //     },
        //     { status: 500 }
        //   );
        // }
        return Response.json(
          {
            success: true,
            message: 'User registered successfully. Please verify your account.',
          },
          { status: 201 }
     );
        
     } catch (error) 
    {
      console.error('Error registering user:', error);
      return Response.json(
        {
          success: false,
          message: "Error registering user:",
        },
        { status: 500 })
    }
    

    
}
