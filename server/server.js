const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();

// Then use the environment variables:
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;
    console.log(`Subscription request received for: ${email}`);

    try {
        // Send welcome email
        await transporter.sendMail({
          from: '"DEV@Deakin" <' + process.env.EMAIL_USER + '>',
          to: email,
          subject: 'Welcome to DEV@Deakin Newsletter',
          text: 'Thank you for subscribing to our newsletter!',
          html: '<b>Thank you for subscribing to our newsletter!</b>'
        });

        res.json({ message: 'Subscribed successfully! Check your email for a welcome message.' });
      } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
      }
    });


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
