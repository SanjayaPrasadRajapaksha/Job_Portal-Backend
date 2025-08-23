import nodemailer from "nodemailer";

export default async function sendSubmitDataToCompany({
  applicantName,
  applicantEmail,
  message,
  jobTitle,
  companyEmail,
  companyName,
  attachments = [],
}) {
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
      to: companyEmail,
      replyTo: applicantEmail, // company can reply directly to applicant
      subject: `New Application for ${jobTitle}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>JobCore.lk - New Application</title>
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
            <h2 style="margin:0 0 15px; color:#004d25; font-size:22px;">New Application for ${jobTitle}</h2>
            <p style="font-size:16px; line-height:1.6;">
              <strong>${applicantName}</strong> has applied for the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.
            </p>
            <p style="font-size:15px; margin-top:15px;">
              <b>Email:</b> <a href="mailto:${applicantEmail}" style="color:#004d25; text-decoration:none;">${applicantEmail}</a><br/>
              <b>Message:</b><br/>
              <span style="display:inline-block; margin-top:8px; padding:12px; background:#fff8e1; border-left:4px solid #facc15; border-radius:4px; font-size:14px; color:#444; line-height:1.5;">
                ${message || "No message provided"}
              </span>
            </p>

            <!-- CTA Button -->
            <p style="margin-top:25px;">
              <a href="mailto:${applicantEmail}?subject=Regarding%20${encodeURIComponent(
        jobTitle
      )}" style="display:inline-block; padding:12px 25px; background-color:#004d25; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold;">
                Reply to Applicant
              </a>
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
      attachments,
    });

    console.log("Company email sent:", info.response);
    return info;
  } catch (err) {
    console.error("Error sending company email:", err);
    throw err;
  }
}
