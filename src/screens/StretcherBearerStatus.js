import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import BearerRequestsSummary from '../components/BearerRequestsSummary'

const data = [
  {
    name: 'Lundi', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Mardi', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Mercredi', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Jeudi', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Vendredi', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Samedi', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Dimanche', uv: 3490, pv: 4300, amt: 2100,
  },
];

const bearerRequests = [
  {id:1, status:'new', from:{bedid:'', bedlabel:'', department:'Cardiologie'}, to:{bedid:'701-01', bedlabel:'701-01', department:''}, bearer : {id:1, firstName:'Luc'}, in:'2020 06 22 07:15', started:'', completed:''}, 
  {id:2, status:'new', from:{bedid:'', bedlabel:'', department:'Urgence'}, to:{bedid:'701-02', bedlabel:'701-02', department:''}, bearer : {id:1, firstName:'Marc-Antoine'}, in:'2020 06 22 07:20', started:'', completed:''}, 
  {id:3, status:'inprogress', from:{bedid:'', bedlabel:'', department:'Urgence'}, to:{bedid:'705-01', bedlabel:'705-01', department:''}, bearer : {id:1, firstName:'Luc'}, in:'2020 06 22 06:50', started:'2020 06 22 06:55', completed:''}, 
  {id:4, status:'inprogress', from:{bedid:'', bedlabel:'', department:'Urgence'}, to:{bedid:'705-02', bedlabel:'705-02', department:''}, bearer : {id:1, firstName:'Marc-Antoine'}, in:'2020 06 22 06:55', started:'2020 06 22 07:00', completed:''}, 
  {id:5, status:'done', from:{bedid:'', bedlabel:'', department:'Chirurgie'}, to:{bedid:'803-01', bedlabel:'803-01', department:''}, bearer : {id:1, firstName:'Luc'}, in:'2020 06 22 06:30', started:'2020 06 22 06:35', completed:'2020 06 22 06:40'}, 
  {id:6, status:'done', from:{bedid:'', bedlabel:'', department:'Urgence'}, to:{bedid:'707-02', bedlabel:'707-02', department:''}, bearer : {id:1, firstName:'Marc-Antoine'}, in:'2020 06 22 06:35', started:'2020 06 22 06:40', completed:'2020 06 22 06:50'}, 
  {id:7, status:'done', from:{bedid:'', bedlabel:'', department:'Chirurgie'}, to:{bedid:'803-01', bedlabel:'803-01', department:''}, bearer : {id:1, firstName:'Luc'}, in:'2020 06 22 06:30', started:'2020 06 22 06:35', completed:'2020 06 22 06:40'}, 
  {id:8, status:'done', from:{bedid:'', bedlabel:'', department:'Urgence'}, to:{bedid:'707-02', bedlabel:'707-02', department:''}, bearer : {id:1, firstName:'Marc-Antoine'}, in:'2020 06 22 06:35', started:'2020 06 22 06:40', completed:'2020 06 22 06:50'}, 

];


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    width:'100%'
  },
}));

function StretcherBearerStatus(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        style={{ padding: 20, width: '100%' }}
        spacing={3}>
        <Grid item xs={8}>
          <Paper>
            <BearerRequestsSummary showGraph requests={bearerRequests} data={data}/>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper>
            DEmande
         </Paper>
        </Grid>

      </Grid>
    </div>
  );
}


export default StretcherBearerStatus;
