import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InstancesCard from './InstancesCard'
import PageTitle from "../../commons/PageTitle";

const useStyles = makeStyles({
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
        <PageTitle>
            Instances
        </PageTitle>

        <div className={classes.cardsContainer}>
            <InstancesCard className={classes.instancesCard}/>
        </div>
    </div>
}


export default Instances;