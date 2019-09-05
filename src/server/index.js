const express = require('express');
const app = express();
app.engine('html', require('ejs').renderFile);
app.set('views', 'C:\\Guy\\מדעי המחשב\\סדנה בסיסי נתונים\\Project\\simple-react-full-stack\\dist')
app.set('view engine', 'html');

app.use(express.static('dist'));
app.use('/assets', express.static('assets'));
app.get('/api/yos', (req, res) => res.json({ yos: 5 }))


/* GET React App */
app.get('/*', function (req, res, next) {
    res.render('index');
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
