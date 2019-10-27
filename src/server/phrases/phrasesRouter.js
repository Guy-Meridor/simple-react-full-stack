const express = require('express')
const router = express.Router()
const phrasesDBProvider = require('./phrasesDBProvider');

router.get('/', (req, res) => {
  phrasesDBProvider.getPhrases().then(phrases => {
    res.json(phrases)
  }, (err) => {
    res.status(500).json(err)
  })
})

router.post('/', (req, res) => {
  const { phrase } = req.body;
  phrasesDBProvider.addPhrase(phrase).then(result => {
    res.send(true);
  }, (err) => {
    res.status(500).json(err)
  })
})

router.delete('/:phrase', (req, res) => {
  phrasesDBProvider.deletePhrase(req.params.phrase).then(result => {
    res.json(true)
  }, (err) => {
    res.status(500).json(err)
  })
})

router.get('/:phrase/instances', (req, res) => {
  phrasesDBProvider.getPhraseInstances(req.params.phrase).then(instances => {
    res.json(instances)
  }, (err) => {
    res.status(500).json(err)
  })
})


module.exports = router

