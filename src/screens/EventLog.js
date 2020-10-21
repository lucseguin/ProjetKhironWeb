import React, { useEffect, useState, useRef } from "react";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import PropertySelector from "../components/properties/PropertySelector"
import * as Properties from '../components/properties/Properties'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import EventCoordinator from '../components/EventCoordinator'
import * as AR from '../components/AccessRights'

import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  pdfLink:{
    color:theme.palette.label
  },
}));

const useStyles = makeStyles((theme) => ({
  pdfLink:{
    color:theme.palette.label
  },
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    width: '100%'
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
    width: '300px',
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
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  statusIcons: {
    width: 24,
    height: 24
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  }
}));

const pdfStyles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
  },
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    padding: 5,
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  detailRow: {
    flexDirection: 'row',
    flexGrow: 9,
  },
  linkColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  name: {
    fontSize: 16,
    justifySelf: 'center',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    justifySelf: 'flex-end',
  },
  textColumn: {
    fontSize: 10,
    justifySelf: 'flex-end',
    width:100
  },
  link: {
    fontSize: 10,
    color: 'black',
    textDecoration: 'none',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  footer: {
    position: 'absolute',
    fontSize: 10,
    bottom: 15,
    left: 35,
    right: 0,
    textAlign: 'center',
  },
});


const JournalPDFDocument = (props) => {
  const classes = useStyles();

  const [userName, setUserName] = useState('');
  useEffect(() => {

    var user = EventCoordinator.retreive("user");
    if(user) {
      setUserName(user.firstName + " " + user.lastName);
    }
  }, [])

  return (<Document>
    <Page size="A4" style={pdfStyles.page} wrap title="Journal d'événement" author={userName} creator="ProjetKhiron" producer="ProjetKhiron">
      <View style={pdfStyles.container} fixed>
        <View style={pdfStyles.detailColumn}>
          <Text style={pdfStyles.name}>Journal d'événement</Text>
          <Text style={pdfStyles.subtitle}>Générer par : {userName}</Text>
          <Text style={pdfStyles.subtitle}>En date du : {new Date().toLocaleString('fr-CA', {dateStyle:"long", timeStyle:"short", hour12:false})}</Text>
        </View>
      </View>

      {props.events.map((event) => (
      <View key={event._id} style={pdfStyles.container} wrap={false}>
        <View key={event._id+"-pdf-row"} style={pdfStyles.detailRow}>
          <Text style={pdfStyles.textColumn}>{new Date(event.date).toLocaleString('fr-CA', { dateStyle: "short", timeStyle: "short", hour12: false })}</Text>
          <Text style={pdfStyles.textColumn}>{event.type === "visitor" ? "Visiteur" : event.type === "bearer" ? "Brancarderie" : event.type === "cleaner" ? "Nettoyage" : "Inconnu"}</Text>
          <View key={event._id+"-pdf-row-detail"}  style={pdfStyles.detailColumn}>
          {event.options.map(option => (
                <Text key={event._id +"-"+ option._id+"-pdf"} style={pdfStyles.subtitle}>{option.label} : {props.translateOptionFnc(option)}</Text>
            ))}
          </View>
        </View>
      </View>
        ))}

      <Text
        style={pdfStyles.footer}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>)
};

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function EventLog(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [loadingData, setLoadingData] = useState(false);

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
  
  const [visitorSettings, setVisitorSettings] = useState(null);
  const [bearerSettings, setBearerSettings] = useState(null);
  const [cleanerSettings, setCleanerSettings] = useState(null);
  const [searchVisitor, setSearchVisitor] = useState(true);
  const [searchBearer, setSearchBearer] = useState(true);
  const [searchCleaner, setSearchCleaner] = useState(true);
  const [multiSiteSearch, setMultiSiteSearch] = useState(true);

  const [bearerRequestOptions, setBearerRequestOptions] = useState([]);
  const [cleanerRequestOptions, setCleanerRequestOptions] = useState([]);
  const [visitorRequestOptions, setVisitorRequestOptions] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  //const [newRequestOptionsText, setNewRequestOptionsText] = useState([]);
  const [events, setEvents] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const translateOptionValue = (forOption) => {
    var property = visitorSettings.extra.find(o => o._id === forOption._id);
    if(property) {
      if(property.type === "yesno" && forOption.value && forOption.value.length>0) {
        return (forOption.value==="yes"?"Oui":"Non");
      } else {
        return forOption.value;
      }
    } else {
      return forOption.value;
    }
  }
  useEffect(() => {
    setLoadingData(true);

    let floorList = axios.get("/projetkhiron/floors");
    let settingsReq = axios.get("/projetkhiron/settings", {
      params: {
          config: "production"
        }
    });
    let bearerSettingsReq = axios.get("/projetkhiron/roles", {
      params: {
          name: "bearer"
        }
    });
    let cleanerSettingsReq = axios.get("/projetkhiron/roles", {
      params: {
          name: "cleaner"
        }
    });
    axios.all([floorList, settingsReq, bearerSettingsReq, cleanerSettingsReq])
      .then(
        axios.spread((...responses) => {
          const floorListRes = responses[0];
          const settingsRes = responses[1];
          const bearerRes = responses[2];
          const cleanerRes = responses[3];

          if(bearerRes.status === 200 )
            setBearerSettings(bearerRes.data[0].settings);
          
          if(cleanerRes.status === 200 )
            setCleanerSettings(cleanerRes.data[0].settings);

          if(settingsRes.status === 200)
            setVisitorSettings(settingsRes.data[0].visitor.settings);

          if (floorListRes.status === 200) {
            let sectorOptions = [];
            floorListRes.data.forEach(floor => {
              sectorOptions.push({ label: floor.label, _id: floor._id, type: 'floor' });
              if (floor.sections && floor.sections.length > 0) {
                floor.sections.forEach(section => {
                  sectorOptions.push({ label: " " + section.label, _id: section._id, floorID: floor._id, floorLabel: floor.label, type: 'section' });
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
        setLoadingData(false);
      });
  }, [props.user])

  useEffect(() => {
    setSearchVisitor((props.user.licence.visitor_module &&  AR.isEnabled(props.user.access,AR.ROLE_VISITOR_VIEW) ));
    setSearchBearer((props.user.licence.bearer_module && AR.isEnabled(props.user.access,AR.ROLE_BEARER_VIEW) ));
    setSearchCleaner((props.user.licence.cleaner_module && AR.isEnabled(props.user.access,AR.ROLE_CLEANER_VIEW) ));
  }, [props.user.licence])
  

  const handleSelectedFromRequest = (value) => {
    setSelectedFromRequest(value);
    if (value && ((value.type === "floor") || value.type === "section")) {
      setLoadingFromBeds(true);
      setShowFromBeds(true);
      var getFromFloorID = value._id;
      if (value.type === "section"){
        getFromFloorID = value.floorID;
      }

      axios.get("/projetkhiron/floor/" + getFromFloorID)
        .then((response) => {
          //console.log(response);
          if (response.status === 200) {

            let beds = [];
            if (value.type === "floor")
              beds = response.data.beds;
            else {
              let section = response.data.sections.find(o => o._id === value._id);
              if (section)
                beds = section.beds;
            }

            let bedOptions = [];
            beds.forEach(bed => {
              bedOptions.push({ label: bed.label, _id: bed._id, type: 'bed' });
            });
            setFromBedList(bedOptions);
          }
          setLoadingFromBeds(false);
        }).catch(error => {
          console.log("error" + error);
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
    setStatusMessage("Recherche en court");
    statusProgressRef.current.showStatus();

    var tweakedFromDate = new Date(fromDate);
    tweakedFromDate.setHours(0);
    tweakedFromDate.setMinutes(0);
    tweakedFromDate.setSeconds(0);

    var tweakedToDate = new Date(toDate);
    tweakedToDate.setHours(23);
    tweakedToDate.setMinutes(59);
    tweakedToDate.setSeconds(59);

    var bedID = null;
    if(selectedBedFromRequest)
      bedID = selectedBedFromRequest._id;

    var floorID = null;
    var sectionID = null;
    if(selectedFromRequest) {
      if (selectedFromRequest.type === "floor"){
        floorID = selectedFromRequest._id;
      } else if (selectedFromRequest.type === "section"){
        sectionID = selectedFromRequest._id;
        floorID = selectedFromRequest.floorID;
      }
    }

    axios.post("/projetkhiron/requests/search", {
        floorID: floorID,
        sectionID: sectionID,
        bedID: bedID,
        visitorOptions: visitorRequestOptions,
        bearerOptions: bearerRequestOptions,
        cleanerOptions: cleanerRequestOptions,
        fromDate: tweakedFromDate,
        toDate: tweakedToDate,
        searchVisitor:searchVisitor,
        searchBearer:searchBearer,
        searchCleaner:searchCleaner
    })
      .then((response) => {
        //console.log(response);
        if (response.status === 200) {
          setPage(0);
          setEvents(response.data);
        }
      }).catch(error => {
        console.log("error " + error.message);

        //if (error) throw error;
      }).finally(() => {
        statusProgressRef.current.hideStatus();
      });
  }


  const getRequestOptionValueFor = (inRequestOptions, option) => {
    let newReqOption = inRequestOptions.find(item => item._id === option._id);
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

  const inserUpdateRequestOption = (inReqProps, setReqProps, property, value, label) => {
    let newRequestOptionsCopy = [...inReqProps];
    const selectedPropertyValuendex = newRequestOptionsCopy.findIndex(o => o._id === property._id);
    if(selectedPropertyValuendex === -1) { //new
      setReqProps([...newRequestOptionsCopy, {_id:property._id, type:property.type, label:property.text, value:value, entity:property.entity, multi:(property.multi)?true:false}]);
    } else { //update
      let copyOption = {...newRequestOptionsCopy[selectedPropertyValuendex]};
      copyOption.value = value;
      setReqProps([
        ...newRequestOptionsCopy.slice(0, selectedPropertyValuendex),
        copyOption,
        ...newRequestOptionsCopy.slice(selectedPropertyValuendex + 1)
      ]);
    }
  }

  
  const removePropertyOption = (inReqProps, setReqProps, property) => {
    let newRequestOptionsCopy = [...inReqProps];
    const selectedPropertyValuendex = newRequestOptionsCopy.findIndex(o => o._id === property._id);

    if(selectedPropertyValuendex !== -1) { //new
      setReqProps([
        ...newRequestOptionsCopy.slice(0, selectedPropertyValuendex),
        ...newRequestOptionsCopy.slice(selectedPropertyValuendex + 1)
      ]);
    }
  }
  
  const handleRequestPropertyChange = (inReqProps, setReqProps, property, e) => {    
    if(e.target.value) {
      if(property.type === Properties.LIST_PROPERTY) { //liste
        if(property.multi === false) {
          const propertyOption = property.items.find(o => o._id === e.target.value);
          inserUpdateRequestOption(inReqProps, setReqProps, property, e.target.value, propertyOption.text);
        } else {
          var textValues = [];
          e.target.value.forEach((id) => {
            const propertyOption = property.items.find(o => o._id === id);
            textValues.push(propertyOption.text);
          });
          inserUpdateRequestOption(inReqProps, setReqProps, property, e.target.value, textValues.join(","));
        }
      } else {
        if(e.target.value.trim().length !== 0)
          inserUpdateRequestOption(inReqProps, setReqProps, property, e.target.value, e.target.value);
        else
          removePropertyOption(inReqProps, setReqProps, property);
      }
    } else {
      removePropertyOption(inReqProps, setReqProps, property);
    }
  }

  let fromBedsSelection = null;
  if (showFromBeds) {
    if (loadingFromBeds) {
      fromBedsSelection = <Skeleton animation="wave" variant="rect" width={300} height={60} />
    } else {
      fromBedsSelection = <Autocomplete
        key={selectedBedFromRequest}
        value={selectedBedFromRequest}
        id="fromBedLocation"
        options={fromBedList}
        onChange={(event, value, reason) => setSelectedBedFromRequest(value)}
        getOptionLabel={(option) => option.label}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Lit" variant="outlined" />}
      />
    }
  }

  let optionalVisitorProperties = null;
  if(props.user.licence.visitor_module && AR.isEnabled(props.user.access,AR.ROLE_VISITOR_VIEW)){
    if (visitorSettings && visitorSettings.extra && visitorSettings.extra.length > 0) {
      optionalVisitorProperties = <Grid xs item ><Accordion style={{ width: 300 }} disabled={!searchVisitor}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Filtres données visiteurs</Typography>
        </AccordionSummary>
        <AccordionDetails style={{maxHeight:250,overflow:'auto'}} >
          <Grid container spacing={1} >
        {visitorSettings.extra.map((property) => (
        <Grid xs item key={property._id}>
            <PropertySelector
              key={property._id + "-prop"}
              label={property.text}
              value={getRequestOptionValueFor(visitorRequestOptions, property)}
              onChange={(e) => handleRequestPropertyChange(visitorRequestOptions, setVisitorRequestOptions, property, e)}
              extra={{ ...property, required: false }}
              style={{ width: 270 }} />
          </Grid>
      ))}
      </Grid>
      </AccordionDetails>
      </Accordion></Grid>
    }
  }


  let optionalBearerProperties = null;
  if(props.user.licence.bearer_module && AR.isEnabled(props.user.access,AR.ROLE_BEARER_VIEW) ) {
    if (bearerSettings && bearerSettings.extra && bearerSettings.extra.length > 0) {
      optionalBearerProperties = <Grid xs item ><Accordion style={{ width: 300 }} disabled={!searchBearer}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Filtres données brancarderie</Typography>
        </AccordionSummary>
        <AccordionDetails style={{maxHeight:250,overflow:'auto'}} >
          <Grid container spacing={1} >
        {bearerSettings.extra.map((property) => (
        <Grid xs item key={property._id}>
            <PropertySelector
              key={property._id + "-prop"}
              label={property.text}
              value={getRequestOptionValueFor(bearerRequestOptions, property)}
              onChange={(e) => handleRequestPropertyChange(bearerRequestOptions, setBearerRequestOptions,property, e)}
              extra={{ ...property, required: false }}
              style={{ width: 270 }} />
          </Grid>
      ))}
      </Grid>
      </AccordionDetails>
      </Accordion></Grid>
    }
  }
  let optionalCleanerProperties = null;
  if(props.user.licence.cleaner_module && AR.isEnabled(props.user.access,AR.ROLE_CLEANER_VIEW) ){
    if (cleanerSettings && cleanerSettings.extra && cleanerSettings.extra.length > 0) {
      optionalCleanerProperties = <Grid xs item ><Accordion style={{ width: 300 }} disabled={!searchCleaner}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Filtres données nettoyage</Typography>
        </AccordionSummary>
        <AccordionDetails style={{maxHeight:250,overflow:'auto'}} >
          <Grid container spacing={1} >
        {cleanerSettings.extra.map((property) => (
        <Grid xs item key={property._id}>
            <PropertySelector
              key={property._id + "-prop"}
              label={property.text}
              value={getRequestOptionValueFor(cleanerRequestOptions,property)}
              onChange={(e) => handleRequestPropertyChange(cleanerRequestOptions, setCleanerRequestOptions, property, e)}
              extra={{ ...property, required: false }}
              style={{ width: 270 }} />
          </Grid>
      ))}
      </Grid>
      </AccordionDetails>
      </Accordion></Grid>
    }
  }
  const handleClearSearchAndResuts = () => {
    setFromDate(new Date())
    setToDate(new Date());
    setVisitorRequestOptions([]);
    setBearerRequestOptions([]);
    setCleanerRequestOptions([]);
    setSelectedBedFromRequest(null);
    setSelectedFromRequest(null);
    setEvents([]);
    setShowFromBeds(false);
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, events.length - page * rowsPerPage);
  return (
    <div className={classes.root} style={{ height: "100%", width: '100%' }}>
      <Paper elevation={0} style={{ height: "100%", width: '100%' }} >

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
                <TableCell style={{ width: '300px', paddingBottom: '15px' , verticalAlign:'top'}} >
                  {loadingData ?
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
                                  key={selectedFromRequest}
                                  value={selectedFromRequest}
                                  id="forLocation"
                                  options={locationList}
                                  onChange={(event, value, reason) => handleSelectedFromRequest(value)}
                                  getOptionLabel={(option) => option.label}
                                  style={{ width: '300px' }}
                                  renderInput={(params) => <TextField {...params} label="Sur l'étage" variant="outlined" />}
                                />
                              </Grid>
                              <Grid xs item>
                                {fromBedsSelection}
                              </Grid>

                              {props.user.licence.visitor_module && AR.isEnabled(props.user.access,AR.ROLE_VISITOR_VIEW) ?
                              <Grid xs item>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={searchVisitor}
                                      onChange={(event) => setSearchVisitor(event.target.checked)}
                                      name="checkedSearchVisitors"
                                      color="primary"
                                    />
                                  }
                                  label="Recherche données visiteurs"
                                />
                              </Grid>
                              :null}
                              {optionalVisitorProperties}
                              
                              {props.user.licence.bearer_module && AR.isEnabled(props.user.access,AR.ROLE_BEARER_VIEW) ?
                              <Grid xs item>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={searchBearer}
                                      onChange={(event) => setSearchBearer(event.target.checked)}
                                      name="checkedSearchBearer"
                                      color="primary"
                                    />
                                  }
                                  label="Recherche données de brancarderie"
                                />
                              </Grid>:null}
                              {optionalBearerProperties}

                              {props.user.licence.cleaner_module && AR.isEnabled(props.user.access,AR.ROLE_CLEANER_VIEW) ?
                              <Grid xs item>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={searchCleaner}
                                      onChange={(event) => setSearchCleaner(event.target.checked)}
                                      name="checkedSearchCleaner"
                                      color="primary"
                                    />
                                  }
                                  label="Recherche données nettoyage"
                                />
                              </Grid>:null}
                              {optionalCleanerProperties}

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
                                  style={{width:300}}
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
                                  style={{width:300}}
                                />
                              </Grid>

                              <Grid container justify="space-evenly" alignItems="center">
                                <Grid item  >
                                <Button  variant="contained" color="primary"  onClick={handleSearchRequest}>
                                  Rechercher
                                </Button>
                                </Grid>
                                <Grid item >
                                <Button  variant="contained" color="secondary" onClick={handleClearSearchAndResuts}>
                                  Effacer
                                </Button>
                                </Grid>
                              </Grid>
                            </Grid>
                          </MuiPickersUtilsProvider>
                        </Paper>
                  }
                </TableCell>
                <TableCell style={{ verticalAlign: 'top', width: '100%'}}>
                  {!loadingData&&AR.isEnabled(props.user.access,AR.ROLE_JOURNAL_PDF)?
                  <PDFDownloadLink style={{color:theme.palette.text.primary, textDecoration: 'none'}} document={<JournalPDFDocument events={events} translateOptionFnc={translateOptionValue}/>} fileName="journal.pdf">
                    {({ blob, url, loading, error }) => (loading ? 'Chargement du journal...' : 'Télécharger journal')}
                  </PDFDownloadLink>
                  :null}
                  <TableContainer size="small" component={Paper} style={{ width: '100%' }}>
                    <Table size="small" aria-label={props.title} style={{ width: '100%' }}>
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tableHeaderCell} style={{ width: '150px' }}>Date</TableCell>
                          <TableCell className={classes.tableHeaderCell} style={{ width: '100px' }}>Événement</TableCell>
                          <TableCell className={classes.tableHeaderCell}>Détails</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {(rowsPerPage > 0
                          ? events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          : events
                        ).map((event) => (
                          <TableRow key={event._id}>
                          <TableCell style={{ width: '150px' }}>{new Date(event.date).toLocaleString('fr-CA', { dateStyle: "short", timeStyle: "short", hour12: false })}</TableCell>
                          <TableCell style={{ width: '100px' }}>{event.type === "visitor" ? "Visiteur" : event.type === "bearer" ? "Brancarderie" : event.type === "cleaner" ? "Nettoyage" : "Inconnu"}</TableCell>
                          <TableCell >
                            <Grid container
                              direction="column"
                              justify="flex-start"
                              alignItems="flex-start"
                              style={{ width: '100%' }}>
                              {event.options.map(option => (
                                <Grid container direction="row" key={event._id+"-"+option._id}
                                  style={{ width: '100%' }}>
                                  {option.label} : {translateOptionValue(option)}
                                </Grid>
                              ))}
                            </Grid>
                          </TableCell>
                        </TableRow>
                        ))}

                        {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}

                      </TableBody>
                      <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                          colSpan={3}
                          count={events.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: { 'aria-label': 'rows per page' },
                            native: true,
                          }}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
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
