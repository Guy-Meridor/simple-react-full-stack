import axios from 'axios'
const TranslateApi = axios.create({
    baseURL: `/api/translate`,
});

const publicApi = {};
publicApi.translate = (text, target) => TranslateApi.post('/', { text, target });

export default publicApi;