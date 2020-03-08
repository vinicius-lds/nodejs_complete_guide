const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.NODEMAILER_API_KEY
    }
  })
);

const from = process.env.NODEMAILER_EMAIL_FROM;

module.exports = {
  sendMail(mail) {
    return new Promise(() => {}); //transporter.sendMail({ from: from,  ...mail})
  }
};
