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
        marginBottom: '6vh',
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
        { key: 'es', value: 'es', flag: 'es', text: 'Spanish' }]

    const [translation, setTranslation] = useState([]);

    async function fetchTranslate() {
        const result = await TranslateService.translate(props.word, 'he')

        setTranslation(result.data);
    }

    useEffect(() => {
        fetchTranslate();
    }, []);


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