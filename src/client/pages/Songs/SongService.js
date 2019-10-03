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

publicApi.getSongTitles = songId => SongAPI.get(`/${songId}/titles`);
publicApi.getSongLyrics = songId => SongAPI.get(`/${songId}/lyrics`);
publicApi.getLine = (songId, line) => 
    SongAPI.get(`/${songId}/totalLine/${line}`)



export default publicApi;



// export default axios.create({
//     baseURL: `/api/songs`,
// });
