const express = require('express')
const router = express.Router();

process.env.GOOGLE_APPLICATION_CREDENTIALS = './Song Analyzer-9cc26a513377.json'
const credentials = require('./Song Analyzer-9cc26a513377.json');
const { projectId } = credentials;
// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate');

// Instantiates a client
const translate = new Translate({ projectId });

router.post('/', async (req, res) => {
    const { text, target } = req.body;
    const [translation] = await translate.translate(text, target);
    res.json(translation)
})

module.exports = router