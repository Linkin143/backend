import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.FOUNDER_EMAIL) {
    throw new Error("Missing EMAIL_USER, EMAIL_PASS, or FOUNDER_EMAIL in .env");
}


const PRIMARY_COLOR = "#005fb8";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});





export const sendContactEmails = async (data) => {
    /* ---------- CLIENT EMAIL ---------- */
    const clientHtml = `
  <div style="background-color:#f0f4f8;padding:40px 10px;font-family:Segoe UI,Tahoma,sans-serif">
    <div style="max-width:600px;margin:auto;background:#fff;border-radius:20px;overflow:hidden;border:1px solid #e1e8ed">
      <div style="background:linear-gradient(135deg,${PRIMARY_COLOR},#003366);padding:40px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:28px">Princy Shah Consulting</h1>
        <h3 style="color:#fff;margin:0;font-size:28px">Thank You, ${data.firstName}!</h3>
      </div>

      <div style="padding:40px;color:#334155">
        <p style="font-size:18px">We’ve received your message.</p>
        <p>Our team will get back to you within 24–48 hours.</p>

        <div style="margin-top:30px;text-align:center">
          <a href="https://princyshahconsulting.in"
             style="background:${PRIMARY_COLOR};color:#fff;padding:15px 30px;
                    border-radius:10px;text-decoration:none;font-weight:bold">
            Visit Our Website
          </a>
        </div>
      </div>

      <div style="background:#f8fafc;padding:20px;text-align:center;font-size:12px;color:#94a3b8">
        © 2026 Princy Shah Consulting. All rights reserved.
      </div>
    </div>
  </div>`;

    /* ---------- ADMIN EMAIL ---------- */
    const adminHtml = `
  <div style="background:#0f172a;padding:40px 10px;font-family:Segoe UI,sans-serif">
    <div style="max-width:600px;margin:auto;background:#1e293b;border-radius:24px;overflow:hidden">
      <div style="padding:30px;text-align:center">
        <h2 style="color:#f8fafc">New Lead Received</h2>
      </div>

      <div style="padding:40px;color:#e5e7eb">
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company || "Not specified"}</p>

        <p style="margin-top:20px"><strong>Message:</strong></p>
        <div style="background:#020617;padding:20px;border-radius:12px">
          "${data.message}"
        </div>
      </div>
    </div>
  </div>`;

    
    const fromField = `"Princy Shah Consulting" <${process.env.EMAIL_USER}>`;

    const userMailOptions = {
        from: fromField,
        to: data.email,
        subject: "We Received Your Message | Princy Shah Consulting",
        html: clientHtml,
    };

    const adminMailOptions = {
        from: fromField,
        to: process.env.FOUNDER_EMAIL,
        subject: `🚀 New Lead: ${data.firstName} (${data.company || "Direct"})`,
        html: adminHtml,
    };

    return Promise.all([
        transporter.sendMail(userMailOptions),
        transporter.sendMail(adminMailOptions),
    ]);
};
