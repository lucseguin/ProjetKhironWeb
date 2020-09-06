import React , {useEffect,useState} from "react";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import VisitorCountChart from '../components/VisitorCountChart'
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PropertySelector from "../components/properties/PropertySelector"
import * as Properties from '../components/properties/Properties'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import PlayForWorkOutlinedIcon from '@material-ui/icons/PlayForWorkOutlined';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as AR from '../components/AccessRights'

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


function VisitorRegistration(props) {
  const classes = useStyles();

  const [settings, setSettings] = useState({extra:[]});
  const [newRequestOptions, setNewRequestOptions] = useState([]);
  const [newRequestOptionsText, setNewRequestOptionsText] = useState([]);
  const [missingRequiredOptions, setMissingRequiredOptions] = useState([]);
  const [loadingSettings, setLoadingSettings] = useState(false);

  const [loadingRequests, setLoadingRequests] = useState(false);
  const [last30DaysData, setLast30DaysData] = useState([]);
  const [last7DaysData, setLast7DaysData] = useState([]);
  const [last8hoursRequests, setLast8hoursRequests] = useState([]);
  const [last8hoursDataPoints, setLast8hoursDataPoints] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [openNewRequest, setOpenNewRequest] = useState(false);
  const [selectedFromRequest, setSelectedFromRequest] = useState();

  const [loadingFromBeds, setLoadingFromBeds] = useState(false);
  const [showFromBeds, setShowFromBeds] = useState(false);
  const [fromBedList, setFromBedList] = useState([]);
  const [selectedBedFromRequest, setSelectedBedFromRequest] = useState(null);


  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    setLoadingSettings(true);

    loadRequestData();

    let floorList = axios.get("/projetkhiron/floors");
    let visitorSettings = axios.get("/projetkhiron/visitor/settings");
    
    // , {
    // })
    //   .then((response) => {
    //     console.log(response);
    //     if (response.status === 200) {
    //       setSettings(response.data.settings);
    //     }
    //   }).catch(error => {
    //     console.log("error" + error);
    //     if (error) throw error;
    //   }).finally(() => {
    //     setLoadingSettings(false);
    //   });

    axios.all([floorList, visitorSettings])
    .then(
      axios.spread((...responses) => {
        const floorListRes = responses[0];
        const settingsRes = responses[1];

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

        if (settingsRes.status === 200) {
          setSettings(settingsRes.data.settings);
        } else {
          console.log("[VisitorRegistration] Failed retreiving settings");
          console.log(settingsRes);
        }

      }
    ))
    .catch(errors => {
      // react on errors.
      console.error(errors);
    })
    .finally(() => {
      setLoadingSettings(false);
    });
}, [])

const addZero = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return ""+i;
}

const binRequests15MinutesOver8Hours = (requests) => {
  const data = [];
  let map = new Map();

  if(requests && requests.length > 0) {
    //count number of requests per 15min slice
    requests.forEach((request) => {
      var requestedOn = new Date(request.requestedOn);
      var bucketKey = addZero(requestedOn.getHours()) + ":" + addZero(Math.floor(requestedOn.getMinutes()/15)*15);
      var dataPoint = map.get(bucketKey);
      if(!dataPoint)
        dataPoint = { requestedOn:bucketKey, count: 0 };

      dataPoint.count = dataPoint.count + 1;
    
      map.set(bucketKey,dataPoint);
    });

  }

  return Array.from(map.values()).sort(function(a, b) {
    if (a.requestedOn < b.requestedOn) {
      return -1;
    }
    if (a.requestedOn > b.requestedOn) {
      return 1;
    }
    return 0;
  });
}

  const loadRequestData = () => {
    setLoadingRequests(true);

    let last30Days =  axios.get("/projetkhiron/visitor/requests/stats", {
      params: {
          type: '30-days'
        }
    });

    let last7Days =  axios.get("/projetkhiron/visitor/requests/stats", {
      params: {
          type: '7-days'
        }
    });

    let last8hours =  axios.get("/projetkhiron/visitor/requests", {
      params: {
          from: moment().subtract(8, 'hours').toDate()
        }
    });


    axios.all([last30Days, last7Days, last8hours])
      .then(
        axios.spread((...responses) => {
          const last30DaysRes = responses[0];
          const last7DaysRes = responses[1];
          const last8hoursRes = responses[2];

          setLast30DaysData(last30DaysRes.data);
          setLast7DaysData(last7DaysRes.data);
          
          setLast8hoursRequests(last8hoursRes.data);
          setLast8hoursDataPoints(binRequests15MinutesOver8Hours(last8hoursRes.data));

          setLoadingRequests(false);
        })
      )
      .catch(errors => {
        // react on errors.
        console.error(errors);
        setLoadingRequests(false);
      })
      .finally(() => {
        
      });
  }


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



  const handleSendNewRequest = (event) => {
    //confirm that all required filed have been populated in newRequestOptions
    var scanMissingRequiredOptions = [];
    settings.extra.forEach(property => {
      if(property.required) {
        if(newRequestOptions.findIndex(o => o._id === property._id) === -1) { //required property value not provided
          scanMissingRequiredOptions.push(property._id);
        }
      }
    });

    setMissingRequiredOptions([...scanMissingRequiredOptions]);
    if(scanMissingRequiredOptions.length > 0) {
      setAlertMessage("Valeur obligatoire manquante");
      setAlertType("error");
      setOpenAlert(true);
      return;
    }
    
    let fromReq = null;

    if(selectedBedFromRequest) {
      fromReq = {...selectedBedFromRequest};
      if(selectedFromRequest.type === "section"){
        fromReq.label = selectedFromRequest.floorLabel + " - "+ selectedFromRequest.label +" - " + fromReq.label;
        fromReq = {...fromReq, section:selectedFromRequest};
      } else {
        fromReq.label = selectedFromRequest.label + " - " + fromReq.label;
        fromReq = {...fromReq, floor:selectedFromRequest};
      }
    } else {
      fromReq = selectedFromRequest;
    }


    // console.log("[handleSendNewRequest] newRequestOptions");
    // console.log(newRequestOptions);
    
    axios.put("/projetkhiron/visitor/requests", {
      requestFor: fromReq,
      requestedOn: new Date(),
      options: newRequestOptionsText,
    })
    .then((response) => {
      //console.log(response);
      if (response.status === 200) {
        setAlertMessage("Envoyer");
        setAlertType("success");
        setOpenAlert(true);
      }
    }).catch(error => {
      setAlertMessage(JSON.stringify(error));
      setAlertType("error");
      setOpenAlert(true);
      console.log("ERROR");
      console.log(error);

    }).finally(() => {
      loadRequestData();
      setShowFromBeds(false);
      setSelectedFromRequest(null);
      setSelectedBedFromRequest(null);
      setNewRequestOptions([]);
    });
    setOpenNewRequest(false);
  }

  const handleCancelNewRequest = () => {
    setShowFromBeds(false);
    setSelectedFromRequest(null);
    setSelectedBedFromRequest(null);
    setNewRequestOptions([]);
    setOpenNewRequest(false);
  }
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const getNewRequestValueFor = (option) => {
    let newReqOption = newRequestOptions.find(item => item._id === option._id);
    if(newReqOption)
      return newReqOption.value;
    else {
      if(option.type === Properties.NUM_PROPERTY)
        return 0;
      else if(option.type === Properties.LIST_PROPERTY && option.multi === true) 
        return [];
      else
        return '';
    }
  }

  const inserUpdateSimplePropertyOption = (property, value, label) => {
    let newRequestOptionsCopy = [...newRequestOptions];
    const selectedPropertyValuendex = newRequestOptionsCopy.findIndex(o => o._id === property._id);

    if(selectedPropertyValuendex === -1) { //new
      setNewRequestOptions([...newRequestOptionsCopy, {_id:property._id, label:property.text, value:value}]);
    } else { //update
      let copyOption = {...newRequestOptionsCopy[selectedPropertyValuendex]};
      copyOption.value = value;
      setNewRequestOptions([
        ...newRequestOptionsCopy.slice(0, selectedPropertyValuendex),
        copyOption,
        ...newRequestOptionsCopy.slice(selectedPropertyValuendex + 1)
      ]);
    }

    let newRequestOptionsCopyText = [...newRequestOptionsText];
    const selectedPropertyTextValuendex = newRequestOptionsCopyText.findIndex(o => o._id === property._id);
    if(selectedPropertyTextValuendex === -1) { //new
      setNewRequestOptionsText([...newRequestOptionsCopyText, {_id:property._id, label:property.text, value:label, valueId:value}]);
    } else { //update
      let copyOption = {...newRequestOptionsCopyText[selectedPropertyTextValuendex]};
      copyOption.value = label;
      copyOption.valueId = value;
      setNewRequestOptionsText([
        ...newRequestOptionsCopyText.slice(0, selectedPropertyTextValuendex),
        copyOption,
        ...newRequestOptionsCopyText.slice(selectedPropertyTextValuendex + 1)
      ]);
    }
  }

  const handleNewRequestPropertyChange = (property, e) => {    
    if(property.type === Properties.TEXT_PROPERTY) { //text
      inserUpdateSimplePropertyOption(property, e.target.value, e.target.value);
    } else if(property.type === Properties.NUM_PROPERTY) { //numerique
      inserUpdateSimplePropertyOption(property, e.target.value, e.target.value);
    } else if(property.type === Properties.LIST_PROPERTY) { //liste
      if(property.multi === false) {
        const propertyOption = property.items.find(o => o._id === e.target.value);
        inserUpdateSimplePropertyOption(property, e.target.value, propertyOption.text);
      } else {
        var textValues = [];
        e.target.value.forEach((id) => {
          const propertyOption = property.items.find(o => o._id === id);
          textValues.push(propertyOption.text);
        });
        inserUpdateSimplePropertyOption(property, e.target.value, textValues.join(","));
      }
    }  else if(props.type===Properties.DB_LINK_PROPERTY) { //DB link (HL7)  

    }
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

  const formatDaysDiffInHours = (date1, date2) => {
    
    var MS_PER_SECOND = 1000
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;

    var diffInMs = date1.getTime() - date2.getTime();
    var hours = Math.floor(diffInMs/MS_PER_HOUR);
    diffInMs = diffInMs - hours*MS_PER_HOUR;

    var minutes = Math.floor(diffInMs/MS_PER_MINUTE);
    diffInMs = diffInMs - minutes*MS_PER_MINUTE;

    var seconds =  Math.floor(diffInMs/MS_PER_SECOND);

    return "" + addZero(hours) + ":" + addZero(minutes)+ ":" + addZero(seconds);
  } 
  return (
    <div className={classes.root} >
      <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openNewRequest}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openNewRequest}>
          <div className={classes.paper}>
          <Grid container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            style={{ padding: 10, }}
            spacing={1}>

            <Grid item>
            <Grid container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              style={{ padding: 10, width: '100%' }}
              spacing={1} >
              <Grid xs item>
                <Typography variant="h6">
                  Enregistrement de visiteur
                </Typography>
              </Grid>
              <Grid xs item>
                <Autocomplete
                  id="forLocation"
                  options={locationList}
                  
                  onChange={(event, value, reason) => handleSelectedFromRequest(value)}
                  getOptionLabel={(option) => option.label}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Pour" variant="outlined" />}
                />
              </Grid>
              <Grid xs item>
                {fromBedsSelection}
              </Grid>
              <Grid item xs >
                  <Button variant="contained" color="secondary"  onClick={handleCancelNewRequest}>
                      Annuler
                  </Button>
                  <Button variant="contained" color="primary" disabled={!selectedBedFromRequest} startIcon={<AddCircleOutlineIcon />} onClick={handleSendNewRequest}>
                      Demander
                  </Button>
              </Grid> 
            </Grid> 
            </Grid> 

            {settings.extra && settings.extra.length > 0?
            <Grid item>
            <Grid container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
              style={{ padding: 10, width: '100%' }}
              spacing={1}>
              <Grid xs item>
                <Typography variant="subtitle1">
                  Options
                </Typography>
              </Grid>

              {settings.extra.map((property) => (
                <Grid item key={property._id}>
                  <PropertySelector 
                    key={property._id+ "-prop"}
                    label={property.text} 
                    value={getNewRequestValueFor(property)} 
                    onChange={(e) => handleNewRequestPropertyChange(property, e)} 
                    extra={property}
                    error={(missingRequiredOptions.findIndex(o => o === property._id) !== -1)?true:false}
                    style={{width:200}}/>
                </Grid>
              ))}
            </Grid>
            </Grid>
            :null}
          </Grid>
          </div>
        </Fade>
      </Modal>

      <Grid container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        alignContent="flex-start"
        style={{ padding: 20, width: '100%' }} 
        spacing={3}>

        <Grid item xs={7} align="right">
          {(props.userSettings&&AR.MODULE_BEARER_NEW_REQUEST)?
            <Button variant="contained" color="primary" disabled={loadingSettings} startIcon={<AddCircleOutlineIcon />} onClick={() => setOpenNewRequest(true)}>
                Nouvelle enregistrement
            </Button>
            :null}
        </Grid>

        <Grid item xs={5}>
          <div></div>
        </Grid>

        <Grid item xs={7}>
          <Paper>
          <Grid container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ padding: 20 }}>
        <Grid item>
          <Typography variant="h6">
            Visiteurs enregistrés derniers 8 heures
          </Typography>
        </Grid>
        <Grid item>
          <VisitorCountChart loading={loadingRequests} data={last8hoursDataPoints}  label="Visiteurs enregistrés derniers 8 heures" />
        </Grid>
        <Grid item>
          <TableContainer className={classes.tableContainer} size="small" component={Paper}>
            <Table className={classes.table} size="small" aria-label={props.title} height="100%">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCell} >Pour</TableCell>
                  <TableCell className={classes.tableHeaderCell} >Le</TableCell>
                  <TableCell className={classes.tableHeaderCell} >Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingRequests?
                  <TableRow><TableCell colSpan={7} ><LinearProgress /></TableCell></TableRow>
                :last8hoursRequests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell >{request.requestFor.label}</TableCell>
                    <TableCell >{new Date(request.requestedOn).toLocaleString('fr-CA', {dateStyle:"short", timeStyle:"short", hour12:false})}</TableCell>                   
                    <TableCell >
                    <Grid container
                      direction="column"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      {request.options.map(r => (
                        <Grid item key={r._id}>
                          <Typography>
                          {r.label} : {r.value} 
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={5}>
          <Paper>
            <VisitorCountChart loading={loadingRequests} data={last7DaysData} title="Nombres de visiteurs derniers 7 jours"/>
            <VisitorCountChart loading={loadingRequests} data={last30DaysData} title="Nombres de visiteurs derniers 30 jours"/>
          </Paper>
        </Grid>
       
      </Grid>
    </div>
  );
}


export default VisitorRegistration;
