import React, { useState, useEffect } from 'react';
import SongService from '../../Songs/SongService';
import WordService from '../WordService';
import QuotesCard from '../../../commons/Quotes/QuotesCard'
import GroupsQuotesService from './GroupsQuotesService'

function GroupsQuotesCard(props) {
    const { words } = props;

    const [Quotes, setQuotes] = useState([]);
    async function fetchQuotes() {
        let tmpArray = [];
        words.forEach(async word => {

            const instances = await WordService.getWordsInstances(word);
            instances.data.forEach(async instance => {
                const { song_id, total_line_index } = instance;
                const lineElements = await SongService.getLine(song_id, total_line_index);
                const line = GroupsQuotesService.createLine(words, lineElements);

                const sameLine = tmpArray.find(q => q.key === `${song_id}-${total_line_index}`)
                if (!sameLine) {
                    const quote = GroupsQuotesService.createQuote(instance, line);
                    tmpArray = tmpArray.slice();
                    tmpArray.push(quote);
                    setQuotes(tmpArray);
                }
            });
        })
    }

    useEffect(() => {
        setQuotes([])
        fetchQuotes(); 
    }, [props.word]);

    return <QuotesCard className={props.className} quotes={Quotes} />
}

export default GroupsQuotesCard