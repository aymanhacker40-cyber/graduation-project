const ContactMessage = require("../models/ContactMessage");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendMessage = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    // 1) حفظ الرسالة في الداتا بيز
    await ContactMessage.create({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    });

    // 2) إرسال الإيميل باستخدام Resend
    await resend.emails.send({
      from: process.env.EMAIL_USER, // أو إيميل الدومين بتاعك لو موثّقه
      to: [process.env.EMAIL_USER], // الإيميل اللي هيستقبل الرسائل
      replyTo: email, // عشان ترد على صاحب الرسالة مباشرة
      subject: `📩 New Contact Message - ${subject || "No Subject"}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Send contact message error:", error);
    return res
      .status(500)
      .json({ message: "Server error while sending email" });
  }
};
