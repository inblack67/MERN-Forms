const express = require('express');
require('colors')
const register = require('./routes/register');
const dotenv = require('dotenv');
const { connectDB } = require('./db');

const app = express();
app.use(express.json());

dotenv.config({ path: './config.env' });
connectDB();

app.use('/api/register', register);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`.green.bold);
});