const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// POST route to receive order data and send email
app.post('/send-order', async (req, res) => {
  const { name, email, phone, address, summary } = req.body;

  // Configure transporter with your Gmail and App Password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'andreitaborda01@gmail.com',      // Change to your email
      pass: 'ydql hxhq hsie hnsg'           // Change to your App Password
    }
  });

  const mailOptions = {
    from: 'andreitaborda01@gmail.com',         // Same as above
    to: email,                           // Send to customer email
    subject: 'Your Sarap ng Lutong Bahay Order Summary',
    text: `Hi ${name}!\n\nHere’s a summary of your order:\n\n${summary}\n\nDelivery Address:\n${address}\n\nWe’ll contact you at ${phone} if needed.\n\nThank you!`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).send({ message: 'Failed to send email.', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
