const db = require('../db');
const publicApi = {};

publicApi.getGroups = async () => {
    const result = await db.function('get_groups');
    return result.rows;
}

publicApi.addGroup = async ({ name, words }) => {
    const params = [name, words];
    const result = await db.function('add_group', params, true);
    return result.rows;
}

publicApi.addToGroup = async (group, word) => {
    const params = [group, word];
    const result = await db.function('add_word_to_group', params, true);
    return result.rows;
}

publicApi.deleteGroup = async groupName => {
    const params = [groupName];
    const result = await db.function('delete_group', params, true);
    return result;
}


module.exports = publicApi;