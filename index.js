const express = require('express');
const mongoose = require('mongoose');
const authroute = require('./routes/auth');
const journalroute = require('./routes/journal');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use('/api', authroute);
app.use('/api', journalroute);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongooDB is connect...'))
    .catch((err) => console.error('MogooDB connection error', err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server is running..');
});