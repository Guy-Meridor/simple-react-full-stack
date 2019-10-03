const db = require('../db');
const publicApi = {};

publicApi.getSongs = async () => {
    const result = await db.function('getsongs');
    return result.rows;
}

publicApi.getSongById = async songId => {
    const params = [songId];
    const result = await db.function('get_song_by_id', params);
    return result.rows[0];
}

publicApi.getLine = async (songId, totalLineIndex) => {
    const params = [songId, totalLineIndex];
    const result = await db.function('get_line', params);
    return result.rows;
}

publicApi.getSongLyrics = async songId => {
    const params = [songId];
    const result = await db.function('get_song_lyrics', params);
    return result.rows;
}

publicApi.addSong = async ({ name, artist, hasImage }) => {
    const params = [name, artist, hasImage];
    const result = await db.function('addsong', params, true);
    return result.rows[0].addsong;
}

publicApi.addWordToSong = async ({ word, songId, index, paragraph, lineIndex, totalLineIndex, inlineIndex }) => {
    const params = [word, songId, index, paragraph, lineIndex, totalLineIndex, inlineIndex]
    const result = await db.function('add_word_to_song', params, true);
    return result;
}

publicApi.addMarkToSong = async ({ mark, type, songId, index, paragraph, lineIndex, totalLineIndex }) => {
    const params = [mark, type, songId, index, paragraph, lineIndex, totalLineIndex]
    const result = await db.function('add_mark_to_song', params, true);
    return result;
}

module.exports = publicApi;