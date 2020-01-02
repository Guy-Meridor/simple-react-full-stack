import axios from 'axios'
const StatisticsAPI = axios.create({
    baseURL: `/api/statistics`,
});

const publicApi = {};

publicApi.getWordsLengths = async () => {
    return getStat('/words/lengths')
}

publicApi.getLinesLengths = async () => {
    return getStat('/lines/lengths')
}

publicApi.getParagraphsLengths = async () => {
    return getStat('/paragraphs/lengths')
}

publicApi.getWordsCounts = async () => {
    return getStat('/words/counts')
}

publicApi.getPhrasesCounts = async () => {
    return getStat('/phrases/counts')
}

async function getStat(path)  {
    const result = await StatisticsAPI.get(path);
    const lengths = result.data.map(length => ({
        "id": length.value,
        "label": length.value,
        "value": length.instances,
    }))

    return lengths;
}

export default publicApi;