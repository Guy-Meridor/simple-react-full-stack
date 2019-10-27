const express = require('express')
const router = express.Router()
const wordsDBProvider = require('./wordsDBProvider');


router.get('/', (req, res) => {
  wordsDBProvider.getWords().then(words => {
    res.json(words)
  }, (err) => {
    res.status(500).json(err)
  })
})

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

