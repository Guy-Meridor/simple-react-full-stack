import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Quote from './Quote'
import List from '@material-ui/core/List';

function QuotesList(props) {
    return <List>
        {props.quotes.map((quote, i) => <Quote key={quote.key} {...quote} />)
            .reduce((acc, curr, idx) =>
                acc.concat(curr, <Divider key={`d${idx}`} variant="inset" component="li" />), [])}
    </List>
}

export default QuotesList;