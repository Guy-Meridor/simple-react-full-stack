var lineReader = require('line-reader');
const dbProvider = require('./songsDBProvider');
const root = require('app-root-path');

var paragraphHeader = /\[(.*?)\]/
const sentenceSeperatorRegex = /[\w']+|[^\s\w]/g
const marks = '[.,!?\\-\(\)"‘’—]'
//const otherMarks = '[\(\)"‘’]'
const newLine = '\n';
const markTypes = {
    whiteSpace: 'white_space',
    punctuation: 'punctuation',
    header: 'header'
};


const publicApi = {}
publicApi.addWordsFromFile = async songId => {

    const path = `${root.path}/assets/songLyrics/${songId}.txt`;

    let paragraph,
        totalLineIndex = lineIndex = index = 1;

    const dbPromises = [];
    lineReader.eachLine(path, function (line) {
        let inlineIndex = 1;
        if (!line) {
            const newLineInsertPromise = dbProvider.addMarkToSong({ mark: newLine, type: markTypes.whiteSpace, songId, index, paragraph, lineIndex, totalLineIndex })
            dbPromises.push(newLineInsertPromise);
            index++;
            lineIndex = 1;
        }
        else {
            const headerCheck = line.match(paragraphHeader);
            if (headerCheck) {
                paragraph = headerCheck[1];
                const markInsertPromise = dbProvider.addMarkToSong({ mark: line, type: markTypes.header, songId, index, paragraph, lineIndex, totalLineIndex })
                dbPromises.push(markInsertPromise);
                index++;
            }
            else {
                const wordsAndPunctuation = line.match(sentenceSeperatorRegex);
                wordsAndPunctuation.forEach(element => {
                    if (element.match(marks)) {
                        const markInsertPromise = dbProvider.addMarkToSong({ mark: element, type: markTypes.punctuation, songId, index, paragraph, lineIndex, totalLineIndex })
                        dbPromises.push(markInsertPromise);
                    }
                    else {
                        const wordInsertPromise = dbProvider.addWordToSong({
                            word: element, songId,
                            index, paragraph, lineIndex, inlineIndex, totalLineIndex
                        });

                        dbPromises.push(wordInsertPromise);
                        inlineIndex++;
                    }
                    index++;
                });

                totalLineIndex++;
                lineIndex++;
            }

            const newLineInsertPromise = dbProvider.addMarkToSong({ mark: newLine, type: markTypes.whiteSpace, songId, index, paragraph, lineIndex, totalLineIndex })
            dbPromises.push(newLineInsertPromise);
            index++;
        }

    });

    return Promise.all(dbPromises);
}

module.exports = publicApi;