import axios from 'axios'
const SongAPI = axios.create({
    baseURL: `/api/songs`,
});

const publicApi = {};

publicApi.addSong = async ({ metadata, lyrics, image }) => {
    const metaResult = await SongAPI.post('/metadata', { song: metadata });
    const { newId } = metaResult.data;

    const formData = new FormData();
    formData.append('lyrics', values.lyrics);
    formData.append('image', values.image);
    // formData.append('a', 5);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    return SongAPI.post(`/${newId}/files`, formData, config);
}

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

export default publicApi;



// export default axios.create({
//     baseURL: `/api/songs`,
// });
