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
import GroupsService from './GroupsService'

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

export default function AddGroup(props) {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        name: '',
        numOfWords: 0,
    });

    const [words, setWords] = React.useState([]);
    useEffect(() => {
        const currNum = words.length;
        const diff = values.numOfWords - currNum;
        if (diff > 0) {
            const newValues = Array.from({ length: diff }, () => '');
            const newArray = words.concat(newValues);
            setWords(newArray);
        }
        else {
            const newArray = words.slice();
            newArray.splice(diff);
            setWords(newArray);
        }
    }, [values.numOfWords]);


    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const wordChange = index => event => {
        const newArray = words.slice();
        newArray[index] = event.target.value;
        setWords(newArray)
    }

    const addGroup = async () => {
        const { name } = values;
        const group = { name, words };
        const result = await GroupsService.addGroup(group);

        if (result) {
            props.onAdd(group);
        }

    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            TransitionComponent={Transition}
            maxWidth={'xs'}>
            <DialogTitle id="form-dialog-title">Add Group</DialogTitle>

            <DialogContent>

                <TextField
                    margin="dense"
                    label="Group Name"
                    type="text"
                    onChange={handleChange('name')}
                    value={values.name}
                    fullWidth
                    name="name"
                />

                <TextField
                    id="standard-number"
                    label="Number Of Words"
                    value={values.numOfWords}
                    onChange={handleChange('numOfWords')}
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                    margin="normal"
                    fullWidth
                />

                <Typography className={classes.addWords} variant="subtitle1">
                    Words
                    </Typography>

                {words.map((currWord, index) => (
                    <SearchWords className={classes.wordsInput} id={`addGroup_${index}`} key={index} value={currWord} onChange={wordChange(index)} />
                ))}

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="secondary">
                    Cancel
          </Button>
                <Button type="submit"
                    onClick={addGroup}
                    color="primary">
                    Add
          </Button>
            </DialogActions>
        </Dialog>
    );
}
