// const nodemailer = require('nodemailer');
// const { google } = require('googleapis');

import nodemailer from 'nodemailer';
import { google } from 'googleapis';

import dotenv from 'dotenv';
dotenv.config();
// require('dotenv').config();

async function sendEmail(username, email, code) {


  console.log("sendEmail function called");
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

  // console.log(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN);

  const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

  oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });



  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'parthivva227@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    // const mailOptions = {
    //   from: 'News Aggregator <parthivva227@gmail.com>',
    //   to: `${email}`,
    //   subject: 'Test Email using Gmail API',
    //   text: 'This is a test email sent using Gmail API',
    //   html: '<h1>This is a test email sent using Gmail API</h1>',
    // };

    const mailOptions = {
      from: 'News Aggregator <parthivva227@gmail.com>',
      to: `${email}`,
      subject: 'Password Reset Verification Code',
      html: `<p>Dear ${username},</p>
           <p>We received a request to reset the password for your account on News Aggregator. To proceed, please use the verification code below:</p>
           <h2>Verification Code: ${code}</h2>
           <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
           <p>For security reasons, this code will expire in 7 minutes.</p>
           <p>Thank you for using News Aggregator!</p>
           <p>Best regards,<br>The News Aggregator Team</p>`,
    };


    const result = await transport.sendMail(mailOptions);
    return result;

  }
  catch (err) {
    return err;
  }
}

// module.exports = sendEmail;

export default sendEmail;