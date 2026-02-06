import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendContactEmails = async (data) => {
    const userMailOptions = {
        from: `"Princy Shah Consulting" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: 'Thank You for Reaching Out!',
        text: `Hi ${data.firstName},\n\nThank you for contacting us. We have received your message and will get back to you shortly.`
    };

    const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.FOUNDER_EMAIL,
        subject: 'New Website Inquiry',
        html: `
            <h3>New Message Details:</h3>
            <p><b>Name:</b> ${data.firstName} ${data.lastName}</p>
            <p><b>Email:</b> ${data.email}</p>
            <p><b>Company:</b> ${data.company || 'N/A'}</p>
            <p><b>Message:</b> ${data.message}</p>
        `
    };

    return Promise.all([
        transporter.sendMail(userMailOptions),
        transporter.sendMail(adminMailOptions)
    ]);
};