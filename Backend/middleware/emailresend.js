import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (email, verificationCode) => {
    try{
    const {data, error}=await resend.emails.send({
        // from: "Hey Mahajiban <website@resend.dev>",
        from: "Hey Mahajiban <onboarding@resend.dev>",
        to: email,
        subject: "Verification Code",
        text: `Your OTP is ${verificationCode}`,
    });
    if (error){
        return console.error({ error})
    }
    else{
        console.log(data);
    }
    }catch(error){
        console.error("Error sending email:", error.message);
    }
}
 
export default sendEmail;




