import axios from 'axios'
import React from 'react'

const publicApi = {}
const PhrasesAPI = axios.create({
    baseURL: `/api/phrases`,
});

publicApi.addPhrase = phrase => PhrasesAPI.post('/', { phrase });
publicApi.getPhraseInstances = phrase => PhrasesAPI.get(`/${phrase}/instances`);

publicApi.deletePhrase = phrase => PhrasesAPI.delete(`/${phrase}`)
publicApi.getPhrases = PhrasesAPI.get;

publicApi.createLine = (phrase, elements) => {
    const phraseElements = phrase.split(' ');


    const line = elements.data.reduce((acc, curr) => {
        if (curr.type != 'word') {
            return acc + curr.element;
        }

        else {
            return `${acc} ${curr.element}`;
        }
    }, '');

    const phraseRegex = new RegExp(`(${phrase})`, 'ig')
    // const boldLine = line.replace(phraseRegex, "<b>$1</b>")
    // return boldLine;
    const parts = line.split(phraseRegex);

    for (var i = 1; i < parts.length; i += 2) {
        parts[i] = <b key={i}>{parts[i]}</b>;
    }
    return parts;


    // const boldElements = line.split(phrase).reduce((acc, curr, idx, arr) => idx < arr.length - 1 ? acc.concat(curr, <b key={idx}>{phrase}</b>) : acc, [])
    // return boldElements;
}

publicApi.createSongQuotes = (id, name, artist) => (
    {
        lines: [],
        song: {
            id,
            name,
            artist,
        }
    }
);

export default publicApi
