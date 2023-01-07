var nodemailer = require('nodemailer')

const TEST_MAIL = 'alvarosalomon@yahoo.com.ar'



const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    secure: false, // use SSL
    port: 587,
    auth: {
        user: 'dudley68@ethereal.email',
        pass: 'ZftAr6gSCFa3Tr14VW'
    },
    tls: {
        rejectUnauthorized: false
    }
});


const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: 'Nuevo Registro',
    html:  `<h1 style="color: blue;"> Mail: ${user.email}, Password: ${user.password}, Nombre: ${user.name}, Edad: ${user.age}, Direccion: ${user.address}, Telefono: ${user.phone}, Avatar: ${user.avatar} </span></h1>`
 }
 
async function enviarEmailAdm(){
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
     } catch (err) {
        console.log(err)
     }
}

const mailCompra = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: 'Nuevo Pedido',
    html:  `<h1 style="color: blue;"> Mail: ${user.email}, Nombre: ${user.name} </span></h1>`
 }

 async function enviarEmailCompra(){
    try {
        const info = await transporter.sendMail(mailCompra)
        console.log(info)
     } catch (err) {
        console.log(err)
     }
}

 module.exports = (enviarEmailAdm,enviarEmailCompra )