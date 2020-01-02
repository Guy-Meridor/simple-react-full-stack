const db = require('../db');
const publicApi = {};

publicApi.getWordInstances = async word => {
    const params = [word];
    const result = await db.function('get_word_instances', params);
    return result.rows;
}

publicApi.getAllInstances = async () => {
    const result = await db.function('get_all_instances');
    return result.rows;
}

publicApi.getWordsStartsWith = async word => {
    const params = [word];
    const result = await db.function('get_word_startswith', params);
    return result.rows.map(word => word.get_word_startswith);
}

publicApi.getWords = async () => {
    const result = await db.function('get_words');
    return result.rows.map(word => word.get_words);
}

module.exports = publicApi; 