const express = require('express');
const cors = require('cors');
require('dotenv').config();

const creditRoutes = require('./routes/credit.routes');
require('./jobs/email.job');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/credits', creditRoutes);

app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en puerto 3000');
});
