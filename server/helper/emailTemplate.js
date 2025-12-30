import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const emailTemplate = async ({ to, subject, html }) => {
    const { data, error } = await resend.emails.send({
        from: `My Blog App - <no-reply@gmail.com>`,
        to,
        subject,
        html
    });

    if (error) {
        console.log("Resend send error:", error);
        throw new Error("Email not sent");
    };

    return data;
};

export default emailTemplate;