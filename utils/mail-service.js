const nodemailer = require("nodemailer");
require("dotenv").config();

const passwordResetTemplate = (token) => {
  return `<!DOCTYPE html>
      <html>
      <head>
          <meta charset='UTF-8' />
          <title>Password Reset</title>
      </head>
      <body>
          <h1>Hello 👻</h1>
          <p>Click <a href="${process.env.DOMAIN}/password-reset/${token}">here</a> or on the link to reset your password:</p>
          <a href="${process.env.DOMAIN}/password-reset/${token}">${process.env.DOMAIN}/password-reset/${token}</a>
      </body>
      </html>`;
};

const marketerRequestReceivedTemplate = (fullname) => {
  return `<!DOCTYPE html>
      <html>
      <head>
          <meta charset='UTF-8' />
          <title>Marketer Partnership</title>
      </head>
      <body>
          <h1>Hello, ${fullname}</h1>
          <p>Your request to become a marketer has successfully been received. We'll be back to you in 3 days to discuss with you about the terms of the partnership. After this date, without any response from us, consider your request to have been rejected.</p>
      </body>
      </html>`;
};

const accountCreatedTemplate = (user) => {
  return `<!DOCTYPE html>
      <html>
      <head>
          <meta charset='UTF-8' />
          <title>Account Created</title>
      </head>
      <body>
          <h1>Hello, ${user.fullname}</h1>
          <p>Your account has successfully been created. Here are your credentials :</p>
          <ul>
              <li>Login: ${user.email}</li>
              <li>Password: ${user.password}</li>
          </ul>
          <p>Make sure you keep them secret for yourself.</p>
      </body>
      </html>`;
};

// async..await is not allowed in global scope, must use a wrapper
const sendMail = async (receiver, object = "", user = {}) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  let mailObject = "Marketer Partnership Request ✔";
  let htmlTemplate = marketerRequestReceivedTemplate(user.fullname);

  switch (object) {
    case "password-reset":
      mailObject = "Password Reset Request ✔";
      htmlTemplate = passwordResetTemplate(user.token);
      break;
    case "account-created":
      mailObject = "Account Created ✔";
      htmlTemplate = accountCreatedTemplate(user);
      break;
    default:
      mailObject = "Marketer Partnership Request ✔";
      break;
  }

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAIL_USER, // sender address
    to: receiver, // list of receivers
    subject: mailObject, // Subject line
    html: htmlTemplate, // html body
  });

  return info;
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@address.com>
};

module.exports = sendMail;
