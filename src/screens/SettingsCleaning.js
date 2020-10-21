import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropertyList from "../components/properties/PropertyList"
import PropertyEditor from "../components/properties/PropertyEditor"
import PropertiesAccountDetails from '../components/properties/PropertiesAccountDetails'
import PropertiesAccountsTable from '../components/properties/PropertiesAccountsTable'
import axios from 'axios';
import AvailableAlgos from "../components/AvailableAlgos"
import * as Properties from '../components/properties/Properties'
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TableHead } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import MaskedInput from 'react-text-mask';
import ConfirmDialog from "../components/ConfirmDialog"
//import ObjectID from 'mongodb'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { v4 as uuidv4 } from 'uuid';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    maxHeight: 500,
  },
  table: {
    minWidth: 650,
  },
  pageHeader: {
    fontSize: 20,
  },
  searchTextField: {
    width: '100ch',
  },
  iconTableCell: {
    width: '30px',
  },
  tableHeaderCell: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor:  theme.palette.background.default, 
    color: theme.palette.text.primary,
  },
  userDetailSection: {
    minWidth: 300,
    height: "100%",
  },
  userDetailCell: {
    borderBottom: 'none',
    width: "100%"
  },
  mainUserTableCell: {
    alignItems: 'top',
    justifyContent: 'top',
    height: 350
  },
  userDetailSectionHeader: {
    fontSize: 18,
  },
  rolePropertySections: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  checkBoxFont: {
    fontSize: 14,
  }
}));

function Hours24MaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-2]/, /[0-9]/, ':',/[0-5]/,/[0-9]/]}
      placeholderChar={'0'}
      showMask
    />
  );
}
Hours24MaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};


function HoursMinutesSecondsMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[0-2]/, /[0-9]/, ':',/[0-5]/,/[0-9]/,':',/[0-5]/,/[0-9]/]}
      placeholderChar={'0'}
      showMask
    />
  );
}
HoursMinutesSecondsMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

function compareShifts(a, b) {
  if (a.from > b.from) return 1;
  if (b.from > a.from) return -1;
  return 0;
}

export default function SettingsCleaning(props) {
  const classes = useStyles();
  
  const confirmDlgRef = useRef(null);


  const [userFilter, setUserFilter] = useState('');
  const [selectedAccount, setSelectedAccount] = useState();
  const [selectedProperty, setSelectedProperty] = useState();

  const [allUserAccounts, setAllUserAccounts] = useState([]);
  const [filteredUserAccounts, setFilteredUserAccounts] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [settingsModified, setSettingsModified] = useState(false);
  const [settings, setSettings] = useState({extra:[], algos:[], selectedAlgo:'', useShifts:false, shifts:[], useSectors:false});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');
  // const [isShiftStats, setIsShiftStats] = useState(false);
  // const [bearerAlgo, setBearerAlgo] = useState('');
  // const [allAlgos, setAllAlgos] = useState([]);
  // const [extraAccountProps, setExtraAccountProps] = useState([]);

  useEffect(() => {
      setLoadingUsers(true);
      axios.get("/projetkhiron/accounts/cleaner")
        .then((response) => {
          if (response.status === 200) {
            setAllUserAccounts(response.data);
            if (userFilter && userFilter.value.length > 0) {
              setFilteredUserAccounts([...response.data].filter((item) => {
                //TODO also search additional fields
                return item.firstName.toLowerCase().includes(userFilter) ||
                  item.lastName.toLowerCase().includes(userFilter) ||
                  item.email.toLowerCase().includes(userFilter) ||
                  item.phone.toLowerCase().includes(userFilter);
              }));
            } else {
              setFilteredUserAccounts([...response.data]);
            }
          }
        }).catch(error => {
          console.log("error" + error);
          if (error) throw error;
        }).finally(() => {
          setLoadingUsers(false);
        });

      setLoadingSettings(true);
      axios.get("/projetkhiron/roles", {
        params: {
            name: "cleaner"
          }
      })
        .then((response) => {
          if (response.status === 200 && response.data.length === 1) {
            response.data[0].settings.shifts.sort(compareShifts);
            setSettings(response.data[0].settings);
          }
        }).catch(error => {
          console.log("error" + error);
          if (error) throw error;
        }).finally(() => {
          setLoadingSettings(false);
        });
  }, [props.user])

  // const areShiftsValid = () => {

  // }

  const handledSaveSettings = (event) => {

    axios.put("/projetkhiron/roles/settings", {
      name: "cleaner",
      settings,
    })
    .then((response) => {
      if (response.status === 200) {
        setAlertMessage("Sauvegarder");
        setAlertType("success");
        setOpenAlert(true);
        setSettingsModified(false);
      }
    }).catch(error => {
      setAlertMessage(JSON.stringify(error));
      setAlertType("error");
      setOpenAlert(true);
      console.log("error" + error);

    }).finally(() => {
      
    });
    setSettingsModified(false);
  }

  const handleFilterChange = (event) => {
    setUserFilter(event.target.value);
    const lcFilterVal = event.target.value.toLowerCase();
    if (!event.target.value || 0 === event.target.value.length)
      setFilteredUserAccounts([...allUserAccounts]);
    else
      setFilteredUserAccounts([...allUserAccounts.filter((item) => {
        //TODO also search additional fields
        return item.firstName.toLowerCase().includes(lcFilterVal) ||
          item.lastName.toLowerCase().includes(lcFilterVal) ||
          item.email.toLowerCase().includes(lcFilterVal) ||
          item.phone.toLowerCase().includes(lcFilterVal);
      })]);
  };

  // const refreshUserAccountFilterUpdate = () => {
  //   const lcFilterVal = userFilter.toLowerCase();

  //   if (lcFilterVal && lcFilterVal.value.length > 0) {
  //     setFilteredUserAccounts([...allUserAccounts.filter((item) => {
  //       //TODO also search additional fields
  //       return item.firstName.toLowerCase().includes(lcFilterVal) ||
  //         item.lastName.toLowerCase().includes(lcFilterVal) ||
  //         item.email.toLowerCase().includes(lcFilterVal) ||
  //         item.phone.toLowerCase().includes(lcFilterVal);
  //     })]);
  //   } else {
  //     setFilteredUserAccounts([...allUserAccounts]);
  //   }
  // }

  const handleSetAccountToEdit = (account) => {
    setSelectedAccount(account);
    //console.log("***handleSetAccountToEdit account:" + account);
  };

  const handlePropertyToEdit = (item) => {
    setSelectedProperty(item);
    //console.log("***handleSetAccountToEdit account:" + account);
  };

  const handlePropertyDelete = (item) => {
    let settingsCopy = {...settings};
    const selectedBedIndex = settingsCopy.extra.findIndex(o => o._id === item._id);
    settingsCopy.extra = [
      ...settingsCopy.extra.slice(0, selectedBedIndex),
      ...settingsCopy.extra.slice(selectedBedIndex + 1)
    ];
    setSettings(settingsCopy);
    setSettingsModified(true);
  };
  const handlePropertyChange = (item) => {
    let settingsCopy = {...settings};
    const selectedBedIndex = settingsCopy.extra.findIndex(o => o._id === item._id);
    settingsCopy.extra = [
      ...settingsCopy.extra.slice(0, selectedBedIndex),
      { ...item },
      ...settingsCopy.extra.slice(selectedBedIndex + 1)
    ];
    setSettings(settingsCopy);
    setSettingsModified(true);
  };

  const handleNewProperty = () => {
    let settingsCopy = {...settings};
    settingsCopy.extra = [...settingsCopy.extra , { _id: uuidv4(), text: "Nouvelle Propriétée", type: Properties.TEXT_PROPERTY, max: 0, mandatory: false, mlAlgo: '' }];
    setSettings(settingsCopy); 
    setSettingsModified(true);
  }

  const handlePropListReorder = (reorderedList) => {
    //setExtraAccountProps([...reorderedList]);
    //setItems(reorderedList); 
  }

  const handleBearerAlgoChange = (event) => {
    let settingsCopy = {...settings};
    settingsCopy.selectedAlgo = event.target.value;
    setSettings(settingsCopy);  
    setSettingsModified(true);
  };

  const toggleUseShift = (event) => {
    let settingsCopy = {...settings};
    settingsCopy.useShifts = !settingsCopy.useShifts;
    setSettings(settingsCopy);  
    setSettingsModified(true);
  };

  const toggleUseSectors = (event) => {
    let settingsCopy = {...settings};
    settingsCopy.useSectors = !settingsCopy.useSectors;
    setSettings(settingsCopy);  
    setSettingsModified(true);
  };
  
  const handleShiftChange = (shift, which, event) => {
    let settingsCopy = {...settings};
    const selectedBedIndex = settingsCopy.shifts.findIndex(o => o._id === shift._id);
    let copyShift = {...settingsCopy.shifts[selectedBedIndex]};
    if(which === "from")
      copyShift.from = event.target.value;
    else
      copyShift.to = event.target.value;
    settingsCopy.shifts = [
      ...settingsCopy.shifts.slice(0, selectedBedIndex),
      copyShift,
      ...settingsCopy.shifts.slice(selectedBedIndex + 1)
    ];
    setSettings(settingsCopy);  
    setSettingsModified(true);
  }

  const handleDeleteShift = (shift) => {
    let settingsCopy = {...settings};
    const selectedBedIndex = settingsCopy.shifts.findIndex(o => o._id === shift._id);
    settingsCopy.shifts = [
      ...settingsCopy.shifts.slice(0, selectedBedIndex),
      ...settingsCopy.shifts.slice(selectedBedIndex + 1)
    ];
    setSettings(settingsCopy);  
    setSettingsModified(true);
  };
  
  const handleAddNewShft = () => {
    let settingsCopy = {...settings};
    settingsCopy.shifts = [...settingsCopy.shifts, {_id: uuidv4(), from:'00:00', to:'00:00'}];
    setSettings(settingsCopy);  
    setSettingsModified(true);
  };

  const handleSaveAccountChnage = (account) => {
    const idx = allUserAccounts.findIndex(o => o._id === account._id);

    let copyAccnt = { ...account };

    let newUserAccountLis = [
      ...allUserAccounts.slice(0, idx),
      copyAccnt,
      ...allUserAccounts.slice(idx + 1)
    ];
    setAllUserAccounts(newUserAccountLis);

    const lcFilterVal = userFilter.toLowerCase();
    if (lcFilterVal && lcFilterVal.value.length > 0) {
      setFilteredUserAccounts([...newUserAccountLis.filter((item) => {
        //TODO also search additional fields
        return item.firstName.toLowerCase().includes(lcFilterVal) ||
          item.lastName.toLowerCase().includes(lcFilterVal) ||
          item.email.toLowerCase().includes(lcFilterVal) ||
          item.phone.toLowerCase().includes(lcFilterVal);
      })]);
    } else {
      setFilteredUserAccounts([...newUserAccountLis]);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleServiceLevelChange = (e) => {
    let settingsCopy = {...settings};
    settingsCopy.serviceLevel = e.target.value;
    setSettings(settingsCopy);  
    setSettingsModified(true);
  }

  return (
    <Paper elevation={0} style={{ height: "100%", width: "100%" }}>
      <ConfirmDialog 
          ref={confirmDlgRef}
          title="Supprimer lit" 
          message="Etes-vous certain de vouloir supprimer ce lit?" 
          cancelLabel="Annuler"
          confirmLabel="Supprimer"
          onConfirm={() => console.log("on confirm")}
      />

      <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <TableContainer >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} width='100%'>
                <TableContainer>
                  <Table style={{ border: 'none', width: '100%' }} size="small">
                    <TableBody style={{ border: 'none' }}>
                      <TableRow style={{ borderBottom: 'none' }}>
                        <TableCell className={classes.pageHeader} style={{ borderBottom: 'none' }}>
                          Gestion des nettoyeurs
                        </TableCell>
                        <TableCell style={{ borderBottom: 'none' }}>
                          <TextField id="input-with-icon-grid" className={classes.searchTextField} label="Recherche" onChange={handleFilterChange} value={userFilter}
                            InputProps={{
                              endAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment>,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.mainUserTableCell} style={{ verticalAlign: 'top', width: '100%' }} >
                <PropertiesAccountsTable
                  userAccounts={filteredUserAccounts}
                  extraProperties={settings.extra}
                  onSelectedAccountForEdit={handleSetAccountToEdit}
                  loading={loadingUsers || loadingSettings} />
              </TableCell>
              <TableCell className={classes.mainUserTableCell} style={{ verticalAlign: 'top', minWidth: 300, maxWidth: 300 }} >
                <PropertiesAccountDetails
                  header="Details du nettoyeur"
                  label="Nettoyeur"
                  account={selectedAccount}
                  extraProperties={settings.extra}
                  onSave={handleSaveAccountChnage} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} style={{ verticalAlign: 'top' }}>
                <Grid   container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                  spacing={1}>
                  <Grid item xs={4} style={{minWidth: 400}}>
                    <Grid
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="flex-start"
                    >
                      <Grid item >
                        <Typography variant="subtitle1" gutterBottom>
                          Quart de travail
                        </Typography>  
                      </Grid>
                      <Grid item>
                        <FormControlLabel
                          classes={{ label: classes.checkBoxFont }}
                          control={
                            <Checkbox
                              size="small"
                              checked={settings.useShifts}
                              onChange={toggleUseShift}
                              name="use-cleaner-shift-stats"
                              color="primary"
                            />
                          }
                          label="Utilisations des quarts de travail"
                        /> 
                        <IconButton color="primary" aria-label="add shift" component="span" onClick={handleAddNewShft}>
                        <AddCircleOutlineIcon />
                        </IconButton>
                      </Grid>
                      <Grid item >
                        <TableContainer >
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell>De</TableCell>
                                <TableCell>À</TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                            {settings.shifts.map((shift) =>(
                              <TableRow key={shift._id}>
                                <TableCell>
                                  <FormControl>
                                  <Input value={shift.from} name={shift._id} onChange={(e) => handleShiftChange(shift, "from", e)}  inputComponent={Hours24MaskCustom} />
                                  </FormControl>
                               </TableCell>
                                <TableCell>
                                <FormControl>
                                  <Input value={shift.to} name={shift._id} onChange={(e) => handleShiftChange(shift, "to", e)} inputComponent={Hours24MaskCustom} />
                                  </FormControl>
                                </TableCell>
                                <TableCell>
                                  <IconButton aria-label="delete" size="small" onClick={() => handleDeleteShift(shift)}>
                                      <DeleteIcon />
                                  </IconButton >
                                </TableCell>
                              </TableRow>
                            ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={4} style={{minWidth: 400}}>
                    <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    >
                      <Grid item xs={4}>
                        <Typography variant="subtitle1" gutterBottom>
                          Secteur de travail
                        </Typography>  
                      </Grid>
                      <Grid item xs={8}>
                        <FormControlLabel
                          classes={{ label: classes.checkBoxFont }}
                          control={
                            <Checkbox
                              size="small"
                              checked={settings.useSectors}
                              onChange={toggleUseSectors}
                              name="use-cleaner-sector-assignment"
                              color="primary"
                            />
                          }
                          label="Utilisations des secteurs de travail"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle1" gutterBottom>
                          Délai de réalisation souhaité 
                        </Typography>  
                      </Grid>
                      <Grid item xs={8}>
                        <FormControl>
                          <Input value={settings.serviceLevel} name="cleaner-service-level" onChange={handleServiceLevelChange}  inputComponent={HoursMinutesSecondsMaskCustom} />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={4} style={{minWidth: 400}}>
                    <AvailableAlgos loading={loadingSettings} allAlgos={settings.algos} value={settings.selectedAlgo} onChange={handleBearerAlgoChange} />
                  </Grid>

                  <Grid item xs={4} style={{minWidth: 400}}>
                    <PropertyList title="Propriétés additionel associer aux nettoyeur"
                      extraProperties={settings.extra}
                      onEdit={(item) => handlePropertyToEdit(item)}
                      onDelete={(item) => handlePropertyDelete(item)}
                      onReorder={(reorderedList) => handlePropListReorder(reorderedList)}
                      loading={loadingSettings} />
                  </Grid>
                  <Grid item xs={4} style={{minWidth: 400}}>
                    <PropertyEditor
                      property={selectedProperty}
                      onChange={(item) => handlePropertyChange(item)} />
                  </Grid>

                  <Grid item xs={4} style={{minWidth: 400}}>

                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      spacing={3}
                    >
                      <Grid item>
                        <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={handleNewProperty}>
                          Nouvelle propriétée
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary" disabled={!settingsModified} onClick={handledSaveSettings}>
                          Sauvegarder
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper >
  );
}
