const express = require('express')
const router = express.Router()

router.get('/', (req,res)=> res.send('Hello'))

module.exports = router

const wordsDBProvider = require('./wordsDBProvider');

router.get('/:word/instances', (req, res) => {
  wordsDBProvider.getWordInstances(req.params.word).then(instances => {
    res.json(instances)
  }, (err) => {
    res.status(500).json(err)
  })
})

router.get('/startsWith/:word', (req, res) => {
  wordsDBProvider.getWordsStartsWith(req.params.word).then(words => {
    res.json(words)
  }, (err) => {
    res.status(500).json(err)
  })
})

module.exports = router

