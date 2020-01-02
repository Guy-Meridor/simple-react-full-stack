import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GroupsService from '../Words/WordService'
import InstancesCard from './InstancesCard'

const useStyles = makeStyles({
    title: {
        textAlign: 'center',
        marginBottom: '3vh'
    },
    
    cardsContainer: {
        marginTop: '3vh',
    },
    instancesCard: {
        marginLeft: '15%',
        marginRight: '15%',
        float: 'left',
        width: '70%'
    }
})

function Instances({ match, history }) {
    const classes = useStyles();

    return <div>
        <Typography className={classes.title} variant="h5">
            Instances
        </Typography>

        <div className={classes.cardsContainer}>
            <InstancesCard className={classes.instancesCard}/>
        </div>
    </div>
}


export default Instances;