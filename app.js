const express = require('express');
const conn = require('./db');
const dotenv = require('dotenv');
const Photo = require('./models/Photo');

dotenv.config();

const app = express();

//Connect to MongoDB
conn();

//Template Engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());

//Routes
app.get('/', async (req, res) => {
  const photos = await Photo.find();
  res.render('index', { photos });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/* const ejs = require('ejs');
const path = require('path'); */
