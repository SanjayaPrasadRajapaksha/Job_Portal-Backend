import sendSubmitDataToCompany from '../config/sendSubmitDataToCompany.config.js';
import sendSubmitDataToJobSeeker from '../config/sendSubmitDataToJobSeeker.config.js';

export async function sendJobApplicationMail({
  applicantName,
  applicantEmail,
  message,
  jobTitle,
  companyEmail,
  companyName,
  cvAttachment
}) {
  // Send to company
  await sendSubmitDataToCompany({
    applicantName,
    applicantEmail,
    message,
    jobTitle,
    companyEmail,
    companyName,
    attachments: cvAttachment ? [cvAttachment] : []
  });
  // Send to job seeker
  await sendSubmitDataToJobSeeker({
    applicantName,
    applicantEmail,
    message,
    jobTitle,
    companyEmail,
    companyName,
    attachments: cvAttachment ? [cvAttachment] : []
  });
}
