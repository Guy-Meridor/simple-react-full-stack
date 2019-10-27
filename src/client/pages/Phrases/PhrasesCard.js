import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { List } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton'


function PhrasesCard(props) {
    const { chosen, phrases } = props;
    const [filter, setFilter] = useState('');
    const [filteredPhrases, setPhrases] = useState(phrases);

    const onPhraseClick = name => e => {
        if (props.clickPhrase)
            props.clickPhrase(name)
    }

    const onPhraseDelete = phrase => e => {
        if (props.deletePhrase)
            props.deletePhrase(phrase)
    }

    useEffect(() => {
        if (phrases) {
            if (filter) {
                const regex = new RegExp(`^${filter}`, 'i');
                const filteredPhrases = phrases.filter(phr => regex.exec(phr.phrase));
                setPhrases(filteredPhrases);
            }
            else {
                setPhrases(phrases);
            }
        }

    }, [filter, phrases])

    const filterChange = (e, data) => {
        const regex = /[\w', ]*/;
        if (regex.exec(data.value)) {
            setFilter(data.value);
        }
    }

    return <Card className={props.className}>
        <CardContent>
            <Typography variant="h5">
                Select a Phrase
        </Typography>
            <Input
                value={filter}
                onChange={filterChange}
                icon="search"
                placeholder='Filter Phrases...' />

            <List divided relaxed selection>
                {filteredPhrases.map(phrase =>
                    <List.Item
                        key={phrase}
                        active={phrase == chosen}
                        onClick={onPhraseClick(phrase)}>
                        <List.Header>

                            <Box display="flex" justifyContent="space-between">
                                {phrase}
                                <IconButton size='small' onClick={onPhraseDelete(phrase)}>
                                    <Icon color='secondary'>delete</Icon>
                                </IconButton>
                            </Box>
                        </List.Header>
                    </List.Item>
                )}
            </List>

        </CardContent>
    </Card>
}

export default PhrasesCard