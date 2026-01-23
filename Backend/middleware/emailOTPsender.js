import nodemailer from "nodemailer";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, //587 port change to 465
    secure: true,//false change to true  // true for port 465, false for other ports
    // service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
    },
  });

// const sendEmail = async (email, verificationCode) => {
//   try {
//       await new Promise((resolve,reject) =>{
//         transporter.sendMail({
//           from: process.env.GMAIL_USER,
//           to: email,
//           subject: "Verification Code",
//           text: `Your OTP is ${verificationCode}`,
//         }, (err, info) => {
//           if (err) {
//             console.log(err);
//             reject(err);
//           } else {
//             console.log("Email sent successfully");
//             resolve(info);
//           }
//         });
//       })
//     await transporter.sendMail({
//       from: process.env.GMAIL_USER,
//       to: email,
//       subject: "Verification Code",
//       text: `Your OTP is ${verificationCode}`,
//     });

//     console.log("Email sent successfully");
//   } catch (error) {
//     console.error("Error sending email:", error.message);
//   }
// };

const sendEmail = async (email, verificationCode) => {
  try{
    const response = await axios.post('https://mailserver.automationlounge.com/api/v1/messages/send',{
      "to": email,
      "subject": "Verification Code",
      "text": `Your OTP is ${verificationCode}`
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.API_MAIL_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );
  console.log(response.data);
  }catch(error){
    console.error("Error sending email:", error.message);
  }
}

export default sendEmail;
