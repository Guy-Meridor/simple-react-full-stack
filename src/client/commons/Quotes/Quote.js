import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles';
import { Link, NavLink } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    inline: {
        display: 'inline',
    },
}));

export default function Quote(props) {
    const classes = useStyles();

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Link to={`/songs/${props.song.id}`}>
                    <Avatar src={`/assets/songImages/${props.song.id}.jpg`} />
                </Link>
            </ListItemAvatar>
            <ListItemText
                primary={<Link to={`/songs/${props.song.id}`}>
                    {`${props.song.name} - ${props.song.artist}`}
                </Link>}
                secondary={
                    props.lines.map(line => <React.Fragment key={`${props.song.id}-${line.totalLineIndex}`}>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {`${line.paragraph}, line ${line.lineIndex} (total line ${line.totalLineIndex})`}
                        </Typography>
                        <br />
                        {line.text}
                        <br /> <br/>
                    </React.Fragment>)
                }
            />
        </ListItem>)
}