import React, { useState, useEffect } from 'react';
import SongService from '../../../pages/Songs/SongService';
import WordService from '../../../pages/Words/WordService';
import QuotesCard from '../../../commons/Quotes/QuotesCard'
import WordsQuotesService from './WordsQuotesService'
import _ from 'lodash'

function WordsQuotesCard(props) {
    const { words } = props;

    const [Quotes, setQuotes] = useState([]);

    async function fetchQuotes() {
        let songQuotes = [];

        words.forEach(async word => {
            const result = await WordService.getWordsInstances(word);
            const instances = result.data
            instances.forEach(async instance => {
                const { song_id, song_name, song_artist, total_line_index } = instance;
                const lineElements = await SongService.getLine(song_id, total_line_index);
                const line = WordsQuotesService.createLine(words, lineElements);

                songQuotes = songQuotes.slice();
                let song = songQuotes.find(sq => sq.song.id == song_id);
                if (!song) {
                    song = {
                        lines: [],
                        song: {
                            id: song_id,
                            name: song_name,
                            artist: song_artist,
                        }
                    };

                    songQuotes.push(song);
                }

                if (!song.lines.includes(line => line.totalLineIndex == total_line_index)) {
                    const quote = WordsQuotesService.createQuote(instance, line);
                    song.lines.push(quote);
                    setQuotes(songQuotes);
                }
            });
        })

    }

    useEffect(() => {
        setQuotes([])
        fetchQuotes();
    }, [...props.words]);

    return <QuotesCard className={props.className} quotes={Quotes} />
}

export default WordsQuotesCard