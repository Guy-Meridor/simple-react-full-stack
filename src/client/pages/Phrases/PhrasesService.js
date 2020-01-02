import axios from 'axios'

const publicApi = {}
const PhrasesAPI = axios.create({
    baseURL: `/api/phrases`,
});

publicApi.addPhrase = phrase => PhrasesAPI.post('/', { phrase });
publicApi.getPhraseInstances = phrase => PhrasesAPI.get(`/${phrase}/instances`);

publicApi.deletePhrase = phrase => PhrasesAPI.delete(`/${phrase}`)
publicApi.getPhrases = PhrasesAPI.get;

publicApi.createSongQuotes = (id, name, artist) => (
    {
        lines: [],
        song: {
            id,
            name,
            artist,
        }
    }
);

export default publicApi
