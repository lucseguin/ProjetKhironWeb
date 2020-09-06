import React, {useState} from "react";
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, Label } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
  label: {
    fill: theme.palette.text.primary,
  },
  }));

  
export default function VisitorCountChart(props) {
    const classes = useStyles();
    
    let graph = null;
    if(props.loading)
      graph = <Skeleton variant="rect" width={600} height={250} />
    else if(props.data && props.data.length > 0) {
      graph = <ComposedChart
              width={600}
              height={250}
              data={props.data}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="requestedOn" />
              <YAxis yAxisId="left" />

              <Tooltip labelStyle={{color:'black'}}/>
              <Legend />
              
              <Bar yAxisId="left" type="monotone" name="Nombre de visiteurs" dataKey="count" barSize={20} stroke="#3366ff" fill="#3366ff"/>
          </ComposedChart>
    } else {
      graph = <Typography>Aucune donnée</Typography>
    }

    return (
    <Grid container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ padding: 20 }}>
        <Grid item>
          <Typography variant="h6">
            {props.title}
          </Typography>
        </Grid>
        <Grid item style={{height:250, alignItems:'center', justifyContent:'center'}}>        
          {graph}
        </Grid>
    </Grid>
    );
  }
  