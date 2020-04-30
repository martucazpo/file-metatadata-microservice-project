'use strict';

var express = require('express');
var cors = require('cors');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  const { originalname: name, mimetype: type, size } = req.file;
  //console.log(req.file);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.json({ name, type, size });

})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js always, ALWAYS listening ...');
});
