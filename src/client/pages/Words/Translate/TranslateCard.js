import { Dropdown } from 'semantic-ui-react'
import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import _ from 'lodash';
import TranslateService from './TranslateService'

const useStyles = makeStyles({
    title: {
        marginBottom: '3vh'
    },
    translation: {
        marginTop: '6vh',
        paddingBottom: '10vh',
        display: 'flex'
    },
    from: {
        width: '50%'
    },
    to: {
        width: '50%'
    }
})


function TranslateCard(props) {
    const classes = useStyles();
    const countryOptions = [
        { key: 'he', value: 'he', flag: 'il', text: 'Hebrew' },
        { key: 'fr', value: 'fr', flag: 'fr', text: 'French' },
        { key: 'it', value: 'it', flag: 'it', text: 'Italian' },
        { key: 'es', value: 'es', flag: 'es', text: 'Spanish' }]

    const [translation, setTranslation] = useState('');
    const [language, setLanguage] = useState(countryOptions[0].value);

    async function fetchTranslate() {
        const result = await TranslateService.translate(props.word, language)

        setTranslation(result.data);
    }

    useEffect(() => {
        fetchTranslate();
    }, [props.word, language]);

    const languageChange = (e, data) => {
        setLanguage(data.value);
     }

    return <Card className={props.className}>
        <CardContent>
            <Typography className={classes.title} variant="h5">
                Translate
        </Typography>

            <Dropdown
                placeholder='Select Language'
                fluid
                search
                selection
                options={countryOptions}
                value={language}
                onChange={languageChange}
            />
            <div className={classes.translation}>

                <Typography className={classes.from} align="left" component="span" variant="h6">
                    {props.word}
                </Typography>
                <Typography className={classes.to} align="right" component="span" variant="h6">
                    {translation}
                </Typography>
            </div>


        </CardContent>
    </Card>
}

export default TranslateCard;