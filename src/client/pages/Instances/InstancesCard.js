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

const useStyles = makeStyles({
    title: {
        textAlign: 'center',
        marginBottom: '3vh'
    }
})

function InstancesCard(props) {

    const [Instances, setInstances] = useState([]);
    const tableRef = useRef(null);

    async function fetchInstances() {
        const result = await WordService.getAllInstances();

        setInstances(result.data)
    }

    function saveTable(){
        ExcelExporter(tableRef.current, 'word-instances')
    }

    useEffect(() => {
        fetchInstances();
    }, []);

    return <Card className={props.className}>
        <CardContent>
            <Box justifyContent="center" display="flex">
                <IconButton onClick={saveTable}>
                    <Icon color='primary'>save</Icon>
                </IconButton>
            </Box>
            <InstancesTable instances={Instances} tableRef={tableRef}/>
        </CardContent>
    </Card>


}

export default InstancesCard;