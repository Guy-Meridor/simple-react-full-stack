import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Pie from './Pie'

function StatCard(props) {
    const [data, setData] = useState([]);

    async function fetchData(){
        const data = await props.getData();
        setData(data);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return <Card className={props.className}>
        <CardContent className={props.pieContainer}>
            <Typography variant="h6">
                {props.title}
            </Typography>
            <Pie data={data} scheme={props.scheme} />
        </CardContent>
    </Card >
}

export default StatCard