require('dotenv').config();
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// Read recipient emails from a file or array
const recipientEmails = fs.readFileSync('recipients.txt', 'utf-8').split('\n').filter(email => email.trim() !== "");

async function sendMail(recipient) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "sathyamudili07@gmail.com",
                pass: "pdiz xcig pegz keei"
            }
        });

        let mailOptions = {
            from: `"Satyam Naidu Mudili" <sathyamudili9394@gmail.com>`,
            to: recipient,
            subject: "Application for QA Automation Engineer Position",
            text: `Dear Sir/Madam,

I hope you’re doing well.

I am writing to express my interest in the QA Automation Engineer role. With 2.5 years of experience in software testing and automation, I have expertise in Selenium, Playwright and WebdriverIO, developing automated test scripts in JavaScript and Java. Additionally, I have experience in API testing, reporting integration, and building CI/CD pipelines using Jenkins to streamline automation workflows.

I have attached my resume for your review and would welcome the opportunity to discuss how my skills align with your team’s needs. Please feel free to contact me at +91-9951409912 or sathyamudili07@gmail.com to arrange an interview at your convenience.

Looking forward to your response.

Best Regards,
Satyam Naidu Mudili,
9951409912,
sathyamudili07@gmail.com
http://www.linkedin.com/in/satyamnaidumudili`,
            attachments: [
                {
                    filename: "Resume.pdf",
                    path: "./tests/Satyam_QA_Automation.pdf"
                }
            ]
        };

        let info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${recipient}: ${info.response}`);
    } catch (error) {
        console.error(`Error sending email to ${recipient}:`, error);
    }
}

async function sendBulkEmails() {
    console.log(`Starting to send emails to ${recipientEmails.length} recipients...`);
    for (let i = 0; i < recipientEmails.length; i++) {
        const recipient = recipientEmails[i];
        console.log(`Sending email to ${recipient} (${i + 1}/${recipientEmails.length})`);

        await sendMail(recipient);
        
        // Delay between emails to avoid spam filters (e.g., 2 seconds)
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
    console.log("All emails sent!");
}

sendBulkEmails();
