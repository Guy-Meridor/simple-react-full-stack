import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton'
import AddPhrase from './AddPhrase'
import PhrasesService from './PhrasesService'
// import WordsQuotesCard from './../Words/Quotes/WordsQuotesCard'
import PhraseQuotes from './PhraseQuotes'
// import PhraseInstances from './PhraseInstances'

import PhrasesCard from './PhrasesCard'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles({
    title: {
        textAlign: 'center',
        marginBottom: '3vh'
    },
    addIcon: {
        marginLeft: '10'
    },
    cardsContainer: {
        marginTop: '3vh',
    },
    quotesCard: {
        marginLeft: '5%',
        float: 'left',
        width: '50%'
    },
    phrasesCard: {
        marginRight: '5%',
        float: 'right',
        width: '35%'
    }
})

function Phrases({ match, history }) {
    const classes = useStyles();

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [chosenPhrase, setChosen] = React.useState(null);
    const [phrases, setPhrases] = React.useState([]);

    async function fetchPhrases() {
        const result = await PhrasesService.getPhrases();

        setPhrases(result.data)

        if (result.data.length > 0 && !match.params.phrase) {
            selectPhrase(result.data[0])
        }
    }

    useEffect(() => {
        fetchPhrases();
    }, []);

    useEffect(() => {
        const { phrase } = match.params;
        setChosen(phrase)
    }, [match.params.phrase])

    function handleClickOpen() {
        setDialogOpen(true);
    }

    function handleClose() {
        setDialogOpen(false);
    }

    const selectPhrase = phrase => {
        history.push(`/phrases/${phrase}`)
    }

    const onAddPhrase = phrase => {
        const newPhrases = phrases.slice();
        newPhrases.push(phrase);
        setPhrases(newPhrases);
        selectPhrase(phrase);
        handleClose();
    }

    const onDeletePhrase = async phrase => {
        if (confirm(`Are you sure you want to delete the phrase: ${phrase}?`)) {

            const result = await PhrasesService.deletePhrase(phrase);
            if (result.data) {
                const tempArray = phrases.filter(curr => curr != phrase);
                setPhrases(tempArray);
                if (chosenPhrase == phrase){
                    selectPhrase(tempArray[0])
                }
            }
        }
    }

    return <div>
        <Typography className={classes.title} variant="h5">
            Phrases
            <IconButton onClick={handleClickOpen}>
                <Icon color='primary' className={classes.addIcon}>add</Icon>
            </IconButton>
        </Typography>

        <div className={classes.cardsContainer}>
            {chosenPhrase && <PhraseQuotes className={classes.quotesCard} phrase={chosenPhrase} />}
            <PhrasesCard className={classes.phrasesCard} phrases={phrases} chosen={chosenPhrase} clickPhrase={selectPhrase} deletePhrase={onDeletePhrase} />
        </div>

        <AddPhrase open={dialogOpen} handleClose={handleClose} onAdd={onAddPhrase}></AddPhrase>
    </div>
}

export default withRouter(Phrases);