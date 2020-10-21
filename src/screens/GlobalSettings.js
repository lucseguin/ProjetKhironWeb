import React, {useState,useRef,useEffect } from "react";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { v4 as uuidv4 } from 'uuid';
import SingleInputDialog from '../components/SingleInputDialog'
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  licence: {
    width:400, 
  },
  licenceText: {
    fontSize:'10px', 
    fontFamily:'monospace'
  },
  checkBoxFont: {
    fontSize: 14,
  },
}));

const APP_VERSION = "v0.9.0-20201007";

export default function GlobalSettings(props) {
  const classes = useStyles();

  const [globalSettings, setGlobalSettings] = useState({departments:[]});
  const [selectedDepartementListOption, setSelectedDepartementListOption] = useState({_id:'', text:''});
  const [settingsModified, setSettingsModified] = useState(false);

  const inputDlgRef = useRef(null);
  const [singleInputTitle, setSingleInputTitle] = useState('');
  const [singleInputMsg, setSingleInputMsg] = useState('');
  const [singleInputLabel, setSingleInputLabel] = useState('');
  //const [singleInputValue, setSingleInputValue] = useState('');
  
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [alertAutoHide, setAlertAutoHide]= useState(3000);
  const [loadingSettings, setLoadingSettings]  = useState(false);

  const [licenceObject, setLicenceObject]  = useState(null);

  useEffect(() => {
    setLoadingSettings(true);

    axios.post("/projetkhiron/settings/licence", 
    {
        config: "production"
    })
      .then((response) => {
        if (response.status === 200 && response.data) {
          setLicenceObject(response.data);
        }
      }).catch(error => {
        console.log("error" + error);
        if (error) throw error;
      }).finally(() => {
        setLoadingSettings(false);
    });

    axios.get("/projetkhiron/settings", {
      params: {
          config: "production"
        }
    })
      .then((response) => {
        if (response.status === 200 && response.data.length === 1) {
          setGlobalSettings(response.data[0]);
        }
      }).catch(error => {
        console.log("error" + error);
        if (error) throw error;
      }).finally(() => {
        setLoadingSettings(false);
    });
}, [props.user])

  const handleSaveSettings = () => {
    axios.put("/projetkhiron/settings", 
    {
      settings: globalSettings,
    },      
    {
      params: {
        config: "production"
      }
    })
    .then((response) => {
      if (response.status === 200) {
        setAlertMessage("Sauvegarder");
        setAlertType("success");
        setAlertAutoHide(3000);
        setOpenAlert(true);
      }
    }).catch(error => {
      setAlertMessage("Une erreur est survenu lors de la sauvegarde");
      setAlertType("error");
      setAlertAutoHide(3000);
      setOpenAlert(true);
      console.log("error" + JSON.stringify(error));
    }).finally(() => {
      setSettingsModified(false);
    });
    
  }

  const handleNewPropertyListOption = () => {
    let newOption = {_id:uuidv4(), text:"Nouveau département"};

    setSelectedDepartementListOption(newOption);

    setSingleInputTitle("Nouveaux département");
    setSingleInputMsg("Nouvelle option de département");
    setSingleInputLabel("Titre du département");
    //setSingleInputValue("");

    inputDlgRef.current.showDialog();
  }

  const handlePropertyListOptionChange = (event) => {
    let updatedOption = {...selectedDepartementListOption};
    updatedOption.text = event.target.value;
    setSelectedDepartementListOption(updatedOption);
  }

  const handleConfirmPropertyListOptionChange = () => {
    let updatedSettings = {...globalSettings};
    const selectedListOptionIndex = updatedSettings.departments.findIndex(o => o._id === selectedDepartementListOption._id);
    if (selectedListOptionIndex === -1){ //new   
      updatedSettings.departments = [...updatedSettings.departments, selectedDepartementListOption];
    } else { //existing
      updatedSettings.departments = [
      ...updatedSettings.departments.slice(0, selectedListOptionIndex),
      selectedDepartementListOption,
      ...updatedSettings.departments.slice(selectedListOptionIndex + 1)
    ];
    }
    setGlobalSettings(updatedSettings);
    setSettingsModified(true);
  }

  const handleEditListOption = (option) => {
    setSelectedDepartementListOption(option);

    setSingleInputTitle("Modification de département");
    setSingleInputMsg("Modification de département");
    setSingleInputLabel("Titre du département");
    //setSingleInputValue("");

    inputDlgRef.current.showDialog();
  }

  const handleDeleteListOption = (option) => {
    let updatedSettings = {...globalSettings};

    const selectedListOptionIndex = updatedSettings.departments.findIndex(o => o._id === option._id);
    
    updatedSettings.departments = [
      ...updatedSettings.departments.slice(0, selectedListOptionIndex),
      ...updatedSettings.departments.slice(selectedListOptionIndex + 1)
    ];
    setGlobalSettings(updatedSettings);

    setSettingsModified(true);
  }
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleLicenceChange = (event) => {
    let updatedSettings = {...globalSettings};
    updatedSettings.licence = event.target.value;;
    setGlobalSettings(updatedSettings);
    setSettingsModified(true);
    setLicenceObject(null);
    if(event.target.value && event.target.value.length > 0) {
      processLicenceString(event.target.value).then(jsonObj => {
        setLicenceObject(jsonObj);
      }).catch(err => {
        console.log(err);
      })
    }
}

const processLicenceString = (licenceString) => {
  return new Promise((resolve, reject) => {
    axios.post("/projetkhiron/settings/licence", 
    {
      config: "production",
      licence:licenceString
    })
    .then((response) => {
      if (response.status === 200 && response.data) {
        resolve(response.data);
      } else {
        reject({message:'Invalid Licence', code:403});
      }
    }).catch(error => {
      console.log("error" + error);
      reject(error);
    })
  });
}

  return (
        <Paper elevation={0} style={{ height: '100vh', width:'95vw', verticalAlign: 'top', alignItems: 'top',
        justifyContent: 'top', }}>
          <SingleInputDialog
            ref={inputDlgRef}
            title={singleInputTitle} 
            message={singleInputMsg}
            inputLabel={singleInputLabel}
            value={selectedDepartementListOption.text}
            cancelLabel="Annuler"
            confirmLabel="Terminer"
            onChange={handlePropertyListOptionChange}
            onConfirm={handleConfirmPropertyListOptionChange}
          />
          <Snackbar open={openAlert} autoHideDuration={alertAutoHide} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={alertType}>
              {alertMessage}
            </Alert>
          </Snackbar>
          <TableContainer >
            <Table size="small" style={{verticalAlign: 'top', alignItems: 'top', justifyContent: 'top', }}>
              <TableBody >
                <TableRow >
                  <TableCell colSpan={2}>
                    <Typography variant="h6" gutterBottom>
                      Configurations Systèmes
                    </Typography>  
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="subtitle1" gutterBottom>
                      {APP_VERSION}
                    </Typography>  
                  </TableCell>
                </TableRow>
                <TableRow>
                  {/* <TableCell style={{verticalAlign: 'top', alignItems: 'top', justifyContent: 'top', }}>  
                    <Grid container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                      >
                       <Grid item>
                        <Grid
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center"
                        >
                          <Grid item>
                            <Typography variant="subtitle1" gutterBottom>
                                Départements
                            </Typography>  
                          </Grid>
                          <Grid item>
                            <IconButton color="primary" aria-label="add shift" component="span" onClick={handleNewPropertyListOption}>
                              <AddCircleOutlineIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item >
                        <Paper >
                        {loadingSettings?
                        <List dense={true}>
                          <ListItem><Skeleton variant="text" width={300}/></ListItem>
                          <ListItem><Skeleton variant="text" width={300}/></ListItem>
                          <ListItem><Skeleton variant="text" width={300}/></ListItem>
                          <ListItem><Skeleton variant="text" width={300}/></ListItem>
                          </List>
                        :<List dense={true} style={{minWidth:300, maxHeight:150, overflow:'auto'}}>
                            {globalSettings.departments.map((department) => (
                              <ListItem key={department._id}>
                                <ListItemText
                                  primary={department.text}
                                />
                                <ListItemSecondaryAction>
                                  <IconButton aria-label="edit" size="small" onClick={() => handleEditListOption(department)}>
                                      <EditIcon />
                                  </IconButton >
                                  <IconButton aria-label="delete" size="small" onClick={() => handleDeleteListOption(department)}>
                                      <DeleteIcon />
                                  </IconButton >
                                </ListItemSecondaryAction>
                              </ListItem>
                            ))}
                        </List>}
                        </Paper>
                      </Grid>
                    </Grid>
                  </TableCell> */}
                  <TableCell style={{verticalAlign: 'top', alignItems: 'top', justifyContent: 'top', }}>
                    <Grid container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start">
                      <Grid item>
                        <TextField
                          InputProps={{
                            classes: {
                              input: classes.licenceText,
                            },
                          }}
                          id="filled-multiline-static"
                          label="Licence"
                          multiline
                          value={globalSettings.licence}
                          onChange={handleLicenceChange}
                          variant="filled"
                          className={classes.licence}
                        />
                      </Grid>
                    </Grid>
                    {licenceObject?
                    [<Grid item key="bed-module-checkbox">
                      <FormControlLabel
                          classes={{ label: classes.checkBoxFont }}
                          control={
                            <Checkbox size="small" checked={licenceObject.bed_module} color="primary" disabled />
                          }
                          label="Module gestion des lits"
                        />
                    </Grid>,
                    <Grid item key="bearer-module-checkbox">
                      <FormControlLabel
                          classes={{ label: classes.checkBoxFont }}
                          control={
                            <Checkbox size="small" checked={licenceObject.bearer_module} color="primary" disabled />
                          }
                          label="Module gestion de la brancarderie"
                        />
                    </Grid>,
                    <Grid item key="cleaner-module-checkbox">
                      <FormControlLabel
                          classes={{ label: classes.checkBoxFont }}
                          control={
                            <Checkbox size="small" checked={licenceObject.cleaner_module} color="primary" disabled />
                          }
                          label="Module gestion nettoyage et salubrité"
                        />
                    </Grid>,
                    <Grid item key="visitor-module-checkbox">
                      <FormControlLabel
                          classes={{ label: classes.checkBoxFont }}
                          control={
                            <Checkbox size="small" checked={licenceObject.visitor_module} color="primary" disabled />
                          }
                          label="Module gestion des visiteurs"
                        />
                    </Grid>,
                    <Grid key="licence-date-validity">
                        <Typography variant="subtitle1" gutterBottom>
                          Valide de {new Date(licenceObject.generated_on).toLocaleString('fr-CA', {dateStyle:"short"})} à {new Date(licenceObject.ends_on).toLocaleString('fr-CA', {dateStyle:"short"})}
                        </Typography>  
                    </Grid>]
                    :null}
                  </TableCell>
                  <TableCell  style={{verticalAlign: 'top', alignItems: 'top', justifyContent: 'top', }}>
                    <Button variant="contained" color="primary" disabled={!settingsModified} onClick={handleSaveSettings}>
                      Sauvegarder
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
    );
}
