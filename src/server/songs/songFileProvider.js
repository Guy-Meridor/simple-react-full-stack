const fsPromises = require('fs').promises;
const root = require('app-root-path');
const assetsPath = `${root.path}/assets`;
const songLyricsPath = `${assetsPath}/songLyrics`
const songImagesPath = `${assetsPath}/songImages`;

const publicApi = {};

publicApi.addLyricsFile = (songId, lyricsFile) => {
    return lyricsFile.mv(`${songLyricsPath}/${songId}.txt`);
}

publicApi.addImageFile = (songId, imageFile) => {
    if (imageFile) {
        return  imageFile.mv(`${songImagesPath}/${songId}.jpg`)
      }
      else {
        return fsPromises.copyFile(`${songImagesPath}/default.jpg`, `${songImagesPath}/${songId}.jpg`)
      }
}

publicApi.deleteLyricsFile = songId => {
    return fsPromises.unlink(`${songLyricsPath}/${songId}.txt`)
}

publicApi.deleteImageFile = songId => {
    return fsPromises.unlink(`${songImagesPath}/${songId}.jpg`)
}

module.exports = publicApi;