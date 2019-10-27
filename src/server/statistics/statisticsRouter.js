const express = require('express');
const router = express.Router();
const dbProvider = require('./statisticsDBProvider');

router.get('/words/lengths', (req,res)=> {
    dbProvider.getWordsLengths().then(lengths => {
        res.json(lengths)
      }, (err) => {
        res.status(500).json(err)
      })
})

router.get('/words/counts', (req,res)=> {
  dbProvider.getWordsCounts().then(lengths => {
      res.json(lengths)
    }, (err) => {
      res.status(500).json(err)
    })
})

router.get('/paragraphs/lengths', (req,res)=> {
  dbProvider.getParagraphsLengths().then(lengths => {
      res.json(lengths)
    }, (err) => {
      res.status(500).json(err)
    })
})

router.get('/lines/lengths', (req,res)=> {
  dbProvider.getLinesLengths().then(lengths => {
      res.json(lengths)
    }, (err) => {
      res.status(500).json(err)
    })
})

module.exports = router;