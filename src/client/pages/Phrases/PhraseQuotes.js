import React, { useState, useEffect } from 'react';
import SongService from '../Songs/SongService';
import WordService from '../Words/WordService';
import QuotesCard from '../../commons/Quotes/QuotesCard'
import PhrasesService from './PhrasesService'
import WordsQuotesService from '../Words/Quotes/WordsQuotesService'
import _ from 'lodash'

function PhraseQuotes(props) {
    const { phrase } = props;

    const [Quotes, setQuotes] = useState([]);

    async function fetchQuotes() {
        let songQuotes = [];
        const result = await PhrasesService.getPhraseInstances(phrase);
        const instances = result.data;
        instances.forEach(async instance => {
            const { song_id, song_name, artist, total_line_index } = instance;
            const lineElements = await SongService.getLine(song_id, total_line_index);
            const line = PhrasesService.createLine(phrase, lineElements);

            let song = songQuotes.find(sq => sq.song.id == song_id);
            if (!song) {
                song = PhrasesService.createSongQuotes(song_id, song_name, artist);
                songQuotes.push(song);
            }

            if (!song.lines.some(exsLine => exsLine.totalLineIndex  == total_line_index)) {
                const quote = WordsQuotesService.createQuote(instance, line);
                song.lines.push(quote);
                songQuotes = songQuotes.slice();
                setQuotes(songQuotes);
            }
        });


    }

    useEffect(() => {
        setQuotes([])
        fetchQuotes();
    }, [props.phrase]);

    return <QuotesCard className={props.className} quotes={Quotes} />
}

export default PhraseQuotes