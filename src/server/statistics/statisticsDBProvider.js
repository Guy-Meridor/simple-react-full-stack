const db = require('../db');
const publicApi = {};

publicApi.getWordsLengths = async () => {
    const result = await db.function('get_words_lengths');
    return result.rows;
}

publicApi.getWordsCounts = async () => {
    const result = await db.function('get_words_counts');
    return result.rows;
}

publicApi.getLinesLengths = async () => {
    const result = await db.function('get_lines_lengths');
    return result.rows;
}

publicApi.getParagraphsLengths = async () => {
    const result = await db.function('get_paragraphs_lengths');
    return result.rows;
}
module.exports = publicApi;