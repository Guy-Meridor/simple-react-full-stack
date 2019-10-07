import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import QuotesList from './QuotesList'

function QuotesCard(props) {

    return <Card className={props.className}>
        <CardContent>
            <Typography variant="h5">
                Quotes - {props.quotes.length}
        </Typography>
            <QuotesList quotes={props.quotes}/>
        </CardContent>
    </Card>
}

export default QuotesCard