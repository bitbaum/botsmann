const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure mongoose
mongoose.set("strictQuery", false);

// Define schema
const ConsultationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create model
const Consultation =
  mongoose.models.Consultation ||
  mongoose.model("Consultation", ConsultationSchema);

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = async (req, res) => {
  console.log("API called with method:", req.method);
  console.log("Request body:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Connect to MongoDB
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (dbConnectionError) {
    console.error("Error connecting to MongoDB:", dbConnectionError);
    return res.status(500).json({ error: "Database connection failed" });
  }

  try {
    // Save to database
    const consultation = new Consultation({ name, email, message });
    console.log("Saving to database:", consultation);
    await consultation.save();
    console.log("Saved to database");
  } catch (dbSaveError) {
    console.error("Error saving to database:", dbSaveError);
    return res
      .status(500)
      .json({ error: "Failed to save data to the database" });
  }

  try {
    // Send email to customer
    console.log("Sending email to customer...");
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for contacting Botsmann",
      html: `
                <h1>Thank you for reaching out!</h1>
                <p>Hello ${name},</p>
                <p>We've received your message and will get back to you shortly.</p>
                <p>Best regards,<br>Botsmann Team</p>
            `,
    });
    console.log("Customer email sent");
  } catch (emailError) {
    console.error("Error sending Customer email:", emailError);
    return res.status(500).json({ error: "Failed to send confirmation email" });
  }

  // Optionally send email to admin
  try {
    console.log("Sending email to admin...");
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: "New Botsmann Consultation Request",
      html: `
                <h2>New consultation request received:</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
    });
    console.log("Admin email sent");
  } catch (adminEmailError) {
    console.error("Error sending admin email:", adminEmailError);
  }

  // Final success response
  res
    .status(200)
    .json({ success: true, message: "Email submitted successfully" });
};
