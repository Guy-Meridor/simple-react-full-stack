import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton'
import AddGroup from './AddGroup'
import GroupsService from './GroupsService'
import GroupInstances from './GroupInstances'
import GroupsCard from './GroupsCard'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles({
    title: {
        textAlign: 'center',
        marginBottom: '3vh'
    },
    addIcon: {
        marginLeft: '10'
    },
    cardsContainer: {
        marginTop: '3vh',
    },
    quotesCard: {
        marginLeft: '5%',
        float: 'left',
        width: '60%'
    },
    groupsCard: {
        marginRight: '5%',
        float: 'right',
        width: '25%'
    }
})

function Groups({ match, history }) {
    const classes = useStyles();

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [chosenGroup, setChosen] = React.useState(null);
    const [groups, setGroups] = React.useState([]);

    async function fetchGroups() {
        const result = await GroupsService.getGroups();
        const fetchedGroups = result.data;

        setGroups(fetchedGroups);
        return fetchedGroups;
    }

    const setChosenGroup = (chosenName, groups) => {
        if (match.params.group) {
            const group = groups.find(grp => grp.name == match.params.group)
            setChosen(group)
        }
    }

    useEffect(() => {
        async function fetchAndChoose() {
            const result = await fetchGroups();
            if (match.params.group) {
                setChosenGroup(match.params.group, result);
            }
            else {
                selectGroup(result[0].name)
            }
        }

        fetchAndChoose();
    }, []);

    useEffect(() => {
        setChosenGroup(match.params.group, groups);
    }, [match.params.group])

    function handleClickOpen() {
        setDialogOpen(true);
    }

    function handleClose() {
        setDialogOpen(false);
    }

    const selectGroup = group => {
        history.push(`/groups/${group}`)
    }

    const deleteGroup = async group => {
        if (confirm(`Are you sure you want to delete the group: ${group}?`)) {

            await GroupsService.deleteGroup(group);
            const tempArray = groups.filter(curr => curr.name != group);
            setGroups(tempArray);
            if (chosenGroup.name == group) {
                selectGroup(tempArray[0].name)
            }
        }
    }


    const onAddGroup = group => {
        const newGroups = groups.slice();
        newGroups.push(group);
        setGroups(newGroups);
        selectGroup(group.name);
        handleClose();
    }

    return <div>
        <Typography className={classes.title} variant="h5">
            Groups
            <IconButton onClick={handleClickOpen}>
                <Icon color='primary' className={classes.addIcon}>add</Icon>
            </IconButton>
        </Typography>

        <div className={classes.cardsContainer}>
            {chosenGroup && <GroupInstances className={classes.quotesCard} group={chosenGroup} />}
            <GroupsCard className={classes.groupsCard} groups={groups} chosen={chosenGroup && chosenGroup.name} clickGroup={selectGroup} deleteGroup={deleteGroup} />
        </div>

        <AddGroup open={dialogOpen} handleClose={handleClose} onAdd={onAddGroup}></AddGroup>
    </div>
}


export default withRouter(Groups);