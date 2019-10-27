import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { List } from 'semantic-ui-react'

const useStyles = makeStyles({
    title: {
        textAlign: 'center',
        marginBottom: '3vh'
    }
})

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function ChooseDialog(props) {
    const classes = useStyles();

    const onClickOption = option => e => {
        props.choose(option);
        props.handleClose();
    }

    return <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="form-dialog-title"
        TransitionComponent={Transition}>
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
            <List relaxed selection>
                {props.options.map(option =>
                    <List.Item
                        className={classes.item}
                        key={option}
                        onClick={onClickOption(option)}>
                        {option}
                    </List.Item>
                )}
            </List>
        </DialogContent>
    </Dialog>
}

export default ChooseDialog;