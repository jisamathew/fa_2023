require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8084;
const cors = require('cors');

// var MongC = require('mongodb').MongoClient;
// var COU = 'mongodb+srv://apiuser:UyXsnZv5Nz4AJdc1@rest-api.zyrhm.mongodb.net/API?retryWrites=true&w=majority';

var corsOptions = {
  origin: 'http://localhost:8083',
  // optionsSuccessStatus: 200 ,
  methods: "GET,PUT,POST"
}

app.use(cors(corsOptions));
app.use(express.static('client'));
app.use(express.static(__dirname + '/client')); // Allow front end to access public folder

app.use(express.static('build/contracts'));
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/client/index.html`);
  });

  app.get('*', (req, res) => {
    res.status(404);
    res.send('Ooops... this URL does not exist');
  });

  app.listen(PORT, () => { 
    console.log(`TechBrij Ethereum HelloWorld App running on port ${PORT}...`);
  });
