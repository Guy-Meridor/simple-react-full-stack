const express = require('express')
const router = express.Router()
const wordsDBProvider = require('./wordsDBProvider');

router.get('/:word/instances', (req,res)=>{
    wordsDBProvider.getWordInstances(req.params.word).then(instances => {
        res.json(instances)
      }, (err) => {
        res.status(500).json(err)
      })
})

module.exports = router

