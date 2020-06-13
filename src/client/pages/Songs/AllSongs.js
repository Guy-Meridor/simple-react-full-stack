import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import SongView from './SongView'
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton'
import AddSong from './AddSong'
import SongService from './SongService'
import FilterSongs from './FilterSongs'
import PageTitle from "../../commons/PageTitle";

const useStyles = makeStyles(theme => ({
    songsContainer: {
        marginLeft: '10%',
        float: 'left',
        width: '40%'
    },
    filterContainer: {
        marginTop:'2vh',
        marginRight: '10%',
        float: 'right',
        width: '33%'

    },
    title: {
        color: theme.palette.text.primary,
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
            <PageTitle>
                Songs
            <IconButton onClick={handleClickOpen}>
                    <Icon color='primary' className={classes.addIcon}>add</Icon>
                </IconButton>
            </PageTitle>
            <div className={classes.songsContainer}>
                {songs.map(song => (
                    <SongView key={song.id} song={song} />
                ))}
            </div>

            <div className={classes.filterContainer}>
                    <FilterSongs setSongs={setSongs} clearFilters={fetchSongs}></FilterSongs>
            </div>
            <AddSong open={dialogOpen} handleClose={handleClose} afterSave={fetchSongs}></AddSong>
        </div>
    );
}

export default AllSongs;