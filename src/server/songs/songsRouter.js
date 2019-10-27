const express = require('express')
const router = express.Router()
const songsDBProvider = require('./songsDBProvider');
const songsTextProvider = require('./songTextProvider');
const root = require('app-root-path');

router.get('/', async function (req, res) {
  songsDBProvider.getSongs().then(songs => {
    res.json(songs)
  }, (err) => {
    res.status(500).json(err)
  })
})

router.post('/', async (req, res) => {
  const { name, artist } = req.body;
  const { image, lyrics } = req.files;

  const hasImage = !!image;
  const newId = await songsDBProvider.addSong({ name, artist, hasImage });

  const promises = [];
  const lyricsPromise = lyrics.mv(`${root.path}/assets/songLyrics/${newId}.txt`).then(
    () => songsTextProvider.addWordsFromFile(newId))
  promises.push(lyricsPromise);

  if (hasImage) {
    const imagePromise = image.mv(`${root.path}/assets/songImages/${newId}.jpg`)
    promises.push(imagePromise);
  }

  await Promise.all(promises);
  res.redirect('/');
})


router.get('/:id/titles', async (req, res) => {
  songsDBProvider.getSongById(req.params.id).then(song => {
    res.json(song)
  }, (err) => {
    res.status(500).json(err)
  })
})

router.get('/:id/lyrics', async (req, res) => {
  songsDBProvider.getSongLyrics(req.params.id).then(song => {
    res.json(song)
  }, (err) => {
    res.status(500).json(err)
  })
})

router.get('/:id/lines/meta', async (req, res) => {
  songsDBProvider.getSongLinesMeta(req.params.id).then(song => {
    res.json(song)
  }, (err) => {
    res.status(500).json(err)
  })
})

router.get('/:id/lines', async (req, res) => {
  const { id } = req.params;
  const { start, finish } = req.query;
  songsDBProvider.getLines(id, start, finish).then(song => {
    res.json(song)
  }, (err) => {
    res.status(500).json(err)
  })
})

router.get('/:id/lines/:line/index/:index', async (req, res) => {
  const { id, line, index } = req.params;
  songsDBProvider.getWordByIndex(id, line, index).then(word => {
    res.json(word)
  }, (err) => {
    res.status(500).json(err)
  })
})


router.get('/:id/line/:line', async (req, res) => {
  const { id, line } = req.params;
  songsDBProvider.getLine(id, line).then(song => {
    res.json(song)
  }, (err) => {
    res.status(500).json(err)
  })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  songsDBProvider.deleteSong(id).then(song => {
    res.json(song)
  }, (err) => {
    res.status(500).json(err)
  })
})



router.post('/filter', async function (req, res) {
  const { name, artist, words } = req.body;
  songsDBProvider.filterSongs(name, artist, words).then(songs => {
    res.json(songs)
  }, (err) => {
    res.status(500).json(err)
  })
})
module.exports = router
