import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react'
import WordsService from './WordService'
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'


const useStyles = makeStyles({
    searchBar: {
        width: '50%',
        marginRight: '25%',
        marginLeft: '25%',
        '& input::-webkit-calendar-picker-indicator': {
            display: 'none'
        }
    }
});

function SearchWords(props) {
    const classes = useStyles();
    const { word } = props;

    const [search, setSearch] = useState(word || '');
    const [searchResults, setSearchResults] = useState([]);

    const searchChange = (e, data) => {
        setSearch(data.value);
    }

    const executeSearch = e => {
        if (e.key == 'Enter')
            props.history.push(`/words/${search}`)
    }

    async function fetchSearch() {
        const result = await WordsService.getWordsStartsWith(search);

        setSearchResults(result.data)
    }

    useEffect(() => {
        if (search) {
            fetchSearch();
        }
        else {
            setSearchResults([])
        }
    }, [search]);

    useEffect(() => {
        setSearch(word)
    }, [word])

    // return <Dropdown
    //     className={classes.searchBar}
    //     placeholder='Search Words'
    //     search
    //     selection
    //     options={[1,2,3]}
    //     onChange={searchChange}
    //     value={search}
    // />

    return <div>
        <Input list="words" value={search} onKeyPress={executeSearch} onChange={searchChange} className={classes.searchBar} icon="search" placeholder='Search Word...' />
        <datalist id='words'>
            {searchResults.map(r => <option key={r} value={r}></option>)}
        </datalist>

    </div>
}

export default withRouter(SearchWords)