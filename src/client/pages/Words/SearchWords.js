import React, { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react'
import WordsService from './WordService'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    searchBar: {
        width: '100%',
    }
})


function SearchWords(props) {
    const classes = useStyles()
    const { value } = props;

    const [search, setSearch] = useState(value);
    const [searchResults, setSearchResults] = useState([]);

    const searchChange = (e, data) => {
        setSearch(data.value);
        if (props.onChange) {
            props.onChange(e)
        }
    }

    const executeSearch = e => {
        if (props.executeSearch && e.key == 'Enter') {
            const result = props.executeSearch(search);
            if (result){
                setSearch('')
            }

        }
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
        setSearch(value)
    }, [value])

    return <div className={props.className}>
        <Input
            list={`${props.id}-words`}
            value={search || ''}
            onKeyPress={executeSearch}
            onChange={searchChange}
            icon="search"
            placeholder='Search Word...'
            className={`${props.inputClassName} ${classes.searchBar}`} />
        <datalist id={`${props.id}-words`}>
            {searchResults.map(r => <option key={r} value={r}></option>)}
        </datalist>

    </div>
}

export default SearchWords