const db = require('../db');
const publicApi = {};

publicApi.getPhrases = async () => {
    const result = await db.function('get_phrases');
    return result.rows.map(row => row.get_phrases);
}

publicApi.addPhrase = async phrase => {
    const words = phrase.split(" ");
    const params = [words];
    const result = await db.function('add_phrase', params, true)

    return result;
}

publicApi.deletePhrase = async phrase => {
    const words = phrase.split(" ");
    const params = [words];
    const result = await db.function('delete_phrase', params, true)

    return result;
}

publicApi.getPhraseInstances = async phrase => {
    const words = phrase.split(" ");

    const query = {
        values: words,
        text: `select  s.id as song_id, s.name as song_name, s.artist ,w1.paragraph, w1.line_index, w1.total_line_index 
    from words_in_songs w1
    join songs s on w1.song_id = s.id
    ${Array.from({ length: words.length - 1 }, (v, i) => i + 2).map((v) => `join words_in_songs w${v} on w1.song_id = w${v}.song_id`).join(" ")}
    where ${words.map((word, index) =>
            `lower(w${index + 1}.word)=lower($${index + 1}) ${index > 0 ? ` and w${index + 1}.index=w${index}.index+ 1` : ''}`).join(" and ")}
    order by w1.total_line_index`
    }

    const result = await db.query(query);
    return result.rows;
}


module.exports = publicApi;