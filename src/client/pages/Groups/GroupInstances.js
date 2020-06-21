import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import WordService from '../Words/WordService'
import InstancesTable from '../../commons/Quotes/InstancesTable'
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton'
import ExcelExporter from '../../commons/ExcelExporter'
import Box from '@material-ui/core/Box';

function GroupInstances(props) {
    const { group } = props;
    const [Instances, setInstances] = useState([]);
    const tableRef = useRef(null);

    async function fetchInstances() {
        let tempArray = [];
        group.words.forEach(async word => {
            const result = await WordService.getWordsInstances(word);
            const instances = result.data.map(ins => ({...ins, word}));

            tempArray = tempArray.concat(instances);
            setInstances(tempArray);
        });
    }

    useEffect(() => {
        setInstances([])
        fetchInstances();
    }, [props.group]);

    function saveTable(){
        ExcelExporter(tableRef.current, `${group.name}-indexes`)
    }

    return <Card className={props.className}>
        <CardContent>
            <Box justifyContent="space-between" display="flex">
                <Typography variant="h5">
                    {group.name}
                </Typography>
                <IconButton onClick={saveTable}>
                    <Icon color='primary'>save</Icon>
                </IconButton>
            </Box>
            <InstancesTable instances={Instances} tableRef={tableRef}/>

        </CardContent>
    </Card>


}

export default GroupInstances;