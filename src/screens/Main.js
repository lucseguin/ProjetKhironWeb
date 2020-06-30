import React from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BearerRequestsSummary from '../components/BearerRequestsSummary'
import CleaningRequestsSummary from '../components/CleaningRequestsSummary'
import { makeStyles } from '@material-ui/core/styles';

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


const cleaningRequests = [
  {id:1, status:'new', location:{bedid:'701-01', bedlabel:'701-01', department:''}, cleaner : {id:1, firstName:'Luc'}, in:'2020 06 22 07:15', started:'', completed:''}, 
  {id:2, status:'new', location:{bedid:'701-02', bedlabel:'701-02', department:''}, cleaner : {id:1, firstName:'Marc-Antoine'}, in:'2020 06 22 07:20', started:'', completed:''}, 
  {id:3, status:'inprogress', location:{bedid:'705-01', bedlabel:'705-01', department:''}, cleaner : {id:1, firstName:'Luc'}, in:'2020 06 22 06:50', started:'2020 06 22 06:55', completed:''}, 
  {id:4, status:'inprogress', location:{bedid:'705-02', bedlabel:'705-02', department:''}, cleaner : {id:1, firstName:'Marc-Antoine'}, in:'2020 06 22 06:55', started:'2020 06 22 07:00', completed:''}, 
  {id:5, status:'done', location:{bedid:'803-01', bedlabel:'803-01', department:''}, cleaner : {id:1, firstName:'Luc'}, in:'2020 06 22 06:30', started:'2020 06 22 06:35', completed:'2020 06 22 06:40'}, 
  {id:6, status:'done', location:{bedid:'707-02', bedlabel:'707-02', department:''}, cleaner : {id:1, firstName:'Marc-Antoine'}, in:'2020 06 22 06:35', started:'2020 06 22 06:40', completed:'2020 06 22 06:50'}, 
  {id:7, status:'done', location:{bedid:'803-01', bedlabel:'803-01', department:''}, cleaner : {id:1, firstName:'Luc'}, in:'2020 06 22 06:30', started:'2020 06 22 06:35', completed:'2020 06 22 06:40'}, 
  {id:8, status:'done', location:{bedid:'707-02', bedlabel:'707-02', department:''}, cleaner : {id:1, firstName:'Marc-Antoine'}, in:'2020 06 22 06:35', started:'2020 06 22 06:40', completed:'2020 06 22 06:50'}, 
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

function Main(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        style={{ padding: 20, width: '100%' }}
        spacing={3}>
        <Grid item xs={4}>
          <Paper>
            Floor
         </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper>
            <BearerRequestsSummary requests={bearerRequests} title="Demande de brancarderie derniers 7 jours"/>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper>
            Floor
         </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper>
            <CleaningRequestsSummary requests={cleaningRequests} title="Demande de nettoyage derniers 7 jours"/>
          </Paper>
        </Grid>

      </Grid>
    </div>
  );
}


export default Main;
