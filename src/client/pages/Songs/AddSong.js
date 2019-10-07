import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import SongService from './SongService';

const useStyles = makeStyles(theme => ({
    fileInputContainer: {
        marginTop: 16,
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default function AddSong(props) {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        name: '',
        artist: '',
    });

    const textHandleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const fileHandleChange = name => event => {
        setValues({ ...values, [name]: event.target.files[0] })
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="form-dialog-title"
            TransitionComponent={Transition}>
            <DialogTitle id="form-dialog-title">Add Song</DialogTitle>
            <form method="post" action="/api/songs" encType="multipart/form-data">
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="name"
                        type="text"
                        onChange={textHandleChange('name')}
                        value={values.name}
                        fullWidth
                        name="name"
                    />
                    <TextField
                        margin="dense"
                        label="Artist"
                        type="text"
                        onChange={textHandleChange('artist')}
                        value={values.artist}
                        fullWidth
                        name="artist"
                    />
                    <div className={classes.fileInputContainer}>
                        <FormLabel display='inline'>Image: </FormLabel>
                        <input
                            onChange={fileHandleChange('image')}
                            type="file"
                            name="image" />
                    </div>
                    <div className={classes.fileInputContainer}>
                        <FormLabel display='inline'>Lyrics: </FormLabel>
                        <input
                            onChange={fileHandleChange('lyrics')}
                            type="file"
                            name="lyrics" />
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="secondary">
                        Cancel
          </Button>
                    <Button type="submit"
                        // onClick={addSong}
                        color="primary">
                        Add
          </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
