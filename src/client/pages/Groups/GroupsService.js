import axios from 'axios'
const GroupsAPI = axios.create({
    baseURL: `/api/groups`,
});

const publicAPI = {}
publicAPI.API = GroupsAPI;

publicAPI.addWordToGroup = (group, word) => GroupsAPI.post(`/${group}`, { word });


export default publicAPI
