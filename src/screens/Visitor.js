import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import PropertySelector from "../components/properties/PropertySelector"
import * as Properties from '../components/properties/Properties'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
var qs = require('qs');
// const Cryptr = require('cryptr');
// const cryptr = new Cryptr(window._env_.REACT_APP_SALT);

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        //backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100vh',
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
    }
}));

function Visitor(props) {
    const classes = useStyles();

    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    const [settings, setSettings] = useState({ extra: [] });
    const [newRequestOptions, setNewRequestOptions] = useState([]);
    const [newRequestOptionsText, setNewRequestOptionsText] = useState([]);
    const [missingRequiredOptions, setMissingRequiredOptions] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [selectedFromRequest, setSelectedFromRequest] = useState();
    const [loadingFromBeds, setLoadingFromBeds] = useState(false);
    const [showFromBeds, setShowFromBeds] = useState(false);
    const [fromBedList, setFromBedList] = useState([]);
    const [selectedBedFromRequest, setSelectedBedFromRequest] = useState(null);
    const [globalSettings, setGlobalSettings] = useState({name:''});

    const [tenant, setTenant] = useState('');

    const [allSettingsLoaded, setAllSettingsLoaded] = useState(false);
    const [serviceNotAvailable, setServiceNotAvailable] = useState(false);

    useEffect(() => {
        setAllSettingsLoaded(false);
        setServiceNotAvailable(false);

        var qsTenant = qs.parse(props.location.search, { ignoreQueryPrefix: true }).tenant;
        // qsTenant = cryptr.decrypt(qsTenant);
        setTenant(qsTenant);

        let floorList = axios.get("/projetkhiron/floors",{
            headers:{
                tenant:qsTenant,
            }});
        let visitorSettings = axios.get("/projetkhiron/visitor/settings",{
            headers:{
                tenant:qsTenant,
            }});
        let globalSettingsReq = axios.get("/projetkhiron/settings", {
            headers:{
                tenant:qsTenant,
            },
            params: {
                config: "production"
            }
        });
        axios.all([floorList, visitorSettings, globalSettingsReq])
            .then(
                axios.spread((...responses) => {
                    const floorListRes = responses[0];
                    const settingsRes = responses[1];
                    const globalRes = responses[2];

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

                        if (settingsRes.status === 200) {
                            setSettings(settingsRes.data.settings);
                            if (globalRes.status === 200) {
                                setGlobalSettings(globalRes.data[0]);
                                setAllSettingsLoaded(true);
                            } else {
                                console.log("[VisitorRegistration] Failed retreiving settings");
                                //console.log(settingsRes);
                                setServiceNotAvailable(true);
                            }
                        } else {
                            console.log("[VisitorRegistration] Failed retreiving settings");
                            setServiceNotAvailable(true);
                            //console.log(settingsRes);
                        }
                    } else {
                        console.log("[VisitorRegistration] Failed retreiving list of floors");
                        setServiceNotAvailable(true);
                        //console.log(floorListRes);
                    }
                }
                ))
            .catch(errors => {
                setServiceNotAvailable(true);
                console.error(errors);
            });
    }, []);

    const handleSelectedFromRequest = (value) => {
        setSelectedFromRequest(value);
        if (value && ((value.type === "floor") || value.type === "section")) {
            setLoadingFromBeds(true);
            setShowFromBeds(true);
            var getFromFloorID = value._id;
            if (value.type === "section")
                getFromFloorID = value.floorID;

            axios.get("/projetkhiron/floor/" + getFromFloorID,{
                headers:{
                    tenant:tenant,
                }})
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

    const handleSendNewRequest = (event) => {
        //confirm that all required filed have been populated in newRequestOptions
        var scanMissingRequiredOptions = [];
        settings.extra.forEach(property => {
            if (property.required) {
                if (newRequestOptions.findIndex(o => o._id === property._id) === -1) { //required property value not provided
                    scanMissingRequiredOptions.push(property._id);
                }
            }
        });

        setMissingRequiredOptions([...scanMissingRequiredOptions]);
        if (scanMissingRequiredOptions.length > 0) {
            setAlertMessage("Valeur obligatoire manquante");
            setAlertType("error");
            setOpenAlert(true);
            return;
        }

        let fromReq = null;

        if (selectedBedFromRequest) {
            fromReq = { ...selectedBedFromRequest };
            if (selectedFromRequest.type === "section") {
                fromReq.label = selectedFromRequest.floorLabel + " - " + selectedFromRequest.label + " - " + fromReq.label;
                fromReq = { ...fromReq, section: selectedFromRequest };
            } else {
                fromReq.label = selectedFromRequest.label + " - " + fromReq.label;
                fromReq = { ...fromReq, floor: selectedFromRequest };
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
        }, {
            headers:{
                tenant:tenant,
            }})
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
                setShowFromBeds(false);
                setSelectedFromRequest(null);
                setSelectedBedFromRequest(null);
                setNewRequestOptions([]);
            });
    }

    const handleCancelNewRequest = () => {
        setShowFromBeds(false);
        setSelectedFromRequest(null);
        setSelectedBedFromRequest(null);
        setNewRequestOptions([]);
    }
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const getNewRequestValueFor = (option) => {
        let newReqOption = newRequestOptions.find(item => item._id === option._id);
        if (newReqOption)
            return newReqOption.value;
        else {
            if (option.type === Properties.NUM_PROPERTY)
                return 0;
            else if (option.type === Properties.LIST_PROPERTY && option.multi === true)
                return [];
            else
                return '';
        }
    }

    const removeSimplePropertyOption = (property) => {
        let newRequestOptionsCopy = [...newRequestOptions];
        const selectedPropertyValuendex = newRequestOptionsCopy.findIndex(o => o._id === property._id);
        if(selectedPropertyValuendex !== -1) {
          setNewRequestOptions([
            ...newRequestOptionsCopy.slice(0, selectedPropertyValuendex),
            ...newRequestOptionsCopy.slice(selectedPropertyValuendex + 1)
          ]);
        }
    
        let newRequestOptionsCopyText = [...newRequestOptionsText];
        const selectedPropertyTextValuendex = newRequestOptionsCopyText.findIndex(o => o._id === property._id);
        if(selectedPropertyTextValuendex !== -1) { //new
          setNewRequestOptionsText([
            ...newRequestOptionsCopyText.slice(0, selectedPropertyTextValuendex),
            ...newRequestOptionsCopyText.slice(selectedPropertyTextValuendex + 1)
          ]);
        }
      }

    const inserUpdateSimplePropertyOption = (property, value, label) => {
        let newRequestOptionsCopy = [...newRequestOptions];
        const selectedPropertyValuendex = newRequestOptionsCopy.findIndex(o => o._id === property._id);

        if (selectedPropertyValuendex === -1) { //new
            setNewRequestOptions([...newRequestOptionsCopy, { _id: property._id, label: property.text, value: value }]);
        } else { //update
            let copyOption = { ...newRequestOptionsCopy[selectedPropertyValuendex] };
            copyOption.value = value;
            setNewRequestOptions([
                ...newRequestOptionsCopy.slice(0, selectedPropertyValuendex),
                copyOption,
                ...newRequestOptionsCopy.slice(selectedPropertyValuendex + 1)
            ]);
        }

        let newRequestOptionsCopyText = [...newRequestOptionsText];
        const selectedPropertyTextValuendex = newRequestOptionsCopyText.findIndex(o => o._id === property._id);
        if (selectedPropertyTextValuendex === -1) { //new
            setNewRequestOptionsText([...newRequestOptionsCopyText, { _id: property._id, label: property.text, value: label, valueId: value }]);
        } else { //update
            let copyOption = { ...newRequestOptionsCopyText[selectedPropertyTextValuendex] };
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
        if(e.target.value) {
            if (property.type === Properties.LIST_PROPERTY) { //liste
                if (property.multi === false) {
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
            } else {
                inserUpdateSimplePropertyOption(property, e.target.value, e.target.value);
            }
        } else {
            removeSimplePropertyOption(property);
        }
    }

    let fromBedsSelection = null;
    if (showFromBeds) {
        if (loadingFromBeds) {
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

    let doc = null;
    if(allSettingsLoaded) {
        doc = <div className={classes.paper}>
        <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={alertType}>
                {alertMessage}
            </Alert>
        </Snackbar>
        <Grid container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{ padding: 10, width: '100%' }}
            spacing={1} >
            <Grid xs item>
                <Typography variant="h6">
                    {globalSettings.name}
                </Typography>
            </Grid>
            <Grid xs item>
                <Typography variant="h6">
                    Enregistrement de visiteur
                </Typography>
            </Grid>
            <Grid xs item style={{width:'100%'}}>
                <Autocomplete
                    id="forLocation"
                    options={locationList}

                    onChange={(event, value, reason) => handleSelectedFromRequest(value)}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} label="Pour" variant="outlined" />}
                    style={{width:'100%'}}
                />
            </Grid>
            <Grid xs item style={{width:'100%'}}>
                {fromBedsSelection}
            </Grid>

            {settings.extra && settings.extra.length > 0 ?
                settings.extra.map((property) => (
                    <Grid item key={property._id} style={{width:'100%'}}>
                        <PropertySelector
                            key={property._id + "-prop"}
                            label={property.text}
                            value={getNewRequestValueFor(property)}
                            onChange={(e) => handleNewRequestPropertyChange(property, e)}
                            extra={property}
                            error={(missingRequiredOptions.findIndex(o => o === property._id) !== -1) ? true : false}
                            style={{width:'100%'}}
                            />
                    </Grid>
                )) : null}
            <Grid container direction="row"
            justify="space-evenly"
            >
                <Button variant="contained" color="primary" disabled={!selectedBedFromRequest} onClick={handleSendNewRequest}>
                    Enregistrer
              </Button>
              <Button variant="contained" color="secondary" onClick={handleCancelNewRequest}>
                    Annuler
              </Button>
            </Grid>
        </Grid>
    </div>
    }else if(!allSettingsLoaded && !serviceNotAvailable) {
        doc = <div className={classes.paper}>
        <Grid container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{ padding: 10, width: '100%' }}
            spacing={1} >
            <Grid xs item>
                <CircularProgress />
            </Grid>
            <Grid xs item>
                <Typography variant="h6">
                    Chargement de l'enregistrement de visiteur
                </Typography>
            </Grid>
        </Grid>
    </div>
    }else if(!allSettingsLoaded && serviceNotAvailable) {
        doc = <div className={classes.paper}>
        <Grid container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{ padding: 10, width: '100%' }}
            spacing={1} >
            <Grid xs item>
                <Typography variant="h6">
                    Le service d'enregistrement de visiteur n'est pas disponible pour le moment.
                </Typography>
            </Grid>
        </Grid>
    </div>
    }


    return (doc);
}


export default Visitor;
