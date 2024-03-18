const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const appRoutes = require('./routes/AppRoutes');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


require('dotenv').config();
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require("dotenv").config({
        path: "./.env"
    })
}

const port = process.env.PORT;
const dbconnection = process.env.DB_URL;


app.listen(port, (req, res) => {
    console.log(`App listening on ${port}`)
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});


//DB CONNECTION
mongoose.connect(dbconnection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Db connection established");
    })
    .catch((err) => {
        console.log(err)
        console.log("Error connecting to the databse")
    })


//main routes
// make routes
app.use('/api/v2/school',appRoutes);