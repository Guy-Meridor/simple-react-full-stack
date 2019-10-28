import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles(theme => ({
    actionButton: {
        marginLeft: '1vw',
    },
}));

function DeleteButton(props) {
    const classes = useStyles();

    return <div>
        <IconButton className={classes.actionButton} size='small' onClick={props.onDelete}>
            <Icon color='secondary'>delete</Icon>
        </IconButton>
    </div>
}

export default DeleteButton;