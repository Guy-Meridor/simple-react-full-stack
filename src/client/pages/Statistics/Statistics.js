import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StatCard from './StatCard'
import StatisticsService from './StatisticsService'

const useStyles = makeStyles({
    title: {
        textAlign: 'center',
        marginBottom: '1vh'
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap:'wrap',
    },
    statCard: {
        margin: '0.35%',
        width: '31.5vw',
    },
    pieContainer: {
        width: '31vw',
        height: '38vh'
    }
})

function Statistics(props) {
    const classes = useStyles();

    const cardsProps = [
        {
            title: 'Words Lengths',
            scheme: 'nivo',
            getData: StatisticsService.getWordsLengths
        },
        {
            title: 'Most Common Phrases',
            scheme: 'accent',
            getData: StatisticsService.getPhrasesCounts
        },
        {
            title: 'Most Common Words',
            scheme: 'paired',
            getData: StatisticsService.getWordsCounts
        },
        {
            title: 'Words In Lines',
            scheme: 'red_blue',
            getData: StatisticsService.getLinesLengths
        },
        {
            title: 'Words In Paragraphs',
            scheme: 'dark2',
            getData: StatisticsService.getParagraphsLengths
        }
    ]

    return <div>
        <Typography className={classes.title} variant="h5">
            Statistics
        </Typography>
        <div className={classes.statsContainer}>
            {cardsProps.map(cp => <StatCard className={classes.statCard} pieContainer={classes.pieContainer} {...cp} />)}
        </div>
    </div>
}

export default Statistics;