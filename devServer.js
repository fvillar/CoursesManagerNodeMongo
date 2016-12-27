var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
// var config = require('./webpack.config.prod'); // For PROD
var open = require('open');

var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost/courses', ['courses', 'unique', 'authors']);


/* eslint-disable no-console */
const port = 7775;
var app = express();
var compiler = webpack(config);

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
  limit: '50mb'
}));

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

// =============================================== //
// ================= API CALLS =================== //
// =============================================== //


app.get('/api/courses', function (req, res) {
  db.courses.find({}, function (err, courses) {
    res.send(courses);
  });
});

app.post('/api/courses', function (req, res) {

  var data = req.body;

  // Do an auto-increments
  db.unique.findAndModify({
    query: {},
    update: { $inc: { id: 1 } },
    new: true
  }, function (err, v) {

    db.authors.findOne({ Id: parseInt(data.authorId) }, function (err, author) {      

      var saveCourse = {
        '_id': mongojs.ObjectId(),
        'Id': v.id,
        'title': data.title,
        'authorName': author.firstName + ' ' + author.lastName,
        'authorId': parseInt(data.authorId),
        'length': data.length,
        'category': data.category
      };

      db.courses.save(saveCourse, function (err) {
        res.send({ status: true });
      });
    });

  });

});

app.put('/api/courses/:id', function (req, res) {

  db.courses.findOne({ Id: parseInt(req.params.id) }, function (err, course) {
    if (err) return err;
    else {
      if (req.body.title) course.title = req.body.title;
      if (req.body.authorId) course.authorId = req.body.authorId;
      if (req.body.authorName) course.authorName = req.body.authorName;
      if (req.body.length) course.length = req.body.length;
      if (req.body.category) course.category = req.body.category;
    }

    db.courses.save(course, function (err) {
      if (err) return err;
      res.send({ status: true });
    });

  });
});

app.delete('/api/courses/:id', function (req, res) {
  db.courses.find({ Id: parseInt(req.params.id) }, function (err, course) {

    if (err) {
      console.log('ERROR on Delete Course - Cant find record');
    } else {
      db.courses.remove({ Id: parseInt(req.params.id) }, function (err) {
        if (err) return err;
        res.send(course[0]);
      });
    }
  });
});

app.get('/api/authors', function (req, res) {
  db.authors.find({}, function (err, authors) {
    res.send(authors);
  });
});

app.get('/api/authors/:id', function (req, res) {
  db.authors.find({ Id: parseInt(req.params.id) }, function (err, author) {
    res.send(author);
  });
});

// =============================================== //
// =============================================== //
// =============================================== //

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

