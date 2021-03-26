const express = require('express');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const router = require('./routes/infos.js');
app.use('/infos', router);

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}`));
