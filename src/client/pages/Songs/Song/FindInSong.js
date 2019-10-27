import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import SongService from '../SongService'
import _ from 'lodash'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    foundWord: {
        marginTop: '2vh',
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function FindInSong(props) {
    const classes = useStyles();
    const [lines, setLines] = React.useState([]);
    const [word, setWord] = React.useState('');
    const [chosen, setChosen] = React.useState({
        line: 0,
        index: 0
    })

    async function fetchLines() {
        const result = await SongService.getSongLinesMeta(props.songId);

        setLines(result.data);
    }

    useEffect(() => {
        fetchLines();
    }, []);

    const findWord = async () => {
        const result = await SongService.getWordByIndex(props.songId, chosen.line, chosen.index);

        setWord(result.data)
    }

    const handleChange = name => event => {
        setChosen(oldValues => ({
            ...oldValues,
            [name]: event.target.value,
        }));

        if (chosen.line && chosen.index) {
            findWord();
        }
    };

    useEffect(() => {
        if (chosen.line && chosen.index) {
            findWord();
        }
    }, [chosen.line, chosen.index]);

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            TransitionComponent={Transition}
            maxWidth={'sm'}>
            <DialogTitle id="form-dialog-title">Find Word By Index</DialogTitle>
            <DialogContent>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="Line">Line</InputLabel>
                    <Select
                        value={chosen.line}
                        onChange={handleChange('line')}
                    >
                        {lines.map(line => <MenuItem key={line.total_line_index} value={line.total_line_index}>{line.total_line_index}</MenuItem>)}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="Index">Index</InputLabel>
                    <Select
                        value={chosen.index}
                        onChange={handleChange('index')}
                    >
                        {chosen.line && Array.from({ length: lines[chosen.line - 1].words_in_line }, (v, i) => <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>)}
                    </Select>
                </FormControl>
                <Typography className={classes.foundWord} variant="subtitle1">
                    Word: {word}
                </Typography>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                    Close
          </Button>
            </DialogActions>
        </Dialog >
    );
}
