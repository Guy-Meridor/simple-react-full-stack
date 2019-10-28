import axios from 'axios'
const GroupsAPI = axios.create({
    baseURL: `/api/groups`,
});

const publicAPI = {}

publicAPI.addWordToGroup = (group, word) => GroupsAPI.post(`/${group}`, { word });
publicAPI.addGroup = group => GroupsAPI.post('/', { group });
publicAPI.getGroups = GroupsAPI.get;
publicApi.deleteGroup = groupName => GroupsAPI.delete(`/${groupName}`);


export default publicAPI
