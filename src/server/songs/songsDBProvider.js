const db = require('../db');
const publicApi = {};

publicApi.getSongs = async () => {
    const result = await db.function('get_songs');
    return result.rows;
}

publicApi.filterSongs = async (name, artist, words) => {
    const params = [name, artist, words];
    const result = await db.function('filtersongs', params);
    return result.rows;
}

publicApi.getSongById = async songId => {
    const params = [songId];
    const result = await db.function('get_song_by_id', params);
    return result.rows[0];
}

publicApi.getLines = async (songId, start, finish) => {
    const params = [songId, start, finish];
    const result = await db.function('get_lines', params);
    return result.rows;
}

publicApi.deleteSong = async (songId) => {
    const params = [songId];
    const result = await db.function('delete_song', params);
    return result.rows;
}

publicApi.getLine = async (songId, line) => {
    const params = [songId, line];
    const result = await db.function('get_line', params);
    return result.rows;
}

publicApi.getSongLyrics = async songId => {
    const params = [songId];
    const result = await db.function('get_song_lyrics', params);
    return result.rows;
}

publicApi.getSongLinesMeta = async songId => {
    const params = [songId];
    const result = await db.function('get_song_lines_metadata', params);
    return result.rows;
}

publicApi.getWordByIndex = async (songId, line, index) => {
    const params = [songId, line, index];
    const result = await db.function('get_word_by_index', params);
    return result.rows.length && result.rows[0].get_word_by_index;
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