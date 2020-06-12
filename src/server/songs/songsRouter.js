const express = require('express')
const router = express.Router()
const songsDBProvider = require('./songsDBProvider');
const songsFileProvider = require('./songFileProvider');
const songsTextProvider = require('./songTextProvider');

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

  const newId = await songsDBProvider.addSong({ name, artist });
  const promises = [];
  const lyricsPromise = songsFileProvider.addLyricsFile(newId, lyrics).then(
    () => songsTextProvider.addWordsFromFile(newId))
  promises.push(lyricsPromise);

  const imagePromise = songsFileProvider.addImageFile(newId, image);
  promises.push(imagePromise);

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
  const lyricsFileDelete = songsFileProvider.deleteLyricsFile(id);
  const imageFileDelete = songsFileProvider.deleteImageFile(id);
  const dbSongDelete = songsDBProvider.deleteSong(id);

  Promise.all([lyricsFileDelete, imageFileDelete, dbSongDelete]).then(result => {
    // Promise.all([ dbSongDelete]).then(result => {
    res.send('Delete Sucess!');
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
