import axios from 'axios'
const WordAPI = axios.create({
    baseURL: `/api/words`,
});

const publicApi = {};

publicApi.getWordsInstances = word => WordAPI.get(`/${word}/instances`);
publicApi.getWordsStartsWith = prefix => WordAPI.get(`/startsWith/${prefix}`)

export default publicApi;