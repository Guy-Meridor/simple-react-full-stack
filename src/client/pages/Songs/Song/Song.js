import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import WordLink from '../../../commons/WordLink'
import Typography from '@material-ui/core/Typography';
import SongService from '../SongService'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton'
import FindInSong from './FindInSong'
import Box from '@material-ui/core/Box';
import DeleteButton from '../../../commons/DeleteButton'
import Grid from '@material-ui/core/Grid';
import MarkMenu from './MarkMenu'


const useStyles = makeStyles({
    card: {
        width: '50%',
        marginLeft: '25%',
        marginRight: '25%',
    },
    cardHeader: {
        flexGrow: 1
    },
    image: {
        maxWidth: '100%',
    },

    lyrics: {
        whiteSpace: 'pre-line',
    },
});


function Song({ match }) {
    const classes = useStyles(match.params);
    const { id } = match.params;

    const [titles, setTitles] = useState({});
    const [lyrics, setLyrics] = React.useState();
    const [finderOpen, setFinderOpen] = React.useState(false);
    const [markMenuOpen, setMarkMenu] = React.useState(false);

    const setFinderState = state => e => setFinderOpen(state);

    async function fetchTitles() {
        const result = await SongService.getSongTitles(id);

        setTitles(result.data);
    }

    useEffect(() => {
        fetchTitles();
        fetchLyrics();
    }, []);

    const onMouseUp = (e) => {
        const selection = window.getSelection().toString();
        if (selection)
            setMarkMenu(true)
        // {
        //     if (selection.includes(' ')){

        //     }
        //     else{

        //     }
        // }
    }

    const closeMarkMenu = () => {
        setMarkMenu(false);
    }

    async function fetchLyrics() {
        const result = await SongService.getSongLyrics(id);

        const song = result.data.reduce((acc, curr) => acc +
            (curr.type === 'word' ? ' ' : '') + curr.element, '');

        setLyrics(song)
    }

    return (
        <Card className={classes.card}>
            <div className={classes.cardHeader}>

                <Grid container spacing={1}>
                    <Grid item xs={5}>
                        <img className={classes.image} src={`/assets/songImages/${match.params.id}.jpg`}></img>
                    </Grid>
                    <Grid item xs={7}>
                        <Box className={classes.titles} justifyContent="space-between" display="flex">
                            <Typography variant="h4" component="span">
                                {titles.name}
                            </Typography>
                            <DeleteButton onDelete={alert} />
                        </Box>
                        <Typography variant="h6" color="textSecondary">
                            {titles.artist}
                        </Typography>
                        <IconButton onClick={setFinderState(true)}>
                            <Icon color='primary'>search</Icon>
                        </IconButton>
                    </Grid>
                </Grid>
            </div>

            <CardContent >
                <Typography onMouseUp={onMouseUp} className={classes.lyrics} component="pre" variant="body2" gutterBottom>
                    {lyrics}
                </Typography>
            </CardContent>
            <FindInSong open={finderOpen} handleClose={setFinderState(false)} songId={id} />
            <MarkMenu open={markMenuOpen} onClose={closeMarkMenu} selection={window.getSelection().toString()} />
        </Card >
    );
}

export default Song