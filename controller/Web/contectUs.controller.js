const ContactUsModel = require("../../models/contectUs.schema");
const nodemailer = require('nodemailer');
const Admin = require("../../models/admin.schema");
exports.createContectUs = async (req, res) => {
  try {
    const contactUsData = req.body;
    if (!contactUsData.name || !contactUsData.email || !contactUsData.contact || !contactUsData.message || !contactUsData.bgImage) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContactUs = new ContactUsModel({
      contectUs: contactUsData
    });
    await newContactUs.save();
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getContectUs = async (req, res) => {
  try {
    const contactUs = await ContactUsModel.find();
    res.status(200).json(contactUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteContectUs = async (req, res) => {
  try {
    const contactUs = await ContactUsModel.findByIdAndDelete(req.params.id);
    if (!contactUs) {
      return res.status(404).json({ message: "Contact form not found" });
    }
    res.status(200).json({ message: "Contact form deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Send message using nodemailer
exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;
    const {nodemailerEmail,nodemailerPassword} = await Admin.findOne({});  

    if (!name || !email || !message || !subject) {
      return res.status(400).json({ message: "Name, email, message and subject are required" });
    }

    if (!nodemailerPassword || !nodemailerEmail) {
      return res.status(400).json({ message: "Admin email password not configured" });
    }

    // Create transporter with secure settings
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: nodemailerEmail, // Admin email
        pass: nodemailerPassword // Admin app password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Email options with proper structure
    const mailOptions = {
      from: `${nodemailerEmail}`,
      to: email, 
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message}
          </div>
        </div>
      `
    };

    // Send email and wait for response
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent successfully:', info.messageId);

    res.status(200).json({ 
      success: true,
      message: "Message sent successfully",
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ 
      success: false,
      message: "Failed to send email",
      error: error.message 
    });
  }
};
