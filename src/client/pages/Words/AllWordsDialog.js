import React, { useState, useEffect } from 'react';
import WordService from './WordService'
import ChooseDialog from '../../commons/ChooseDialog'

function AllWordsDialog(props) {

    const [words, setWords] = useState([]);
    async function fetchWords() {
        const result = await WordService.API.get();

        setWords(result.data);
    }

    useEffect(() => {
        fetchWords();
    }, [])

    return <ChooseDialog
        options={words}
        choose={props.wordClick}
        open={props.open}
        handleClose={props.handleClose}
        title='Chose A Word'></ChooseDialog>

}

export default AllWordsDialog;

