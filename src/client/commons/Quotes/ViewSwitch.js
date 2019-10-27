import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

function ViewSwitch(props) {

    return <Typography variant="h6">
        <Grid item component="label" container alignItems="center" spacing={1}>
            <Grid item>Lines</Grid>
            <Grid item>
                <Switch
                    onChange={(e,v)=> props.setValue(v)}
                    value={props.value}
                />
            </Grid>
            <Grid item>Table</Grid>
        </Grid>
    </Typography>
}

export default ViewSwitch;