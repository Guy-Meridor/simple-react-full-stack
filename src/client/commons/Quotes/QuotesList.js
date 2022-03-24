import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Quote from './Quote'
import List from '@material-ui/core/List';

function QuotesList(props) {
    return <List>
        {props.quotes.map((quote, i) => <Quote key={quote.song.id} {...quote} />)
            .reduce((acc, curr, idx, arr) =>
                idx < arr.length - 1 ? 
                acc.concat(curr, <Divider key={`d${idx}`} variant="inset" component="li" />) :
                acc.concat(curr), [])}
    </List>
}

export default QuotesList;