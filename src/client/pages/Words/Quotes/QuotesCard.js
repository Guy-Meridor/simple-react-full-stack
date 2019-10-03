import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import SongService from '../../Songs/SongService';
import WordService from '../WordService';
import Quote from './Quote'
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import WordLink from '../../../commons/WordLink'
import _ from 'lodash';

const useStyles = makeStyles(theme => ({
    list: {
        backgroundColor: theme.palette.background.paper,
    }
}));

function QuotesCard(props) {
    const classes = useStyles();
    const {word} = props;

    const [Quotes, setQuotes] = useState([]);
    async function fetchQuotes() {
        const instances = await WordService.getWordsInstances(word);
        let tmpArray = [];

        instances.data.forEach(async instance => {
            const { song_id, paragraph, total_line_index } = instance;
            const lineElements = await SongService.getLine(song_id, total_line_index);
            const line = lineElements.data.map((curr,i) => {
                if (curr.type != 'word') {
                    return curr.element;
                }
            
                else {
                    if (curr.element.toLowerCase() == word.toLowerCase()) {
                        return <b key={i}> {curr.element} </b>
                    }
                    else {
                        return <WordLink key={i} word={curr.element}></WordLink>
                    }
                }
            })

            const sameLine = tmpArray.find(q =>
                _.isEqual(q.line, line));
            if (!sameLine) {
                const quote = {
                    line,
                    paragraph,
                    key: `${song_id}-${total_line_index}`,
                    song: {
                        id: song_id,
                        name: instance.song_name,
                        artist: instance.song_artist,
                    }
                };

                tmpArray = tmpArray.slice();
                tmpArray.push(quote);
                setQuotes(tmpArray);
            }
        });

    }

    useEffect(() => {
        setQuotes([])
        fetchQuotes();
    },  [props.word]);

    return <Card className={props.className}>
        <CardContent>
            <Typography variant="h5">
                Quotes - {Quotes.length}
        </Typography>
            <List className={classes.list}>
                {Quotes.map((quote, i) => <Quote key={quote.key} {...quote} />)
                    .reduce((acc, curr, idx) =>
                        acc.concat(curr, <Divider key={`d${idx}`} variant="inset" component="li" />), [])}
            </List>
        </CardContent>
    </Card>
}

export default QuotesCard