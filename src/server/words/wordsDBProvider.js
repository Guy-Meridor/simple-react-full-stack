const db = require('../db');
const publicApi = {};

publicApi.getWordInstances = async word => {
    const params = [word];
    const result = await db.function('get_word_instances', params);
    return result.rows;
}

module.exports = publicApi; 