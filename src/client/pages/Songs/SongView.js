import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    rootLink: {
        textDecoration: 'none',
        color: 'inherit',
    },
    card: {
        margin: '2vh 2vw 2vh 2vw',
        display: 'flex',
        transition: '0.5s',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)'
        }
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        padding: '2vh 2vw 2vh 2vw'
    },
    cover: {
        width: 151,
    },
}));

export default function SongView(props) {
    const classes = useStyles();

    return (
        <Link className={classes.rootLink} to={`/songs/${props.song.id}`}>
            <Card className={classes.card}>
                    <CardMedia
                        className={classes.cover}
                        image={`/assets/songImages/${props.song.id}.jpg`}
                        title={props.song.name}
                    />
                    <CardContent className={classes.content}>
                        <Typography variant="h6">
                            {props.song.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {props.song.artist}
                        </Typography>
                    </CardContent>
            </Card>
        </Link>
    );
}