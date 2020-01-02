import React from 'react'
const publicApi = {};

publicApi.makeText = (elements) => {
    const flags = { isClosingEmphasis: false };
    let text = ''
    for (let index = 0; index < elements.length - 1; index++) {
        const curr = elements[index];
        const next = elements[index + 1];

        if (checkIfSpace(curr, next, flags)) {
            text += curr.element + ' '
        }
        else {
            text += curr.element;
        }
    }

    text += elements[elements.length - 1].element;
    return text;
}

publicApi.makeTextWithBold = (elements, textToBold) => {
    const line = publicApi.makeText(elements);
    const phraseRegex = new RegExp(`(${textToBold})`, 'ig')
    const parts = line.split(phraseRegex);

    for (var i = 1; i < parts.length; i += 2) {
        parts[i] = <b key={i}>{parts[i]}</b>;
    }
    return parts;
}

function checkIfSpace(curr, next, flags) {
    let val;
    if (curr.type === 'word') {
        if (next.type === 'word') {
            val = true;
        }
        else {
            if (next.element === '(') {
                val = true;
            }
            else if (next.element === '"') {
                if (flags.isClosingEmphasis) {
                    val = false;
                }
                else {
                    val = true;
                }
            }
            else {
                val = false;
            }
        }
    }
    else {
        if (next.type != 'word') {
            val = false;
        }
        else {
            if (curr.element == "(" || curr.element == '-' || curr.element == '—') {
                val = false;
            }
            else if (curr.element == '"') {
                if (flags.isClosingEmphasis) {
                    val = true;
                }
                else {
                    val = false;
                }

                flags.isClosingEmphasis = !flags.isClosingEmphasis
            }
            else {
                val = true;
            }
        }
    }

    return val;
}

export default publicApi