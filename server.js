require('dotenv').config();

const compression = require('compression');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const app = express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Icon = require('./models/icon');

console.log(process.env.MONGO_USER, process.env.MONGO_PASS, process.env.NODE_ENV);

mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env
    .MONGO_PASS}@aws-us-east-1-portal.25.dblayer.com:17701/icons`,
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Mongo connection successful!');
    }
  }
);

app.get('/api/icons', (req, res) => {
  const icons = Icon.find().exec((err, icons) => {
    res.json(icons);
  });
});

app.post('/api/icons', (req, res) => {
  const icon = new Icon({
    name: req.body.name,
    tags: req.body.tags,
    width: req.body.width,
    height: req.body.height,
    viewBox: req.body.viewBox,
    paths: req.body.paths,
    url: req.body.url,
  });

  icon.save(err => {
    if (err) {
      res.send(err);
    } else {
      res.json(icon);
    }
  });
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Express: Ready on port ${port}`);
});
