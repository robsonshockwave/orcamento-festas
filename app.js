require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// DB connection
const conn = require('./db/conn');

conn();

//Routes
const router = require('./routes/router');
app.use('/api', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
