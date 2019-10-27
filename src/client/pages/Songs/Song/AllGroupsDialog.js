import React, { useState, useEffect } from 'react';
import GroupsService from '../../Groups/GroupsService'
import ChooseDialog from '../../../commons/ChooseDialog'

function AllGroupsDialog(props) {

    const [groups, setGroups] = useState([]);
    async function fetchWords() {
        const result = await GroupsService.API.get();

        const groupNames = result.data.map(grp => grp.name);
        setGroups(groupNames);
    }

    useEffect(() => {
        fetchWords();
    }, [])

    return <ChooseDialog
        options={groups}
        choose={props.chooseGroup}
        open={props.open}
        handleClose={props.handleClose}
        title='Chose A Group'></ChooseDialog>

}

export default AllGroupsDialog;

