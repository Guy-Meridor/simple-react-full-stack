import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

export default function Quote(props) {
    return (<ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar src={`/assets/songImages/${props.song.id}.jpg`} />
        </ListItemAvatar>
        <ListItemText
            primary={`${props.song.name} - ${props.song.artist} (${props.paragraph})`}
            secondary={
                <React.Fragment>
                    {/* <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >
                        Ali Connors
                    </Typography> */}
                    {props.line}
                </React.Fragment>
            }
        />
    </ListItem>)
}