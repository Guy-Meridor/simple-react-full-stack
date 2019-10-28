const express = require('express');
const dbProvider = require('./groupsDBProvider');
const router = express.Router();

router.get('/', async function (req, res) {
  dbProvider.getGroups().then(groups => {
    res.json(groups)
  }, (err) => {
    res.status(500).json(err)
  })
})

router.post('/', async function (req, res) {
  const { group } = req.body;
  dbProvider.addGroup(group).then(result => {
    res.json(result)
  }, (err) => {
    res.status(500).json(err)
  })
})

router.post('/:group', async function (req, res) {
  const { group } = req.params;
  const { word } = req.body;
  dbProvider.addToGroup(group, word).then(result => {
    res.json(result)
  }, (err) => {
    res.status(500).json(err)
  })
})

router.delete('/:group', async function (req, res) {
  const { group } = req.params;
  dbProvider.deleteGroup(group).then(result => {
    res.json(true)
  }, (err) => {
    res.status(500).json(err)
  })
})

module.exports = router;