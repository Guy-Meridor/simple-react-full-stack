const express = require('express');
const api = require('./api');

const cors = require("cors");

const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const app = express();
const root = require('app-root-path');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload({ createParentPath: true }));

app.engine('html', require('ejs').renderFile);
app.set('views', `${root.path}/dist`)
// app.set('views', 'C:\\Guy\\מדעי המחשב\\סדנה בסיסי נתונים\\Project\\simple-react-full-stack\\dist')
app.set('view engine', 'html');

app.use('/api', api);
app.use('/assets', express.static('assets'));
app.use(express.static('dist'));
/* GET React App */
app.get('/*', function (req, res, next) {
    res.render('index');
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
