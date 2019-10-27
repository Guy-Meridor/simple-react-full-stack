import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchWords from '../Words/SearchWords'
import { List } from 'semantic-ui-react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton'
import SongsSerivce from './SongService'


const useStyles = makeStyles({
    title: {
        textAlign: 'center',
        marginBottom: '3vh'
    },
    filterWordsContainer: {
        display: 'flex',
        marginTop: '2vh',
        marginBottom: '1vh'
    },
    filterActions: {
        float: 'right'
    },
    searchBar: {
        height: '25px'
    },
})

function FilterSongs(props) {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        name: '',
        artist: '',
    });

    const [words, setWords] = React.useState([]);

    const textHandleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const addWordToSearch = word => {
        if (!words.includes(word)) {
            const newArray = words.slice();
            newArray.push(word);
            setWords(newArray);
            return true;
        }
    }

    const removeWordFromSearch = index => e => {
        const newArray = words.slice();
        newArray.splice(index, 1);
        setWords(newArray);
    }

    async function getFilteredSongs() {
        const filters = {
            ...values,
            words,
        }

        const result = await SongsSerivce.filterSongs(filters);
        props.setSongs(result.data)

    }

    function clearFilters() {
        setValues({ name: '', artist: '' });
        setWords([]);
        props.clearFilters();
    }



    return <Card className={props.className}>
        <CardContent>
            <Typography variant="h5">
                Filter Songs
    </Typography>
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
            <div className={classes.filterWordsContainer}>

                <Typography variant="subtitle1" component="span">
                    Contains:
            </Typography>
                <SearchWords executeSearch={addWordToSearch} initAfterSearch={true} inputClassName={classes.searchBar} />
            </div>
            At least one of the words:
            <List horizontal celled className={classes.wordsList}>
                {words.map((word, index) => <List.Item>
                    {word}
                    <IconButton size="small" onClick={removeWordFromSearch(index)}>
                        <Icon color='secondary'>delete</Icon>
                    </IconButton>
                </List.Item>)}
            </List>
        </CardContent>
        <CardActions className={classes.filterActions}>
            <Button variant="contained" size="small" color="secondary" onClick={clearFilters}>
                Clear
        </Button>
            <Button variant="contained" size="small" color="primary" onClick={getFilteredSongs}>
                Filter
        </Button>
        </CardActions>

    </Card>
}

export default FilterSongs;