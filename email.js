import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const upload = multer({ dest: 'uploads/' }); // Lưu tạm file upload

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.VITE_EMAIL_ACCOUNT,
    pass: process.env.VITE_EMAIL_PASSWORD,
  },
});


app.post('/api/send-email', upload.single('image'), async (req, res) => {
  try {
    const { candidateName, emails, subject, message } = req.body;
    const emailList = JSON.parse(emails);

    let attachments = [];
    if (req.file) {
      attachments.push({
        filename: req.file.originalname,
        path: req.file.path,
      });
    }

    const mailOptions = {
      from: `"${candidateName}" <your-email@gmail.com>`,
      to: emailList,
      subject: subject,
      text: message,
      attachments,
    };

    const info = await transporter.sendMail(mailOptions);

    if (req.file) fs.unlinkSync(req.file.path);

    console.log('Email sent:', info.response);
    res.status(200).send('Email đã được gửi thành công!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Có lỗi xảy ra khi gửi email.');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
