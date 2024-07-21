import  bcrypt  from 'bcrypt';
import db from "@repo/db/client"
import { sendVerificationEmail } from '../../api/send/route'

export async function POST(req:Request){
    const body=await req.json();
    const {email,password,number}=body
    
    try {
      const existingUser=await db.user.findFirst({
        where:{
          email:email,
          isVerified:true
        }
      });
      let verifycode = Math.floor(100000 + Math.random() * 900000).toString();
      if(existingUser)
        {
          if(existingUser.isVerified)
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
            existingUser.verifyCode=verifycode
            existingUser.verifycodeExpiry= new Date(Date.now() + 3600000);
          }
        }
      else{
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser= await db.user.create({
          data:{
            email:email,
            number:number,
            password:hashedPassword,
            verifyCode:verifycode,
            isVerified:false,
            verifycodeExpiry:new Date(Date.now()+3600000)
          }
        });
      }
      console.log("Error is in sing-up /api 1:")

    const emailResponse=await sendVerificationEmail(email,verifycode);
        console.log(emailResponse);
        if (!emailResponse.success) {
          return Response.json(
            {
              success: false,
              message: emailResponse.message,
            },
            { status: 500 }
          );
        }
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
