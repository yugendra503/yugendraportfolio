const express = require("express");
const Contact = require("../model/contactmodel");
const contactRouting = express.Router();
let nodemailer = require("nodemailer");

contactRouting.post("/contact", async (req, res) => {
  try {
    const data = new Contact(req.body);
    const savedData = await data.save();

    // Send response only once
    res.status(200).json({ message: "Contact Saved Successfully", savedData });

    const { name, email, message } = req.body;

    // Gmail SMTP (Correct for Render)
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // MUST BE TRUE for Gmail
      auth: {
       user: 'yugendrakumar21@gmail.com',
        pass: 'wdlo gsan ftyv qion',
      },
    });

    let mailOptions = {
      from: process.env.GMAIL_USER,
      to: "aviligondayugendra18@gmail.com",
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transport.sendMail(mailOptions, (err, info) => {
      if (err) console.log("Email Error:", err);
      else console.log("Email Sent:", info.response);
    });

  } catch (err) {
    res.status(500).send({
      error: "Failed to Save or Send Mail",
      details: err.message,
    });
  }
});

module.exports = contactRouting;
