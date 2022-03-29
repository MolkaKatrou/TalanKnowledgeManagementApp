const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');



require('dotenv').config();

const RouterUsers = require('./Routes/users.route.js');
const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const URI = process.env.ATLAS_URI
mongoose.connect(URI,
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


app.use('/Api', RouterUsers);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log (`Server is running on port ${PORT} .`);
});