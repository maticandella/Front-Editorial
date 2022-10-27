// load the things we need
var express = require('express');
var app = express();
const fs = require('fs');

const path = require('path')
app.use(express.static('public'))

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

//**Routes**
//Login
app.get('/', function(req, res) {
    res.render('pages/login');
});
app.get('/login', function(req, res) {
    res.render('pages/login');
});

//Register
app.get('/register', function(req, res) {
    res.render('pages/register');
});

//Index
app.get('/index', function(req, res) {
    res.render('pages/index');
});

//Book
app.get('/book', function(req, res) {
    res.render('pages/book');
});

//AddBook
app.get('/addbook', function(req, res) {
    res.render('pages/addBook');
});

//UpdateBook
app.get('/updatebook', function(req, res) {
    res.render('pages/updateBook');
});

//BooksCategorie
app.get('/bookscategorie', function(req, res) {
    res.render('pages/booksCategorie');
});

//About
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('Server iniciado en puerto 8080');