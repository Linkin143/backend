import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const PRIMARY_COLOR = "#005fb8";

export const sendContactEmails = async (data) => {
    /* ================= CLIENT EMAIL ================= */
    const clientHtml = `
  <div style="background-color: #f0f4f8; padding: 40px 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 1px solid #e1e8ed;">
      <div style="background: linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #003366 100%); padding: 40px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Pricy Shah Consulting</h1>
        <h4 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Thank You, ${data.firstName}!</h4>
      </div>
      <div style="padding: 40px; color: #334155; line-height: 1.6;">
        <div style="background: #ffffff; border-radius: 15px; padding: 25px; box-shadow: inset 0 0 10px rgba(0,0,0,0.02); border: 1px solid #f1f5f9;">
          <p style="font-size: 18px; margin-top: 0;">We've received your message.</p>
          <p>Our team is reviewing your inquiry and will get back to you within 24-48 hours. We are excited about the possibility of working together!</p>
        </div>
        <div style="margin-top: 30px; text-align: center;">
          <a href="https://princyshahconsulting.in/" style="background: ${PRIMARY_COLOR}; color: white; padding: 15px 30px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block; box-shadow: 0 10px 20px rgba(0,95,184,0.3);">
            Visit Our Website
          </a>
        </div>
      </div>
      <div style="background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
        © 2026 Princy Shah Consulting. All rights reserved.
      </div>
    </div>
  </div>`;

    /* ================= ADMIN EMAIL ================= */
    const adminHtml = `
  <div style="background-color: #0f172a; padding: 40px 10px; font-family: 'Segoe UI', sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 24px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.4); border: 1px solid #334155;">
      <div style="padding: 30px; border-bottom: 1px solid #334155; text-align: center;">
        <span style="background: #38bdf8; color: #0f172a; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">New Inquiry</span>
        <h2 style="color: #f8fafc; margin-top: 15px;">Lead Details</h2>
      </div>
      <div style="padding: 40px;">
        <div style="background: rgba(255,255,255,0.03); border-radius: 20px; padding: 30px; border: 1px solid rgba(255,255,255,0.05);">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; font-size: 14px;">Sender Name</td>
              <td style="padding: 10px 0; color: #f8fafc; font-weight: 600; text-align: right;">${data.firstName} ${data.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; font-size: 14px;">Email</td>
              <td style="padding: 10px 0; color: #38bdf8; text-align: right;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; font-size: 14px;">Company</td>
              <td style="padding: 10px 0; color: #f8fafc; text-align: right;">${data.company || "Not Specified"}</td>
            </tr>
          </table>
          <div style="margin-top: 25px; padding-top: 25px; border-top: 1px solid #334155;">
            <p style="color: #94a3b8; font-size: 14px; margin-bottom: 10px;">Message Preview:</p>
            <div style="background: #0f172a; padding: 20px; border-radius: 12px; color: #cbd5e1; border: 1px solid #334155; font-style: italic;">
              "${data.message}"
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

    const from = "Princy Shah Consulting <onboarding@resend.dev>";

    return Promise.all([
        resend.emails.send({
            from,
            to: data.email,
            subject: "We Received Your Message! | Princy Shah Consulting",
            replyTo: "princyshahconsulting@gmail.com",
            html: clientHtml,
        }),
        resend.emails.send({
            from,
            to: process.env.FOUNDER_EMAIL,
            subject: `🚀 New Lead: ${data.firstName} from ${data.company || "Direct"}`,
            replyTo: data.email, // replying goes directly to the lead
            html: adminHtml,
        }),
    ]);

};
