const express = require("express")
const Contact = require("../model/contactmodel")
const contactRouting = express.Router();
let nodemailer = require('nodemailer')


contactRouting.post('/contact', async (req, res) => {



  try {

    const data = new Contact(req.body);
    const resultset = await data.save();
    res.send(resultset);

    console.log(req.body);
    
    const { name, email, message } = req.body

    let trasport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yugendrakumar21@gmail.com',
        pass: 'wdlo gsan ftyv qion',

      }
    })
    let mailOptions = {
      // from: `${email}`,
            from: `yugendrakumar21@gmail.com`,

      to: 'aviligondayugendra18@gmail.com',
      subject: `Contact Us Form Submission`,
      text: `name : ${name},email:${email} , message:${message}`
    };

    trasport.sendMail(mailOptions, (err, info) => {
      if (err) throw err
      res.send(' Mail sent successfully');

    });
  }
  catch (err) {
    res
      .status(500)
      .send({ error: "Failed to Send Mail ", details: err.message })
  }
})


contactRouting.get("/contact", async (req, res) => {
  try {
    const contactus = await Contact.find();
    res.send(contactus);
  } catch (err) {
    res.status(500).send({
      error: "Failed to Fetch Contact Us Data ",
      details: err.message,
    });
  }
});


module.exports = contactRouting;