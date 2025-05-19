const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-order', async (req, res) => {
  const { name, email, phone, address, summary } = req.body;

  // Configure your email service
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
      user: 'andreitaborda01@gmail.com',
      pass: 'ncjs kwyw eqel fnsn', // Use App Password, NOT your Gmail password
    },
  });

  // Email to customer (friendly confirmation)
  const customerMailOptions = {
    from: 'andreitaborda01@gmail.com',
    to: email,
    subject: 'Your Order Confirmation',
    text: `
Hi ${name},

Thank you for your order!

Here’s your order summary:

${summary}

Delivery Address:
${address}

Phone: ${phone}

We will contact you shortly!
    `,
  };

  // Email to yourself (detailed order summary)
  const ownerMailOptions = {
    from: 'andreitaborda01@gmail.com',
    to: 'andreitaborda01@gmail.com',
    subject: `New Order from ${name}`,
    text: `
You received a new order:

Customer Name: ${name}
Email: ${email}
Phone: ${phone}
Address: ${address}

Order Summary:
${summary}

Please process this order accordingly.
    `,
  };

  try {
    // Send email to customer
    await transporter.sendMail(customerMailOptions);

    // Send email to yourself
    await transporter.sendMail(ownerMailOptions);

    res.status(200).json({ message: 'Order emails sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send order emails.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
