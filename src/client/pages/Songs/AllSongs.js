import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import SongView from './SongView'
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton'
import AddSong from './AddSong'
import SongService from './SongService'

const useStyles = makeStyles(theme => ({
    songsContainer: {
        width: '50%',
        marginLeft: '25%',
        marginRight: '25 %',
    },
    title: {
        textAlign: 'center',
        marginBottom: '3vh'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400,
    },
    addIcon: {
        marginLeft: '10'
    }

}))

function AllSongs() {
    const classes = useStyles();

    const [songs, setSongs] = useState([]);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    function handleClickOpen() {
        setDialogOpen(true);
    }

    function handleClose() {
        setDialogOpen(false);
    }

    async function fetchSongs() {
        const result = await SongService.getSongs();

        setSongs(result.data);
    }

    useEffect(() => {
        fetchSongs();
    }, []);

    return (
        <div>
            <Typography className={classes.title} variant="h5">
                Songs
            <IconButton onClick={handleClickOpen}>
                    <Icon color='primary' className={classes.addIcon}>add</Icon>
                </IconButton>
            </Typography>
            <div className={classes.songsContainer}>
                {songs.map(song => (
                    <SongView key={song.id} song={song} />
                ))}
            </div>
            <AddSong open={dialogOpen} handleClose={handleClose} afterSave={fetchSongs}></AddSong>
        </div>
    );
}

export default AllSongs;