import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import WordsQuotesCard from './Quotes/WordsQuotesCard';
import TranslateCard from './Translate/TranslateCard';
import SearchWords from './SearchWords'
import { withRouter } from 'react-router-dom'
import AllWordsDialog from './AllWordsDialog'
import PhraseQuotes from '../Phrases/PhraseQuotes'
import { Button } from 'semantic-ui-react'
import PageTitle from "../../commons/PageTitle";


const useStyles = makeStyles({
    root: {
        marginLeft: '3vh',
    },
    container: {
        display: 'flex'
    },
    searchBarContainer: {
        marginLeft: '25%',
        width: '50%'
    },
    searchBar: {
        '& input::-webkit-calendar-picker-indicator': {
            display: 'none'
        }
    },
    cardsContainer: {
        marginTop: '3vh',
    },
    quotesCard: {
        marginLeft: '10%',
        float: 'left',
        width: '40%'
    },
    translateCard: {
        marginRight: '10%',
        float: 'right',
        width: '33%'
    },
    languageDropdown: {
        width: '40%'
    }

})

function Words({ match, history }) {

    const classes = useStyles();
    const { word } = match.params;

    const executeSearch = (search) => {
        history.push(`/words/${search}`)
    }

    const [wordsDialogOpen, setWordsDialogOpen] = useState(false);
    const toggleWordsDialog = state => () => setWordsDialogOpen(state);

    const isPhrase = word && word.includes(' ');

    return <div className={classes.root}>
        <PageTitle>
            Words
        </PageTitle>
        <div className={classes.container}>
            <SearchWords className={classes.searchBarContainer} value={word} executeSearch={executeSearch} inputClassName={classes.searchBar} />
            <Button primary onClick={toggleWordsDialog(true)}>All Words</Button>
        </div>
        {word && <div className={classes.cardsContainer}>
            {isPhrase ? <PhraseQuotes className={classes.quotesCard} phrase={word} /> :
                <WordsQuotesCard className={classes.quotesCard} word={word} />}

            <TranslateCard className={classes.translateCard} word={word} />
        </div>}

        <AllWordsDialog wordClick={executeSearch} open={wordsDialogOpen} handleClose={toggleWordsDialog(false)}></AllWordsDialog>
    </div >
}


export default withRouter(Words);