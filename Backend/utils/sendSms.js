


const sendSms = async (options) => {
 
    const accountSid = 'ACbe4b8533d6ae800c06e3e560f8935432';
const authToken = "926ef444032dea29b9c7abb80ce49364";
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+13158475769',
     to: '+917227981091'
   })
  .then(message => console.log(message.sid));
};

module.exports = sendSms;