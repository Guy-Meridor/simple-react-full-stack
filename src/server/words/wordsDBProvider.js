const db = require('../db');
const publicApi = {};

publicApi.getWordInstances = async word => {
    const params = [word];
    const result = await db.function('get_word_instances', params);
    return result.rows;
}

publicApi.getWordsStartsWith = async word => {
    const params = [word];
    const result = await db.function('get_word_startswith', params);
    return result.rows.map(word => word.get_word_startswith);
}

module.exports = publicApi; 