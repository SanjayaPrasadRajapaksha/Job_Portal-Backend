import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();

const sendEmail = async (email, message, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Thank You for Contacting JobCore.lk",
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JobCore.lk - Thank You</title>
</head>
<body style="margin:0; padding:0; background-color:#fff8e1; font-family:Arial, sans-serif;">

<!-- Main container -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#fff8e1">
  <tr>
    <td align="center">

      <!-- Inner container -->
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
        
        <!-- Header / Logo -->
        <tr>
          <td align="center" bgcolor="#fff9b0" style="padding:30px;">
            <h1 style="margin:0; font-size:28px; color:#004d25; font-weight:bold;">
              JobCore.<span style="color:#004d25;">lk</span><sup style="font-size:12px; color:#facc15;">®</sup>
            </h1>
            <p style="margin:8px 0 0; font-size:14px; color:#004d25;">Connecting Employers & Job Seekers</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px; color:#333;">
            <h2 style="margin:0 0 15px; color:#004d25; font-size:22px;">Hello ${name},</h2>
            <p style="font-size:16px; line-height:1.6;">
              Thank you for reaching out to <strong>JobCore.lk</strong>. We’ve received your message, and our team will get back to you as soon as possible.
            </p>
            <p style="margin-top:20px; font-size:16px; color:#555; font-style:italic;">
              “Your career growth is our priority — let’s build the future together.”
            </p>

            <!-- CTA Button -->
            <p style="margin-top:25px;">
              <a href="https://jobcore.lk" style="display:inline-block; padding:12px 25px; background-color:#004d25; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold;">Visit JobCore.lk</a>
            </p>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td>
            <hr style="border:0; border-top:1px solid #eee; margin:0 30px;" />
          </td>
        </tr>

        <!-- Social Media -->
        <tr>
          <td align="center" style="padding:20px;">
            <p style="font-size:14px; color:#004d25; margin-bottom:10px;">Connect with us:</p>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td><a href="https://facebook.com/jobcorelk" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" width="32" alt="Facebook" style="display:block;"></a></td>
                <td width="10"></td>
                <td><a href="https://twitter.com/jobcorelk" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" width="32" alt="Twitter" style="display:block;"></a></td>
                <td width="10"></td>
                <td><a href="https://linkedin.com/company/jobcorelk" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" width="32" alt="LinkedIn" style="display:block;"></a></td>
                <td width="10"></td>
                <td><a href="https://instagram.com/jobcorelk" target="_blank"><img src="https://cdn-icons-png.flaticon.com/512/733/733558.png" width="32" alt="Instagram" style="display:block;"></a></td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" bgcolor="#f4f4f4" style="padding:15px; font-size:12px; color:#666;">
            &copy; ${new Date().getFullYear()} JobCore.lk. All Rights Reserved.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>

  `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;
