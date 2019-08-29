"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config()


function email(emailUser, subject, text, html) {
  async function main() {

    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        username: process.env.USER,
        password: process.env.PASSWORD
      }
    });

    let info = await transporter.sendMail({
      from: process.env.USER,
      to: emailUser,
      subject: subject,
      text: text,
    });





  }
  main().catch(console.error);
}

module.exports = email