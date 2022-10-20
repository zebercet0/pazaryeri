const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();



//mongodb bağlantısı
const dbURI = 'mongodb+srv://alieren:alieren@node-db.rkxyvry.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//middleware ve statik dosyalar
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


app.get('/', (req, res) =>{
	res.render(__dirname + '/views/index.ejs');
});
