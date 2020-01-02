import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles({
    root: {
        
        overflowX: 'auto',
    },
    table: {
        '& th, td':{
            // padding:'1vw 2vh 1vw 1vh'
        }
    },
});

function InstancesTable(props) {
    const classes = useStyles();

    return <Grid item xs={12}>
        <Table stickyHeader  className={classes.table} ref={props.tableRef}>
            <TableHead>
                <TableRow>
                    <TableCell>Word</TableCell>
                    <TableCell >Song Name</TableCell>
                    <TableCell >Artist</TableCell>
                    <TableCell >Paragraph</TableCell>
                    <TableCell >Line In Paragraph</TableCell>
                    <TableCell >Total Line</TableCell>
                    <TableCell >Inline Index</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.instances.map((instance, index1) =>
                    // wordInstances.instances.map((instance, index2) =>
                        <TableRow key={index1}>
                            <TableCell >
                                {instance.word}
                            </TableCell>
                            <TableCell>{instance.song_name}</TableCell>
                            <TableCell>{instance.song_artist}</TableCell>
                            <TableCell>{instance.paragraph}</TableCell>
                            <TableCell>{instance.line_index}</TableCell>
                            <TableCell>{instance.total_line_index}</TableCell>
                            <TableCell>{instance.inline_index}</TableCell>
                        </TableRow>
                    )}
            </TableBody>
        </Table>
    </Grid>
}

export default InstancesTable;