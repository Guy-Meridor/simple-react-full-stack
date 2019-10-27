const express = require('express')
const router = express.Router()

const songsRouter = require('./songs/songsRouter')
const wordsRouter = require('./words/wordsRouter')
const translateRouter = require('./translate/translateRouter')
const groupsRouter = require('./groups/groupsRouter')
const phrasesRouter = require('./phrases/phrasesRouter')
const statisticsRouter = require('./statistics/statisticsRouter')

router.use('/songs', songsRouter);
router.use('/words', wordsRouter);
router.use('/translate', translateRouter);
router.use('/groups', groupsRouter);
router.use('/phrases', phrasesRouter);
router.use('/statistics', statisticsRouter);

module.exports = router