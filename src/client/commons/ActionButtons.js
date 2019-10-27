import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    actionButton: {
        marginLeft: '1vw',
    },
}));

function ActionButtons(props) {
    const classes = useStyles();

    return <div>
        <IconButton className={classes.actionButton} size='small' onClick={props.onEdit}>
            <Icon color='primary'>edit</Icon>
        </IconButton>
        <IconButton className={classes.actionButton} size='small' onClick={props.onDelete}>
            <Icon color='secondary'>delete</Icon>
        </IconButton>
    </div>
}

export default ActionButtons;