const mongoose = require('mongoose');
require('dotenv').config()

const db = mongoose.connect(process.env.MONGO_DB_URL,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => console.log('Connected!'));

module.exports = db;