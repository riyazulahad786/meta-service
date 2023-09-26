var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer');
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const storage = multer.memoryStorage();
const upload = multer({ storage });

// app.get('/', function (req, res) {
//   res.sendFile(process.cwd() + '/index.html');
// });

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  const { Name, mimetype, size } = req.file;

  res.json({
    name: Name,
    type: mimetype,
    size: size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
