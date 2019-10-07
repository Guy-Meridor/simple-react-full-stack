import React from 'react'
import WordLink from '../../../commons/WordLink'

const publicApi = {}

publicApi.createLine = (words, elements) => {
    const line = elements.data.map((curr, i) => {
        if (curr.type != 'word') {
            return curr.element;
        }

        else {
            if (words.includes(curr.element.toLowerCase())) {
                return <b key={i}> {curr.element} </b>
            }
            else {
                return curr.element;
            }
        }
    })

    return line;
}

publicApi.createQuote = (instance, line) => ({
    line,
    paragraph: instance.paragraph,
    lineIndex: instance.line_index,
    key: `${instance.song_id}-${instance.total_line_index}`,
    song: {
        id: instance.song_id,
        name: instance.song_name,
        artist: instance.song_artist,
    }
});

export default publicApi;