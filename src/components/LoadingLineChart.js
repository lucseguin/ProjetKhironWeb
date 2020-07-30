import React, {useState} from "react";
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles((theme) => ({
  
  }));

  
export default function LoadingLineChart(props) {
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
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />

              <Tooltip labelStyle={{color:'black'}}/>
              <Legend />
              
              <Bar yAxisId="left" type="monotone" name="Demande fait" dataKey="requested" barSize={20} stroke="#3366ff" fill="#3366ff"/>
              <Line yAxisId="left" type="monotone" name="Demande complété" dataKey="completed" stroke="#009933"  />
              <Area  yAxisId="right" type="monotone" name="Temps moyen pour complété" dataKey="averageTime" stroke="#ffcc66" fill="#ffcc66"/>
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
  