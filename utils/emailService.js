import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const BRAND_NAME = "Princy Shah Consulting";
const PRIMARY_COLOR = "#005fb8";
const WEBSITE_URL = "https://princyshahconsulting.in";
const LOGO_URL = "https://princyshahconsulting.in/assets/PSC_logo-TtvDBtkc.jpeg"; 

const FROM_EMAIL = "Princy Shah Consulting <princy@princyshahconsulting.in>";
const REPLY_TO = "princyshahconsulting@gmail.com";

export const sendContactEmails = async (data) => {
  /* ================= CLIENT EMAIL ================= */
  const clientHtml = `
  <div style="background:#eef2f7;padding:50px 12px;font-family:Segoe UI,Arial,sans-serif;">
    <div style="max-width:620px;margin:auto;background:#ffffff;
                border-radius:22px;overflow:hidden;
                box-shadow:0 30px 60px rgba(0,0,0,0.18);">

      <!-- HEADER -->
      <div style="background:linear-gradient(135deg, ${PRIMARY_COLOR}, #002b55);
                  padding:45px 30px;text-align:center;">
        <img src="${LOGO_URL}" alt="${BRAND_NAME}"
             style="height:70px;margin-bottom:18px;
                    filter:drop-shadow(0 6px 12px rgba(0,0,0,0.35));" />
        <h1 style="color:#ffffff;margin:0;font-size:26px;">
          Thank you, ${data.firstName}
        </h1>
        <p style="color:#dbeafe;margin-top:10px;font-size:15px;">
          We’ve received your message
        </p>
      </div>

      <!-- BODY -->
      <div style="padding:40px 35px;color:#334155;line-height:1.7;">
        <div style="background:#ffffff;border-radius:18px;padding:28px;
                    border:1px solid #e5eaf0;
                    box-shadow:inset 0 0 18px rgba(0,0,0,0.04);">
          <p style="font-size:18px;margin-top:0;">
            Hello ${data.firstName},
          </p>
          <p>
            Thank you for contacting <strong>${BRAND_NAME}</strong>.
            Our team is reviewing your inquiry and will get back to you
            within <strong>24–48 hours</strong>.
          </p>
          <p>
            We look forward to connecting with you.
          </p>
        </div>

        <!-- CTA -->
        <div style="margin-top:36px;text-align:center;">
          <a href="${WEBSITE_URL}"
             style="background:linear-gradient(135deg, ${PRIMARY_COLOR}, #004a99);
                    color:#ffffff;padding:16px 34px;
                    border-radius:14px;
                    text-decoration:none;font-weight:600;
                    display:inline-block;
                    box-shadow:0 14px 28px rgba(0,95,184,0.45);">
            Visit Our Website
          </a>
        </div>
      </div>

      <!-- FOOTER -->
      <div style="background:#f1f5f9;padding:22px;text-align:center;
                  font-size:12px;color:#64748b;">
        © 2026 ${BRAND_NAME}<br/>
        Strategy • Growth • Excellence
      </div>
    </div>
  </div>`;

  const clientText = `
Thank you for contacting ${BRAND_NAME}.

We’ve received your message and will get back to you within 24–48 hours.

Website: ${WEBSITE_URL}
`;

  /* ================= ADMIN EMAIL ================= */
  const adminHtml = `
  <div style="background:#0b1220;padding:50px 12px;font-family:Segoe UI,Arial,sans-serif;">
    <div style="max-width:620px;margin:auto;background:#111827;
                border-radius:26px;overflow:hidden;
                box-shadow:0 40px 80px rgba(0,0,0,0.55);">

      <!-- HEADER -->
      <div style="padding:36px;text-align:center;
                  background:linear-gradient(135deg, #020617, #0f172a);">
        <img src="${LOGO_URL}" alt="Logo"
             style="height:52px;margin-bottom:16px;" />
        <div style="display:inline-block;background:#38bdf8;color:#020617;
                    padding:6px 18px;border-radius:999px;
                    font-size:12px;font-weight:700;">
          NEW INQUIRY
        </div>
        <h2 style="color:#f8fafc;margin:18px 0 0;">
          Lead Details
        </h2>
      </div>

      <!-- CONTENT -->
      <div style="padding:40px;">
        <div style="background:rgba(255,255,255,0.04);
                    border-radius:20px;padding:30px;
                    border:1px solid rgba(255,255,255,0.08);">

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;color:#94a3b8;">Name</td>
              <td style="padding:8px 0;color:#e5e7eb;font-weight:600;text-align:right;">
                ${data.firstName} ${data.lastName}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#94a3b8;">Email</td>
              <td style="padding:8px 0;color:#38bdf8;text-align:right;">
                ${data.email}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#94a3b8;">Company</td>
              <td style="padding:8px 0;color:#e5e7eb;text-align:right;">
                ${data.company || "Not Specified"}
              </td>
            </tr>
          </table>

          <div style="margin-top:26px;padding-top:26px;
                      border-top:1px solid rgba(255,255,255,0.12);">
            <p style="color:#94a3b8;font-size:13px;margin-bottom:10px;">
              Message
            </p>
            <div style="background:#020617;padding:22px;
                        border-radius:14px;color:#cbd5f5;
                        font-style:italic;">
              “${data.message}”
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>`;

  const adminText = `
New inquiry received.

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Company: ${data.company || "Not specified"}

Message:
${data.message}
`;

  /* ================= SEND EMAILS ================= */
  return Promise.all([
    resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: "Thank you for contacting Princy Shah Consulting",
      replyTo: REPLY_TO,
      html: clientHtml,
      text: clientText,
      headers: {
        "List-Unsubscribe": `<mailto:${REPLY_TO}>`,
      },
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: process.env.FOUNDER_EMAIL,
      subject: `New Inquiry from ${data.firstName}`,
      replyTo: data.email,
      html: adminHtml,
      text: adminText,
    }),
  ]);
};
