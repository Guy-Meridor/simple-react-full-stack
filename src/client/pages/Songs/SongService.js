import axios from 'axios'
const SongAPI = axios.create({
    baseURL: `/api/songs`,
});

const publicApi = {};

publicApi.getSongs = SongAPI.get;
publicApi.filterSongs = filters => SongAPI.post('/filter', filters);

publicApi.getSongTitles = songId => SongAPI.get(`/${songId}/titles`);
publicApi.getSongLyrics = songId => SongAPI.get(`/${songId}/lyrics`);
publicApi.getSongLinesMeta = songId => SongAPI.get(`${songId}/lines/meta`)
publicApi.getWordByIndex = (songId, line, index) => SongAPI.get(`${songId}/lines/${line}/index/${index}`)

publicApi.getLines = (songId, start, finish) =>
    SongAPI.get(`/${songId}/lines?start=${start}&finish=${finish}`)

publicApi.getLine = (songId, line) =>
    SongAPI.get(`/${songId}/line/${line}`)

publicApi.deleteSong = songId => SongAPI.delete(`/${songId}`)

export default publicApi;