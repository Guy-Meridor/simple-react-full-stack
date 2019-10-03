const express = require('express');
const songsRouter = require('./songs/songsRouter')
const wordsRouter = require('./words/wordsRouter')
const translateRouter = require('./translate/translateRouter')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload({ createParentPath: true }));

app.engine('html', require('ejs').renderFile);
app.set('views', 'C:\\Guy\\מדעי המחשב\\סדנה בסיסי נתונים\\Project\\simple-react-full-stack\\dist')
app.set('view engine', 'html');

app.use('/api/songs', songsRouter);
app.use('/api/words', wordsRouter);
app.use('/api/translate', translateRouter);
app.use('/assets', express.static('assets'));
app.use(express.static('dist'));
/* GET React App */
app.get('/*', function (req, res, next) {
    res.render('index');
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
