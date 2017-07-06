require('dotenv').config();

const compression = require('compression');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Icon = require('./models/icon');

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

app.get('/', cors(), (req, res) => {
  res.redirect('/icons');
});

app.get('/icons/:icon_id', (req, res) => {
  Icon.findById(req.params.icon_id, (err, icon) => {
    if (err) {
      res.send(err);
    }
    res.json(icon);
  });
});

app.patch('/icons/:icon_id', (req, res) => {
  switch (req.query.tags) {
    case 'add':
      Icon.findById(req.params.icon_id, (err, icon) => {
        const tags = req.body.tags.concat(icon.tags);
        const uniqueTags = tags.filter((tag, index) => tags.indexOf(tag) === index);
        const newData = { tags: uniqueTags };
        Icon.update({ _id: req.params.icon_id }, { $set: newData }, (err, icon) => {
          res.json(icon);
        });
      });
      break;
    case undefined:
      Icon.findByIdAndUpdate(
        req.params.icon_id,
        { $set: req.body },
        { new: true },
        (err, icon) => {
          if (err) res.send(err);
          res.json(icon);
        }
      );
      break;
  }
});

app.get('/icons', cors(), (req, res) => {
  const query = Object.keys(req.query).join('');
  switch (query) {
    case 'name':
      Icon.findOne({ name: req.query.name }).exec((err, icon) => {
        console.log();
        res.json(icon);
      });
      break;
    case 'id':
      Icon.findOne({ _id: req.query.id }).exec((err, icon) => {
        res.json(icon);
      });
      break;
    case 'tags':
      Icon.find({ 'tags': req.query.tags}).exec((err, icons) => {
        res.json(icons);
      });
      break;
    default:
      Icon.find().sort({ name: 1 }).exec((err, icons) => {
        res.json(icons);
      });
      break;
  }
});

app.post('/icons', (req, res) => {
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

module.exports = app;
