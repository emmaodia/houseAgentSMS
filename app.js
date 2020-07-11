const express = require('express');
require('dotenv').config();
const cron = require('node-cron');
const app = express();

const port = process.env.PORT || 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const sendSms = (phone, message) => {
  const client = require('twilio')(accountSid, authToken);
  
  client.messages
      .create({
         body: message,
         from: process.env.TWILIO_PHONE_NUMBER,
         to: phone
       })
      .then(message => console.log(message.sid));
}

cron.schedule('*/5 * * * *', () => {
    console.log('SMS Sent successfully!');
    sendSms("+2347056355433", "This is from the server!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;