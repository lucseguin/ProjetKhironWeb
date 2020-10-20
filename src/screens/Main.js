import React from "react";
 
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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
<Grid container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        style={{ padding: 20, width: '100%', height: '100vh' }}
        spacing={3}>
        <Grid item xs={8}>
          {/* <Paper>
            <CleaningRequestsSummary showGraph requests={cleaningRequests} data={data} title="Demande de nettoyage derniers 7 jours"/>
          </Paper> */}
        </Grid>

        <Grid item xs={4}>
          {/* <Paper>
            Demande
         </Paper> */}
        </Grid>

      </Grid>
  );
}


export default Main;
