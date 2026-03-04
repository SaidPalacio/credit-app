const nodemailer = require('nodemailer');

let queue = [];

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* 🔎 VERIFICACIÓN SMTP */
transporter.verify()
  .then(() => console.log('SMTP listo'))
  .catch(err => console.error('Error SMTP:', err.message));

function addToQueue(data) {
  queue.push(data);
}

setInterval(async () => {
  if (queue.length === 0) return;

  const credit = queue.shift();

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'saidpalacio10@gmail.com',
      subject: 'Nuevo Crédito Registrado',
      text: `
Cliente: ${credit.client_name}
Valor: ${credit.amount}
Comercial: ${credit.commercial_name}
Fecha: ${credit.created_at}
`
    });

    console.log('Correo enviado correctamente');

  } catch (err) {
    console.error('Error enviando correo:', err.message);
  }

}, 5000);

module.exports = { addToQueue };
