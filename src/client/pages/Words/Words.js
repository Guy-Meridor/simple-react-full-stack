import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import WordsQuotesCard from './Quotes/WordsQuotesCard';
import TranslateCard from './Translate/TranslateCard';
import SearchWords from './SearchWords'

const useStyles = makeStyles({
    root: {
        marginLeft: '3vh',
    },
    title: {
        textAlign: 'center',
        marginBottom: '3vh'
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

function Words({ match }) {

    const classes = useStyles();
    const { word } = match.params;

    return <div className={classes.root}>
        <Typography className={classes.title} variant="h5">
            Words
        </Typography>

        <SearchWords word={word}/>
        {word && <div className={classes.cardsContainer}>
            <WordsQuotesCard className={classes.quotesCard} words={[word]} />
            <TranslateCard className={classes.translateCard} word={word} />
        </div>}
    </div >
}


export default Words;