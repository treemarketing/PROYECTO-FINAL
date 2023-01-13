var nodemailer = require('nodemailer')

const TEST_MAIL = 'alvarosalomon@yahoo.com.ar'



const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    secure: false, // use SSL
    port: 587,
    auth: {
        user: 'cornell.treutel93@ethereal.email',
        pass: 'wugByz8hgj6qByeTrC'
    },
    tls: {
        rejectUnauthorized: false
    }
});



 
async function enviarEmailAdm(mailCompra){
    try {
        const info = await transporter.sendMail(mailCompra)
        console.log(info)
     } catch (err) {
        console.log(err)
     }
}



 async function enviarEmailCompra(mailCompra){
    try {
        const info = await transporter.sendMail(mailCompra)
        console.log(info)
     } catch (err) {
        console.log(err)
     }
}

 module.exports = (enviarEmailAdm,enviarEmailCompra )