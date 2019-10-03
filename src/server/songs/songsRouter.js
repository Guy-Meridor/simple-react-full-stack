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

router.get('/:id/totalLine/:line', async (req, res) => {
  const { id, line } = req.params;
  songsDBProvider.getLine(id, line).then(song => {
    res.json(song)
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

module.exports = router
