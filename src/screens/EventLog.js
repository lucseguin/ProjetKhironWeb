import React , {useEffect,useState, useRef} from "react";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@material-ui/core/LinearProgress';
import { frCA } from "date-fns/locale";
import StatusProgress from '../components/StatusProgress'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100vh',
    width:'100%'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: theme.palette.text.primary,
  },
  paper2: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: theme.palette.text.primary,
    width:'300px',
  },

  tableContainer: {
    maxHeight: 280,
  },
  table: {
    minWidth: 800,
  },
  tableHeaderCell: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: "black"
  },
  statusIcons: {
    width:24,
    height:24
  }  
}));


function EventLog(props) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const statusProgressRef = useRef();
  const [statusTitle, setStatusTitle] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const [locationList, setLocationList] = useState([]);
  const [selectedFromRequest, setSelectedFromRequest] = useState();
  const [loadingFromBeds, setLoadingFromBeds] = useState(false);
  const [showFromBeds, setShowFromBeds] = useState(false);
  const [fromBedList, setFromBedList] = useState([]);
  const [selectedBedFromRequest, setSelectedBedFromRequest] = useState(null);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [events, setEvents] = useState([]);

  useEffect(() => {
    setLoading(true);

    let floorList = axios.get("/projetkhiron/floors");
    
    axios.all([floorList])
    .then(
      axios.spread((...responses) => {
        const floorListRes = responses[0];
        if (floorListRes.status === 200) {
          let sectorOptions = [];
          floorListRes.data.forEach( floor => {
            sectorOptions.push({label:floor.label, _id:floor._id, type:'floor'});
            if(floor.sections && floor.sections.length > 0 ) {
              floor.sections.forEach( section => {
                sectorOptions.push({label: " " + section.label, _id:section._id, floorID:floor._id, floorLabel:floor.label, type:'section'});
              });
            }
          });
          setLocationList(sectorOptions);
        } else {
          console.log("[VisitorRegistration] Failed retreiving list of floors");
          console.log(floorListRes);
        }
      }
    ))
    .catch(errors => {
      // react on errors.
      console.error(errors);
    })
    .finally(() => {
      setLoading(false);
    });
}, [])


  const handleSelectedFromRequest = (value) => {
    setSelectedFromRequest(value);
    if(value && ((value.type === "floor" ) || value.type === "section")) {
      setLoadingFromBeds(true);
      setShowFromBeds(true);
      var getFromFloorID = value._id;
      if(value.type === "section")
        getFromFloorID = value.floorID;
      
      axios.get("/projetkhiron/floor/" + getFromFloorID)
      .then((response) => {
        //console.log(response);
        if(response.status === 200) {

          let beds = [];
          if(value.type === "floor")
            beds = response.data.beds;
          else {
            let section = response.data.sections.find(o => o._id === value._id);
            if(section) 
              beds = section.beds;
          }

          let bedOptions = [];
          beds.forEach( bed => {
            bedOptions.push({label:bed.label, _id:bed._id, type:'bed'});
          });
          setFromBedList(bedOptions);
        }
        setLoadingFromBeds(false);        
      }).catch(error => {
        console.log("error" +error);
        setLoadingFromBeds(false)
        //if (error) throw error;
      }).finally(() => {

      });
    } else {
      setShowFromBeds(false);
      setFromBedList([]);
    }
  }
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  const handleSearchRequest = (event) => {

    setStatusTitle("Recherche en court");
    setStatusMessage("Recherche en lien avec lit " + selectedBedFromRequest.label);
    statusProgressRef.current.showStatus();

    var tweakedFromDate = new Date(fromDate);
    tweakedFromDate.setHours(0);
    tweakedFromDate.setMinutes(0);
    tweakedFromDate.setSeconds(0);

    var tweakedToDate = new Date(toDate);
    tweakedToDate.setHours(23);
    tweakedToDate.setMinutes(59);
    tweakedToDate.setSeconds(59);

    axios.get("/projetkhiron/requests/search", {
      params: {
        searchType: "bed",
        bedID:selectedBedFromRequest._id, 
        fromDate:tweakedFromDate, 
        toDate:tweakedToDate
        }
    })
    .then((response) => {
      console.log(response);
      if(response.status === 200) {
        setEvents(response.data);
      }
    }).catch(error => {
      console.log("error " +error.message);

      //if (error) throw error;
    }).finally(() => {
      statusProgressRef.current.hideStatus();
    });
  } 

  let fromBedsSelection = null;
  if(showFromBeds) {
    if(loadingFromBeds) { 
      fromBedsSelection = <Skeleton animation="wave" variant="rect" width={300} height={60} />
    } else {
      fromBedsSelection = <Autocomplete
        id="fromBedLocation"
        options={fromBedList}
        
        onChange={(event, value, reason) => setSelectedBedFromRequest(value)}
        getOptionLabel={(option) => option.label}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Lit" variant="outlined" />}
      />
    }
  }

  return (
    <div className={classes.root} >
    <Paper elevation={0} style={{ height: "100%", width:'100%' }} >

    <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleCloseAlert}>
      <Alert onClose={handleCloseAlert} severity={alertType}>
        {alertMessage}
      </Alert>
    </Snackbar>

    <StatusProgress ref={statusProgressRef} title={statusTitle} message={statusMessage} />

    <TableContainer>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} width='100%' >
              <TableContainer>
                <Table style={{ border: 'none' }} size="small">
                  <TableBody style={{ border: 'none' }}>
                    <TableRow style={{ borderBottom: 'none' }}>
                      <TableCell className={classes.pageHeader} style={{ borderBottom: 'none' }}>
                        <Typography variant="h6" gutterBottom>
                          Recherche d'événement
                        </Typography>  
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{width:'300px'}} >
              {loading?
              <Paper className={classes.paper2}><LinearProgress /></Paper>
              :
              <Paper className={classes.paper2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frCA}>
                  <Grid container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
                  style={{ padding: 1, width: '300px' }}
                  spacing={1} >
                    <Grid xs item>
                      <Autocomplete
                        id="forLocation"
                        options={locationList}
                        onChange={(event, value, reason) => handleSelectedFromRequest(value)}
                        getOptionLabel={(option) => option.label}
                        style={{ width: '300px' }}
                        renderInput={(params) => <TextField {...params} label="Pour" variant="outlined" />}
                      />
                    </Grid>
                    <Grid xs item>
                      {fromBedsSelection}
                    </Grid>
                    <Grid xs item>
                    
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        margin="normal"
                        format="yyyy-MM-dd"
                        id="from-date-picker-inline"
                        label="A partir du"
                        value={fromDate}
                        onChange={(date) => setFromDate(date)}
                        KeyboardButtonProps={{
                          'aria-label': 'A partir du',
                        }}
                      />
                    </Grid>
                    <Grid xs item>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="yyyy-MM-dd"
                        margin="normal"
                        id="to-date-picker-inline"
                        label="Jusqu'au"
                        value={toDate}
                        onChange={(date) => setToDate(date)}
                        KeyboardButtonProps={{
                          'aria-label': "Jusqu'au"
                        }}
                      />
                    </Grid>
                    <Grid item xs >
                        <Button variant="contained" color="primary" disabled={!selectedBedFromRequest} onClick={handleSearchRequest}>
                            Rechercher
                        </Button>
                    </Grid> 
                  </Grid> 
                  </MuiPickersUtilsProvider>
              </Paper>
              }
            </TableCell>
            <TableCell style={{verticalAlign: 'top', width:'100%'}}>
              <TableContainer size="small" component={Paper} style={{width:'100%'}}>
                <Table size="small" aria-label={props.title} style={{width:'100%'}}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHeaderCell} style={{width:'150px'}}>Date</TableCell>
                      <TableCell className={classes.tableHeaderCell} style={{width:'100px'}}>Événement</TableCell>
                      <TableCell className={classes.tableHeaderCell}>Détails</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {events.map(event => (
                    <TableRow key={event._id}>
                      <TableCell style={{width:'150px'}}>{new Date(event.date).toLocaleString('fr-CA', {dateStyle:"short", timeStyle:"short", hour12:false})}</TableCell>
                      <TableCell style={{width:'100px'}}>{event.type==="visitor"?"Visiteur":event.type==="bearer"?"Brancarderie":event.type==="cleaner"?"Nettoyage":"Inconnu"}</TableCell>
                    <TableCell >{
                      <Grid container
                      direction="column"
                      justify="flex-start"
                      alignItems="flex-start"
                      style={{width:'100%'}}>
                        {event.options.map(option => (
                          <Grid container direction="row" key={option._id}
                          style={{width:'100%'}}>
                          {option.label} : {option.value}
                          </Grid>
                        ))}
                      </Grid>
                    }</TableCell>
                    </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Paper></div>);
}

export default EventLog;
