const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require("passport-local");
const _ = require('lodash');
const User = require(__dirname + '/models/User'); 

const app = express();
app.set('view-engine', 'ejs');
app.use(express.urlencoded({extended: false}));

//mongodb bağlantısı
const dbURI = 'mongodb+srv://alieren:alieren@node-db.rkxyvry.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

//middleware ve statik dosyalar
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', (req, res) =>{
	res.render(__dirname + '/views/index.ejs');
});

app.get('/login', (req, res) =>{
	res.render(__dirname + '/views/login.ejs');
});



app.get('/register', (req, res) =>{
	res.render(__dirname + '/views/register.ejs');
});


