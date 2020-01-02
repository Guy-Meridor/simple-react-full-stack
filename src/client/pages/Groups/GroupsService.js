import axios from 'axios'
const GroupsAPI = axios.create({
    baseURL: `/api/groups`,
});

const publicApi = {}

publicApi.addWordToGroup = (group, word) => GroupsAPI.post(`/${group}`, { word });
publicApi.addGroup = group => GroupsAPI.post('/', { group });
publicApi.getGroups = GroupsAPI.get;
publicApi.deleteGroup = groupName => GroupsAPI.delete(`/${groupName}`);


export default publicApi
