import React , {useEffect,useState} from "react";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import LoadingLineChart from '../components/LoadingLineChart'
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


function StretcherBearerStatus(props) {
  const classes = useStyles();

  const [settings, setSettings] = useState({extra:[], algos:[], selectedAlgo:'', useShifts:false, shifts:[], useSectors:false});
  const [newRequestOptions, setNewRequestOptions] = useState([]);
  const [newRequestOptionsText, setNewRequestOptionsText] = useState([]);
  const [missingRequiredOptions, setMissingRequiredOptions] = useState([]);
  const [globalSettings, setGlobalSettings] = useState({departments:[]});
  const [loadingSettings, setLoadingSettings] = useState(false);

  const [loadingRequests, setLoadingRequests] = useState(false);
  const [last30DaysData, setLast30DaysData] = useState([]);
  const [last7DaysData, setLast7DaysData] = useState([]);
  const [last8hoursRequests, setLast8hoursRequests] = useState([]);
  const [last8hoursDataPoints, setLast8hoursDataPoints] = useState([]);
  const [outOfServiceRequests, setOutOfServiceRequests] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [openNewRequest, setOpenNewRequest] = useState(false);
  const [selectedFromRequest, setSelectedFromRequest] = useState();
  const [selectedToRequest, setSelectedToRequest] = useState();

  const [loadingFromBeds, setLoadingFromBeds] = useState(false);
  const [showFromBeds, setShowFromBeds] = useState(false);
  const [fromBedList, setFromBedList] = useState([]);
  const [selectedBedFromRequest, setSelectedBedFromRequest] = useState(null);
  
  const [loadingToBeds, setLoadingToBeds] = useState(false);
  const [showToBeds, setShowToBeds] = useState(false);
  const [toBedList, setToBedList] = useState([]);
  const [selectedBedToRequest, setSelectedBedToRequest] = useState(null);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const [serviceLevel, setServiceLevel] = useState(16);

  const [refreshIntervalID, setRefreshIntervalID] = useState();

  useEffect(() => {
    setLoadingSettings(true);
    let roleSettingsReq = axios.get("/projetkhiron/roles", {
      params: {
          name: "bearer"
        }
    });
    
    let globalSettingsReq = axios.get("/projetkhiron/settings", {
      params: {
          config: "production"
        }
    });

    let floorList = axios.get("/projetkhiron/floors");

  
    axios.all([roleSettingsReq, globalSettingsReq, floorList])
    .then(
      axios.spread((...responses) => {
        const roleSettingRes = responses[0];
        const globalSettingsRes = responses[1];
        const floorListRes = responses[2];

        if (roleSettingRes.status === 200 && roleSettingRes.data.length === 1) {
          setSettings(roleSettingRes.data[0].settings);
          var timeParts = roleSettingRes.data[0].settings.serviceLevel.split(':'); 
          var sLevel = 16;
          if(timeParts.length === 3) {
            sLevel = parseInt(timeParts[0])*60 + parseInt(timeParts[1]);
            //console.log("sLevel:"+ sLevel);
          }
          setServiceLevel(sLevel);

          loadRequestDataEx(sLevel);
        } else {
          console.log(roleSettingRes);
        }

        if (globalSettingsRes.status === 200 && globalSettingsRes.data.length === 1) {
          setGlobalSettings(globalSettingsRes.data[0]);
        } else {
          console.log(globalSettingsRes);
        }

        let sectorOptions = [];

        globalSettingsRes.data[0].departments.forEach( department => {
          sectorOptions.push({label:department.text, _id:department._id, type:'department'});
        });

        floorListRes.data.forEach( floor => {
          sectorOptions.push({label:floor.label, _id:floor._id, type:'floor'});
          if(floor.sections && floor.sections.length > 0 ) {
            floor.sections.forEach( section => {
              sectorOptions.push({label: " " + section.label, _id:section._id, floorID:floor._id, floorLabel:floor.label, type:'section'});
            });
          }
        });
        setLocationList(sectorOptions);
      }
    ))
    .catch(errors => {
      // react on errors.
      console.error(errors);
    })
    .finally(() => {
      setLoadingSettings(false);
    });

    const intervalID = setInterval(silentReload8HourData, 30000);
    return () => {
      clearInterval(intervalID);
    }
  }, []);

  const addZero = (i) => {
    if (i < 10) {
      i = "0" + i;
    }
    return ""+i;
  }
  const binRequests15MinutesOver8Hours = (requests) => {
    const data = [];
    
    if(requests && requests.length > 0) {
      let map = new Map();
      requests.forEach((request) => {
        var requestedOn = new Date(request.requestedOn);
        var bucketKey = addZero(requestedOn.getHours()) + ":" + addZero(Math.floor(requestedOn.getMinutes()/15)*15);
        var dataPoint = map.get(bucketKey);
        if(!dataPoint)
          dataPoint = { name:bucketKey, requested: 0, completed:0, averageTime: 0 };

        dataPoint.requested = dataPoint.requested + 1;
        if(request.completedOn!=='1970-01-01T00:00:00.000Z') {
          dataPoint.completed = dataPoint.completed + 1;  
          var minutes = Math.floor((new Date(request.completedOn).getTime() - requestedOn.getTime())/60000);
          dataPoint.averageTime = dataPoint.averageTime + minutes; //in minutes 
        }

        map.set(bucketKey,dataPoint);
      });

      //for each bucket, now calculate average completion time
      
      var startHour = moment().subtract(8, 'hours').toDate().getHours();
      var i, j;
      for (i = 0; i <= 8; i++) { 
        var hourKey = addZero(i);
        for(j = 0; j <= 45; j+=15) {
          var bucketKey = hourKey+':'+addZero(j);
          var dataPoint = map.get(bucketKey);
          if(dataPoint){
            if(dataPoint.completed > 0)
              dataPoint.averageTime = dataPoint.averageTime/dataPoint.completed; //average the time
            data.push(dataPoint);
          } else {
            data.push({ name:bucketKey, requested: 0, completed:0, averageTime: 0 });
          }
        }
        startHour = startHour + 1;
        if(startHour >= 24) {
          startHour = 0;
        }
      }
    }

    return data;
  }

  const loadRequestData = () => {
    loadRequestDataEx(serviceLevel)
  }

  const silentReload8HourData = () => {
    axios.get("/projetkhiron/bearer/requests", {
      params: {
          from: moment().subtract(8, 'hours').toDate()
        }
    }).then((response) => {
      //console.log(response);
      if(response.status === 200) {
        setLast8hoursRequests(response.data);
        setLast8hoursDataPoints(binRequests15MinutesOver8Hours(response.data));
      }
    }).catch(error => {
      console.log("[StretcherBearerStatus] silentReload8HourData Error :" +error.message);

    }).finally(() => {

    });
  }

  const loadRequestDataEx = (sLevel) => {
    setLoadingRequests(true);

    let last30Days =  axios.get("/projetkhiron/bearer/requests/stats", {
      params: {
          type: '30-days'
        }
    });

    let last7Days =  axios.get("/projetkhiron/bearer/requests/stats", {
      params: {
          type: '7-days'
        }
    });

    let last8hours =  axios.get("/projetkhiron/bearer/requests", {
      params: {
          from: moment().subtract(8, 'hours').toDate()
        }
    });

    let bearerAnalysis =  axios.get("/projetkhiron/bearer/analysis", {
      params: {
        type:'outOfService',
        seviceLevel: sLevel
        }
    });

    axios.all([last30Days, last7Days, last8hours, bearerAnalysis])
      .then(
        axios.spread((...responses) => {
          const last30DaysRes = responses[0];
          const last7DaysRes = responses[1];
          const last8hoursRes = responses[2];
          const bearerAnalysisRes = responses[3];

          setLast30DaysData(last30DaysRes.data);
          setLast7DaysData(last7DaysRes.data);
          
          setLast8hoursRequests(last8hoursRes.data);

          setOutOfServiceRequests(bearerAnalysisRes.data);

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

  const handleSelectedToRequest = (value) => {
    setSelectedToRequest(value);

    if(value && (value.type === "floor" || value.type === "section")) {
      setLoadingToBeds(true);
      setShowToBeds(true);

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
          setToBedList(bedOptions);
        }
        setLoadingToBeds(false);        
      }).catch(error => {
        console.log("error" +error);
        setLoadingToBeds(false)
        //if (error) throw error;
      }).finally(() => {

      });
    } else {
      setShowToBeds(false);
      setToBedList([]);
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
    let toReq = null;

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

    if(selectedBedToRequest) {
      toReq = {...selectedBedToRequest};
      if(selectedToRequest.type === "section") {
        toReq.label = selectedToRequest.floorLabel + " - "+ selectedToRequest.label +" - " + toReq.label;
        toReq = {...toReq, section:selectedToRequest};
      } else {
        toReq.label = selectedToRequest.label + " - " + toReq.label;
        toReq = {...toReq, floor:selectedToRequest};
      }
    } else {
      toReq = selectedToRequest;
    }

    // console.log("[handleSendNewRequest] newRequestOptions");
    // console.log(newRequestOptions);
    
    axios.put("/projetkhiron/bearer/request", {
      from: fromReq,
      to: toReq,
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
      silentReload8HourData();
      setShowFromBeds(false);
      setShowToBeds(false);
      setSelectedFromRequest(null);
      setSelectedBedFromRequest(null);
      setSelectedToRequest(null);
      setSelectedBedToRequest(null);
      setNewRequestOptions([]);
    });
    setOpenNewRequest(false);
  }

  const handleCancelNewRequest = () => {
    setShowFromBeds(false);
    setShowToBeds(false);
    setSelectedFromRequest(null);
    setSelectedBedFromRequest(null);
    setSelectedToRequest(null);
    setSelectedBedToRequest(null);
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

  let toBedsSelection = null;
  if(showToBeds) {
    if(loadingToBeds) { 
      toBedsSelection = <Skeleton animation="wave" variant="rect" width={300} height={60} />
    } else {
      toBedsSelection = <Autocomplete
        id="toBedLocation"
        options={toBedList}
        
        onChange={(event, value, reason) => setSelectedBedToRequest(value)}
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
                  Demande de brancarderie
                </Typography>
              </Grid>
              <Grid xs item>
                <Autocomplete
                  id="fromLocation"
                  options={locationList}
                  
                  onChange={(event, value, reason) => handleSelectedFromRequest(value)}
                  getOptionLabel={(option) => option.label}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="À partir de" variant="outlined" />}
                />
              </Grid>
              <Grid xs item>
                {fromBedsSelection}
              </Grid>
              <Grid xs item>
                <Autocomplete
                  id="toLocation"
                  options={locationList}
                  
                  onChange={(event, value, reason) => handleSelectedToRequest(value)}
                  getOptionLabel={(option) => option.label}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Vers" variant="outlined" />}
                />
              </Grid>
              <Grid xs item>
                {toBedsSelection}
              </Grid>
              <Grid item xs >
                  <Button variant="contained" color="secondary"  onClick={handleCancelNewRequest}>
                      Annuler
                  </Button>
                  <Button variant="contained" color="primary" disabled={!selectedFromRequest || !selectedToRequest} startIcon={<AddCircleOutlineIcon />} onClick={handleSendNewRequest}>
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
                Nouvelle demande
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
            Demande de brancarderie derniers 8 heures
          </Typography>
        </Grid>
        <Grid item>
          <LoadingLineChart loading={loadingRequests} data={last8hoursDataPoints} serviceLevel={serviceLevel} label="Demande de brancarderie derniers 8 heures" />
        </Grid>
        <Grid item>
          <TableContainer className={classes.tableContainer} size="small" component={Paper}>
            <Table className={classes.table} size="small" aria-label={props.title} height="100%">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}></TableCell>
                  <TableCell className={classes.tableHeaderCell} >De</TableCell>
                  <TableCell className={classes.tableHeaderCell} >Vers</TableCell>
                  <TableCell className={classes.tableHeaderCell} >Assignée à</TableCell>
                  <TableCell className={classes.tableHeaderCell} >Demandé le</TableCell>
                  <TableCell className={classes.tableHeaderCell} >Accepté le</TableCell>
                  <TableCell className={classes.tableHeaderCell} >Terminé le</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingRequests?
                  <TableRow><TableCell colSpan={7} ><LinearProgress /></TableCell></TableRow>
                :last8hoursRequests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell style={{width:30}}>
                      {request.assignedOn==='1970-01-01T00:00:00.000Z'?<PlayForWorkOutlinedIcon className={classes.statusIcons}/>:request.completedOn==='1970-01-01T00:00:00.000Z'?<CircularProgress size={20}/>:<CheckCircleOutlinedIcon size={20}/>}
                    </TableCell>
                    <TableCell >{request.from.label}</TableCell>
                    <TableCell >{request.to.label}</TableCell>
                    <TableCell >{request.assigned?request.assigned.label:null}</TableCell>
                    <TableCell >{new Date(request.requestedOn).toLocaleString('fr-CA', {dateStyle:"short", timeStyle:"short", hour12:false})}</TableCell>                   
                    <TableCell >{request.assignedOn!=='1970-01-01T00:00:00.000Z'?new Date(request.assignedOn).toLocaleString('fr-CA', {dateStyle:"short", timeStyle:"short", hour12:false}):null}</TableCell>
                    <TableCell >{request.completedOn!=='1970-01-01T00:00:00.000Z'?new Date(request.completedOn).toLocaleString('fr-CA', {dateStyle:"short", timeStyle:"short", hour12:false}):null}</TableCell>
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
            <LoadingLineChart loading={loadingRequests} data={last7DaysData} serviceLevel={serviceLevel} title="Statistiques de brancarderie derniers 7 jours"/>
            <LoadingLineChart loading={loadingRequests} data={last30DaysData} serviceLevel={serviceLevel} title="Statistiques de brancarderie derniers 30 jours"/>
          </Paper>
        </Grid>
        {outOfServiceRequests.length>0?
        <>
          <Grid item xs={12}>
            <Paper>
            <Grid container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ padding: 20 }}>
          <Grid item>
            <Typography variant="h6" style={{color:'red'}}>
                  {outOfServiceRequests.length} Demande de brancarderie en attente, dépassant le délai de réalisation souhaité établit à {settings.serviceLevel}
            </Typography>
          </Grid>
          <Grid item>
            <TableContainer className={classes.tableContainer} size="small" component={Paper}>
              <Table className={classes.table} size="small" aria-label={props.title} height="100%">
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableHeaderCell} style={{width:30}}></TableCell>
                    <TableCell className={classes.tableHeaderCell} >De</TableCell>
                    <TableCell className={classes.tableHeaderCell} >Vers</TableCell>
                    <TableCell className={classes.tableHeaderCell} >Assignée à</TableCell>
                    <TableCell className={classes.tableHeaderCell} >Demandé le</TableCell>
                    <TableCell className={classes.tableHeaderCell} >Accepté le</TableCell>
                    <TableCell className={classes.tableHeaderCell} >Attente</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingRequests?
                    <TableRow><TableCell colSpan={7} ><LinearProgress /></TableCell></TableRow>
                  :outOfServiceRequests.map((request) => (
                    <TableRow key={request._id}>
                      <TableCell style={{width:30}}>
                        {request.assignedOn==='1970-01-01T00:00:00.000Z'?<PlayForWorkOutlinedIcon className={classes.statusIcons}/>:request.completedOn==='1970-01-01T00:00:00.000Z'?<CircularProgress size={20}/>:<CheckCircleOutlinedIcon size={20}/>}
                      </TableCell>
                      <TableCell >{request.from.label}</TableCell>
                      <TableCell >{request.to.label}</TableCell>
                      <TableCell >{request.assigned?request.assigned.label:null}</TableCell>
                      <TableCell >{new Date(request.requestedOn).toLocaleString('fr-CA', {dateStyle:"short", timeStyle:"short", hour12:false})}</TableCell>                   
                      <TableCell >{request.assignedOn!=='1970-01-01T00:00:00.000Z'?new Date(request.assignedOn).toLocaleString('fr-CA', {dateStyle:"short", timeStyle:"short", hour12:false}):null}</TableCell>
                      <TableCell style={{color:'red'}}>[{formatDaysDiffInHours(new Date(), new Date(request.requestedOn))}]</TableCell>
                  </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          </Grid>
        </Paper>
        </Grid>
        </>
        :null}

      </Grid>
    </div>
  );
}


export default StretcherBearerStatus;
