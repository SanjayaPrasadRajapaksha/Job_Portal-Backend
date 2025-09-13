import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const sendJobApplicationMail = async (email, { jobTitle, company }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"JobCore.lk" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: `Your Application for ${jobTitle} at ${company}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JobCore.lk - Application Submitted</title>
</head>
<body style="margin:0; padding:0; background-color:#f0fdf4; font-family:Arial, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f0fdf4">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
        
        <!-- Header / Logo -->
        <tr>
          <td align="center" bgcolor="#bbf7d0" style="padding:30px;">
           <div style="display:inline-block; text-align:left;">
    <div style="font-size:28px; font-weight:bold; color:#004d25; position:relative; line-height:1;">
      <a href="https://jobcore.lk" target="_blank"
         style="color:#004d25; text-decoration:none;">
        JobCore.<span style="color:#004d25;">lk</span>
        <sup style="font-size:12px; color:#facc15;">®</sup>
      </a>
    </div>
    <!-- Half-width gradient underline -->
    <div style="
      height:3px;
      width:50%;
      max-width:85px; /* Half of 170px, adjust as needed */
      margin-top:6px;
      background: linear-gradient(90deg, #facc15 0%, #28a745 100%);
      border-radius: 3px;
    "></div>
    <p style="margin:8px 0 0; font-size:14px; color:#004d25;">Connecting Employers & Job Seekers</p>
  </div>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px; color:#333;">
            <h2 style="margin:0 0 15px; color:#004d25; font-size:22px;">Hello,</h2>
            <p style="font-size:16px; line-height:1.6;">
              Your application for the position of <strong>${jobTitle}</strong> at <strong>${company}</strong> has been successfully submitted.
            </p>
            <p style="font-size:16px; line-height:1.6; margin-top:15px;">
              Please note that your application is currently <strong>awaiting admin approval</strong>. Once approved, we will notify you via email with further details.
            </p>
          </td>
        </tr>
        
   <!-- Motivational Tagline -->
        <tr>
          <td style="padding:20px 30px; text-align:center;">
            <p style="margin:0; font-size:15px; color:#004d25; font-style:italic; line-height:1.6;">
              “Your career growth is our priority — let’s build the future together.”
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
    });

    console.log("Applicant email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Failed to send applicant email:", error);
    throw new Error("Failed to send applicant email");
  }
};

export default sendJobApplicationMail;
