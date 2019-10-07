import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import WordLink from '../../commons/WordLink'
import Typography from '@material-ui/core/Typography';
import SongService from './SongService'


const useStyles = makeStyles({
    card: {
        width: '50%',
        marginLeft: '25%',
        marginRight: '25%',
    },
    cardHeader: {
        display: 'flex',
        '& div': {
            margin: 20
        }
    },
    image: {
        height: 150,
        width: '40%',
    },

    lyrics: {
        whiteSpace: 'pre-line',
        // '& a': {
        //     '&:not(hover)': {
        //         textDecoration: 'none',
        //         color: 'black',
        //     },
        //     '&:hover': {
        //         cursor: 'pointer',
        //         textDecoration: 'underline',
        //         color: 'blue'
        //     }
        // }
    },
});


function Song({ match }) {
    const classes = useStyles(match.params);
    const { id } = match.params;

    const [titles, setTitles] = useState({});
    const [lyrics, setLyrics] = React.useState();

    async function fetchTitles() {
        const result = await SongService.getSongTitles(id);

        setTitles(result.data);
    }

    useEffect(() => {
        fetchTitles();
        fetchLyrics();
    }, []);

    async function fetchLyrics() {
        const result = await SongService.getSongLyrics(id);

        const song = result.data.map((current, index) =>
            (current.type === 'word'
                ? <WordLink key={index} word={current.element} />
                : current.element)
        )

        setLyrics(song)
    }

    return (
        <Card className={classes.card}>
            <div className={classes.cardHeader}>
                <img className={classes.image} src={`/assets/songImages/${match.params.id}.jpg`}></img>
                <div>
                    <Typography variant="h4">
                        {titles.name}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                        {titles.artist}
                    </Typography>
                </div>
            </div>
            <CardContent>
                <Typography className={classes.lyrics} component="pre" variant="body2" gutterBottom>
                    {lyrics}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default Song;