import React from 'react'
import WordLink from '../../../commons/WordLink'

const publicApi = {}

publicApi.createLine = (words, elements) => {
    const line = elements.data.map((curr, i) => {
        if (curr.type != 'word') {
            return curr.element;
        }

        else {
            const currRegex = new RegExp(curr.element, 'i');
            
            if (words.some(word => currRegex.exec(word))) {
                return <b key={i}> {curr.element} </b>
            }
            else {
                return <WordLink key={i} word={curr.element}></WordLink>
            }
        }
    })

    return line;
}

publicApi.createQuote = (instance, text) => ({
    text,
    paragraph: instance.paragraph,
    lineIndex: instance.line_index,
    totalLineIndex: instance.total_line_index,
    key:`${instance.song_id}-${instance.total_line_index}`
});

export default publicApi;