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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get('/', async (req, res) => {
  const photos = await Photo.find();
  res.render('index', { photos });
});
app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id);
  const photo = await Photo.findById(req.params.id);
  res.render('photo', { photo });
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
