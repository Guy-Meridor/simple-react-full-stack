import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import SearchWords from '../Words/SearchWords'
import PhrasesService from './PhrasesService'

const useStyles = makeStyles(theme => ({
    root: {
        width: '500px'
    },
    fileInputContainer: {
        marginTop: 16,
    },
    addWords: {
        marginTop: '2vh'
    },
    wordsInput: {
        margin: '5px'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddPhrase(props) {
    const classes = useStyles();

    const [phrase, setPhrase] = React.useState('');
    const addPhrase = async () => {
        const result = await PhrasesService.addPhrase(phrase)

        if (result) {
            props.onAdd(phrase);
            setPhrase('');
        }
    }

    const phraseChange = (e) => {
        setPhrase(e.target.value);
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            TransitionComponent={Transition}
            maxWidth={'xs'}>
            <DialogTitle id="form-dialog-title">Add Phrase</DialogTitle>

            <DialogContent>
                <TextField
                    label="Phrase"
                    value={phrase}
                    onChange={phraseChange}
                    type="text"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                    margin="normal"
                    fullWidth
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                    Cancel
          </Button>
                <Button type="submit"
                    onClick={addPhrase}
                    color="primary">
                    Add
          </Button>
            </DialogActions>
        </Dialog>
    );
}
