import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { Input } from 'semantic-ui-react'
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import QuotesCard from './Quotes/QuotesCard';
import TranslateCard from './Translate/TranslateCard';

const useStyles = makeStyles({
    root: {
        marginLeft: '3vh',
    },
    title: {
        textAlign: 'center',
        marginBottom: '3vh'
    },
    searchBar: {
        width: '50%',
        marginRight: '25%',
        marginLeft: '25%',
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

function Words({ match }) {

    const classes = useStyles();
    const { word } = match.params;

    return <div className={classes.root}>
        <Typography className={classes.title} variant="h4">
            Words
        </Typography>

        <Input value={word} className={classes.searchBar} icon="search" placeholder='Search Word...' />
        <div className={classes.cardsContainer}>
            <QuotesCard className={classes.quotesCard} word={word} />
            <TranslateCard className={classes.translateCard} word={word}/>
        </div>
    </div >
}


export default Words;