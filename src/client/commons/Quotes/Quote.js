import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles';;

const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
}));

export default function Quote(props) {
    const classes = useStyles();

    return (<ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar src={`/assets/songImages/${props.song.id}.jpg`} />
        </ListItemAvatar>
        <ListItemText
            primary={`${props.song.name} - ${props.song.artist}`}
            secondary={
                <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        {`${props.paragraph}, line ${props.lineIndex}`}
                    </Typography>
                    <br/>
                    {props.line}
                </React.Fragment>
            }
        />
    </ListItem>)
}