import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton'
import AddGroup from './AddGroup'

const useStyles = makeStyles({
    title: {
        textAlign: 'center',
        marginBottom: '3vh'
    },
    addIcon: {
        marginLeft: '10'
    }
})

function Groups(props) {
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = React.useState(false);

    function handleClickOpen() {
        setDialogOpen(true);
    }

    function handleClose() {
        setDialogOpen(false);
    }

    return <div>
        <Typography className={classes.title} variant="h5">
            Groups
            <IconButton onClick={handleClickOpen}>
                    <Icon color='primary' className={classes.addIcon}>add</Icon>
                </IconButton>
        </Typography>

        <AddGroup open={dialogOpen} handleClose={handleClose}></AddGroup>
    </div>
}

export default Groups;