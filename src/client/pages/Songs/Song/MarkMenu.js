import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AllGroupsDialog from './AllGroupsDialog'
import { withRouter } from 'react-router-dom'
import PhraseService from '../../Phrases/PhrasesService'
import GroupsService from '../../Groups/GroupsService'

function MarkMenu(props) {
    const { onClose, open, selection } = props;

    const [groupDialogOpen, setGroupDialog] = useState(false);
    const toggleGroupsDialog = state => () => setGroupDialog(state);
    const isPhrase = selection.includes(' ');


    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = () => {
        onClose();
    };

    const redirectToWordPage = () => {
        props.history.push(`/words/${selection}`);
    }

    const addPhraseAndRedirect = async () => {
        await PhraseService.addPhrase(selection);
        props.history.push(`/phrases/${selection}`);
    }

    const addToGroupAndRedirect = async  group => {
        await GroupsService.addWordToGroup(group, selection)
        props.history.push(`/groups/${group}`);
    }

    const renderOptions = () => {
        if (isPhrase) {
            return <List>
                <ListItem button onClick={redirectToWordPage} >
                    <ListItemText primary={'See Phrase References'} />
                </ListItem>
                <ListItem button onClick={addPhraseAndRedirect} >
                    <ListItemText primary={'Add To Phrases'} />
                </ListItem>
            </List>
        }
        else {
            return <List>
                <ListItem button onClick={redirectToWordPage} >
                    <ListItemText primary={'See Word References'} />
                </ListItem>
                <ListItem button onClick={toggleGroupsDialog(true)} >
                    <ListItemText primary={'Add Word To A Group'} />
                </ListItem>
            </List>
        }
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{`${isPhrase ? 'Phrase' : 'Word'}: ${selection}`}</DialogTitle>
            {renderOptions()}

            <AllGroupsDialog chooseGroup={addToGroupAndRedirect} word={selection} open={groupDialogOpen} handleClose={toggleGroupsDialog(false)} />
        </Dialog>
    );
}

export default withRouter(MarkMenu)
