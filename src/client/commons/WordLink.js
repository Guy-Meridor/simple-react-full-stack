import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    link: {
        '&:not(hover)': {
            textDecoration: 'none',
            color: 'inherit',
        },
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
            color: 'blue'
        }
    }
})

function WordLink(props) {
    const classes = useStyles();
    return <span> <Link className={classes.link} to={`/words/${props.word}`}> {props.word}</Link>
    </span>
}

export default WordLink