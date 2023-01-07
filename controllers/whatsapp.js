require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 

// const accountSid = "AC999ceef40ba07605c5d88d2af4282a41"
// const authToken = "83769b6a49080acef66a6a41a15a7a9d"

const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: 'nueva prueba envio node', 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+5493815189763' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();


