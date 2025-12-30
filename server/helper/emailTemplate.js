import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const emailTemplate = async ({ to, subject, html }) => {
    try {
        const data = await resend.emails.send({
            from: "My Blog App <no-reply@yourdomain.com>",
            to,
            subject,
            html
        });
        return data;
    }
    catch (error) {
        console.log("Resend send error:", error);
        throw new Error("Email not sent");
    }
};

export default emailTemplate;