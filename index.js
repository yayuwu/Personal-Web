const express = require("express");
const path = require("path");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/src/views"));

app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(require("./src/routes/mainRoutes"));

// Configuración del servicio de correo electrónico
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PWD ,
    },
});

app.post("/enviar-email", (req, res) => {
    const mailOptions = {
       from: "Yael Correa 💫" + process.env.SMTP_USER,
       to: process.env.SMTP_USER,
       subject: "Tienes un nuevo mensaje de " + req.body.name,
       html: `
       <html>
       <h2>Has recibido un mensaje desde tu página web</h2> 
       <span>Nombre: ${req.body.name}</span><br/>
       <span>Email: ${req.body.email}</span><br/> 
       </html>
       <span>Mensaje: ${req.body.comments || "No hay mensajes"}</span><br/>
       `,
    };
    
    const mailToLead = {
      from: "Yael Correa 💫" + process.env.SMTP_USER,
      to: req.body.email,
      subject: "¡Gracias por contactarme!",
      html: `<div"><img src = "cid:myImg"/></div>`,
      attachments: [{
        filename: 'email-response.png',
        path: __dirname + '/email-response.png',
        cid: 'myImg'
      }]
}

    transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
         console.log("Error al enviar el correo:", error);
       } else {
         console.log("Correo recibido:", info.response);
       }
    });

    transporter.sendMail(mailToLead, (error, info) => {
      if (error) {
          console.error(error)
      } else {
          console.log(info)
          console.log("Correo enviado:", info.response);
    }
    res.render("mensaje");
})
});

const PORT = 3001;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));