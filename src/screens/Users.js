import React, { useState, useEffect, Component, useRef,createRef } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import UserAccountStatus from "../components/UserAccountStatus"
import LinearProgress from '@material-ui/core/LinearProgress';
import * as AR from '../components/AccessRights'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import StatusProgress from '../components/StatusProgress'
import ConfirmDialog from "../components/ConfirmDialog"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = theme => ({
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
    backgroundColor: "black"
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
  rolesRable: {
    minWidth: 300,
    maxWidth: 300,
    maxHeight: 300,
  },
  checkBoxFont: {
    fontSize: 14,
  },
});

function UserAccountsTable(props) {
  const classes = makeStyles(useStyles)();

  let allUserRows = null;
  if(!props.loading) {
    allUserRows = props.userAccounts.map((row) => (
      <TableRow key={row._id}>
        <TableCell component="th" scope="row" className={classes.iconTableCell}>
          <UserAccountStatus account={row} />
        </TableCell>
        <TableCell >{row.firstName + ' ' + row.lastName}</TableCell>
        <TableCell >{row.role.label}</TableCell>
        <TableCell >{row.email}</TableCell>
        <TableCell >{row.phone}</TableCell>
        <TableCell className="iconTableCell">
          <IconButton aria-label="edit" size="small" onClick={() => props.onSelectedAccountForEdit(row)} >
            <EditIcon />
          </IconButton >
        </TableCell>
        <TableCell className={classes.iconTableCell}>
          <IconButton aria-label="delete" size="small"  onClick={() => props.onDeleteAccount(row)}>
            <DeleteIcon />
          </IconButton >
        </TableCell>
      </TableRow>
    ));
  } else {
    allUserRows = <TableRow><TableCell colSpan={7} ><LinearProgress /></TableCell></TableRow>
  }

  return (
    <Paper>
    <TableContainer className={classes.tableContainer} size="small">
      <Table className={classes.table} size="small" aria-label="caption table" height="100%">
        {/* <caption>A basic table example with a caption</caption> */}
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}></TableCell>
            <TableCell className={classes.tableHeaderCell} >Nom</TableCell>
            <TableCell className={classes.tableHeaderCell} >Role</TableCell>
            <TableCell className={classes.tableHeaderCell} >Courriel</TableCell>
            <TableCell className={classes.tableHeaderCell} >Cellulaire</TableCell>
            <TableCell className={classes.tableHeaderCell}  ></TableCell>
            <TableCell className={classes.tableHeaderCell}  ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allUserRows}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}

function RolesTable(props) {
  const classes = makeStyles(useStyles)();
  let allRolesRows = null;
  if(!props.loading) {
    allRolesRows = props.roles.map((row) => (
      <TableRow key={row._id}>
        <TableCell >{row.label}</TableCell>
        <TableCell className={classes.iconTableCell}>
          <IconButton aria-label="edit role" size="small" onClick={() => props.onSelectedRoleForEdit(row)}>
            <EditIcon  />
          </IconButton >
        </TableCell>
        <TableCell className={classes.iconTableCell}>
          {!row.protected?
          <IconButton aria-label="delete role" size="small">
            <DeleteIcon />
          </IconButton >
          :null}
        </TableCell>
      </TableRow>
    ));
  } else {
    allRolesRows = <TableRow><TableCell colSpan={4} width='100%'><LinearProgress /></TableCell></TableRow>
  }
  return (
    <Paper>
    <TableContainer className={classes.rolesRable} size="small">
      <Table className={classes.rolesRable} size="small" aria-label="Roles" height="100%">
        {/* <caption>A basic table example with a caption</caption> */}
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell} width='200'>Role</TableCell>
            <TableCell className={classes.tableHeaderCell}  width='30'></TableCell>
            <TableCell className={classes.tableHeaderCell}  width='30'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allRolesRows}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}

function RoleDetails(props) {
  const classes = makeStyles(useStyles)();
  const [isModified, setModified] = useState(false);
  const [name, setName] = useState(props.role.name);
  const [label, setLabel] = useState(props.role.label);
  const [settings, setSettings] = useState(props.role.settings.options);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  useEffect(() => {
    setModified(false);
    setName(props.role.name);
    setLabel(props.role.label);
    setSettings(props.role.settings.options);
  }, [props]);

  const onNameChangeHandler = (event) => {
    setLabel(event.target.value);
    setModified(true);
  }
  const handleSaveRoleSettingsChange = (event) => {
    axios.put("/projetkhiron/roles/options", {
      name: name,
      label:label,
      options: settings,
    })
    .then((response) => {
      if (response.status === 200) {
        setAlertMessage("Sauvegarder");
        setAlertType("success");
        setOpenAlert(true);
        setModified(false);
      }
    }).catch(error => {
      setAlertMessage(JSON.stringify(error));
      setAlertType("error");
      setOpenAlert(true);
      //console.log("error" + error);
    }).finally(() => {
      
    });
  }
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const handleRoleSettingChange = (event) => {
    switch (event.target.name) {
      case 'ROLE_SETTINGS_MANAGE_ACCOUNTS':
        setSettings((event.target.checked) ? (settings | AR.ROLE_SETTINGS_MANAGE_ACCOUNTS) : (settings & ~AR.ROLE_SETTINGS_MANAGE_ACCOUNTS));
        break;
      case 'ROLE_SETTINGS_GEO_FENCED':
        setSettings((event.target.checked) ? (settings | AR.ROLE_SETTINGS_GEO_FENCED) : (settings & ~AR.ROLE_SETTINGS_GEO_FENCED));
        break;

      case 'MODULE_BEDS_VIEW':
        setSettings((event.target.checked) ? (settings | AR.MODULE_BEDS_VIEW) : (settings & ~AR.MODULE_BEDS_VIEW));
        break;
      case 'MODULE_BEDS_UPDATE':
        setSettings((event.target.checked) ? (settings | AR.MODULE_BEDS_UPDATE) : (settings & ~AR.MODULE_BEDS_UPDATE));
        break;
      case 'MODULE_BEDS_CONFIG_FLOOR':
        setSettings((event.target.checked) ? (settings | AR.MODULE_BEDS_CONFIG_FLOOR) : (settings & ~AR.MODULE_BEDS_CONFIG_FLOOR));
        break;
      case 'MODULE_BEDS_CONFIG_BED':
        setSettings((event.target.checked) ? (settings | AR.MODULE_BEDS_CONFIG_BED) : (settings & ~AR.MODULE_BEDS_CONFIG_BED));
        break;

      case 'MODULE_BEARER_VIEW':
        setSettings((event.target.checked) ? (settings | AR.MODULE_BEARER_VIEW) : (settings & ~AR.MODULE_BEARER_VIEW));
        break;
      case 'MODULE_BEARER_UPDATE':
        setSettings((event.target.checked) ? (settings | AR.MODULE_BEARER_UPDATE) : (settings & ~AR.MODULE_BEARER_UPDATE));
        break;
      case 'MODULE_BEARER_CONFIG':
        setSettings((event.target.checked) ? (settings | AR.MODULE_BEARER_CONFIG) : (settings & ~AR.MODULE_BEARER_CONFIG));
        break;
      case 'MODULE_BEARER_NEW_REQUEST':
        setSettings((event.target.checked) ? (settings | AR.MODULE_BEARER_NEW_REQUEST) : (settings & ~AR.MODULE_BEARER_NEW_REQUEST));
        break;
        

      case 'MODULE_CLEANER_VIEW':
        setSettings((event.target.checked) ? (settings | AR.MODULE_CLEANER_VIEW) : (settings & ~AR.MODULE_CLEANER_VIEW));
        break;
      case 'MODULE_CLEANER_UPDATE':
        setSettings((event.target.checked) ? (settings | AR.MODULE_CLEANER_UPDATE) : (settings & ~AR.MODULE_CLEANER_UPDATE));
        break;
      case 'MODULE_CLEANER_CONFIG':
        setSettings((event.target.checked) ? (settings | AR.MODULE_CLEANER_CONFIG) : (settings & ~AR.MODULE_CLEANER_CONFIG));
        break;
      case 'MODULE_CLEANER_NEW_REQUEST':
        setSettings((event.target.checked) ? (settings | AR.MODULE_CLEANER_NEW_REQUEST) : (settings & ~AR.MODULE_CLEANER_NEW_REQUEST));
        break;
        
      case 'ROLE_MOBILE_SILENCE_NOTIFICATIONS':
        setSettings((event.target.checked) ? (settings | AR.ROLE_MOBILE_SILENCE_NOTIFICATIONS) : (settings & ~AR.ROLE_MOBILE_SILENCE_NOTIFICATIONS));
        break;
      case 'ROLE_MOBILE_HIDE_REQUESTS':
        setSettings((event.target.checked) ? (settings | AR.ROLE_MOBILE_HIDE_REQUESTS) : (settings & ~AR.ROLE_MOBILE_HIDE_REQUESTS));
        break;   
      case 'ROLE_MOBILE_OOS_STATS':
        setSettings((event.target.checked) ? (settings | AR.ROLE_MOBILE_OOS_STATS) : (settings & ~AR.ROLE_MOBILE_OOS_STATS));
        break;  
      case 'ROLE_MOBILE_ADJUST_SERVICE_LEVEL':
        setSettings((event.target.checked) ? (settings | AR.ROLE_MOBILE_ADJUST_SERVICE_LEVEL) : (settings & ~AR.ROLE_MOBILE_ADJUST_SERVICE_LEVEL));
        break;  
      default:
        break;
    }
    setModified(true);
  };

  return (
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={3}>
        <React.Fragment>
          <Grid item xs={4}>
            <TextField id="edit-role-name" label="Identifiant" value={label} onChange={onNameChangeHandler} style={{ width: '100%' }} />
          </Grid>
        </React.Fragment>
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <React.Fragment>
          <Grid item xs={6}>
            <Paper className={classes.rolePropertySections}>
              <Typography variant="subtitle1">
                Administration
              </Typography>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.ROLE_SETTINGS_MANAGE_ACCOUNTS) === AR.ROLE_SETTINGS_MANAGE_ACCOUNTS)}
                    onChange={handleRoleSettingChange}
                    name="ROLE_SETTINGS_MANAGE_ACCOUNTS"
                    color="primary"
                  />
                }
                label="Gestion des comptes utilisateurs"
              />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.rolePropertySections}>
              <Typography variant="subtitle1">
                Application Mobile
              </Typography>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.ROLE_SETTINGS_GEO_FENCED) === AR.ROLE_SETTINGS_GEO_FENCED)}
                    onChange={handleRoleSettingChange}
                    name="ROLE_SETTINGS_GEO_FENCED"
                    color="primary"
                  />
                }
                label="Accès diponible seulement dans le périmètre."
              />
               <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.ROLE_MOBILE_SILENCE_NOTIFICATIONS) === AR.ROLE_MOBILE_SILENCE_NOTIFICATIONS)}
                    onChange={handleRoleSettingChange}
                    name="ROLE_MOBILE_SILENCE_NOTIFICATIONS"
                    color="primary"
                  />
                }
                label="Taire les notifications."
              />
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.ROLE_MOBILE_HIDE_REQUESTS) === AR.ROLE_MOBILE_HIDE_REQUESTS)}
                    onChange={handleRoleSettingChange}
                    name="ROLE_MOBILE_HIDE_REQUESTS"
                    color="primary"
                  />
                }
                label="Masquer les demandes."
              />
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.ROLE_MOBILE_OOS_STATS) === AR.ROLE_MOBILE_OOS_STATS)}
                    onChange={handleRoleSettingChange}
                    name="ROLE_MOBILE_OOS_STATS"
                    color="primary"
                  />
                }
                label="Visualiser les statistiques des demandes hors service"
              />
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.ROLE_MOBILE_ADJUST_SERVICE_LEVEL) === AR.ROLE_MOBILE_ADJUST_SERVICE_LEVEL)}
                    onChange={handleRoleSettingChange}
                    name="ROLE_MOBILE_ADJUST_SERVICE_LEVEL"
                    color="primary"
                  />
                }
                label="Ajuster les niveaux de services"
              />
            </Paper>
          </Grid>
        </React.Fragment>
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <React.Fragment>
          <Grid item xs={4}>
            <Paper className={classes.rolePropertySections}>
              <Typography variant="subtitle1">
                Module Lits
              </Typography>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.MODULE_BEDS_VIEW) === AR.MODULE_BEDS_VIEW)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_BEDS_VIEW"
                    color="primary"
                  />
                }
                label="Visualiser l'état des lits."
              />
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.MODULE_BEDS_UPDATE) === AR.MODULE_BEDS_UPDATE)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_BEDS_UPDATE"
                    color="primary"
                  />
                }
                label="Modifier l'état des lits."
              />
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.MODULE_BEDS_CONFIG_FLOOR) === AR.MODULE_BEDS_CONFIG_FLOOR)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_BEDS_CONFIG_FLOOR"
                    color="primary"
                  />
                }
                label="Configurer les lits sur les étages."
              />
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.MODULE_BEDS_CONFIG_BED) === AR.MODULE_BEDS_CONFIG_BED)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_BEDS_CONFIG_BED"
                    color="primary"
                  />
                }
                label="Configurer l'informatino des lits."
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.rolePropertySection}>
              <Typography variant="subtitle1">
                Module Brancarderie
              </Typography>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.MODULE_BEARER_VIEW) === AR.MODULE_BEARER_VIEW)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_BEARER_VIEW"
                    color="primary"
                  />
                }
                label="Visualiser l'état des demandes."
              />
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.MODULE_BEARER_UPDATE) === AR.MODULE_BEARER_UPDATE)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_BEARER_UPDATE"
                    color="primary"
                  />
                }
                label="Modifier l'état des demandes."
              />
              {/* <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.MODULE_BEARER_CONFIG) === AR.MODULE_BEARER_CONFIG)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_BEARER_CONFIG"
                    color="primary"
                  />
                }
                label="Configuration des équipes."
              /> */}
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.MODULE_BEARER_NEW_REQUEST) === AR.MODULE_BEARER_NEW_REQUEST)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_BEARER_NEW_REQUEST"
                    color="primary"
                  />
                }
                label="Formuler de nouvelle demande de brancarderie."
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.rolePropertySections}>
              <Typography variant="subtitle1">
                Module Nettoyage et salubrité
              </Typography>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.MODULE_CLEANER_VIEW) === AR.MODULE_CLEANER_VIEW)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_CLEANER_VIEW"
                    color="primary"
                  />
                }
                label="Visualiser l'état des demandes."
              />
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.MODULE_CLEANER_UPDATE) === AR.MODULE_CLEANER_UPDATE)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_CLEANER_UPDATE"
                    color="primary"
                  />
                }
                label="Modifier l'état des demandes."
              />
              {/* <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.MODULE_CLEANER_CONFIG) === AR.MODULE_CLEANER_CONFIG)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_CLEANER_CONFIG"
                    color="primary"
                  />
                }
                label="Configuration des équipes."
              /> */}
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & AR.MODULE_CLEANER_NEW_REQUEST) === AR.MODULE_CLEANER_NEW_REQUEST)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_CLEANER_NEW_REQUEST"
                    color="primary"
                  />
                }
                label="Formuler de nouvelle demande de nettoyage."
              />
            </Paper>
          </Grid>
        </React.Fragment>
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <React.Fragment>
          <Grid item xs={4}>
              <Button variant="contained" color="primary" disabled={!isModified} onClick={handleSaveRoleSettingsChange}>
                Sauvegarder
                </Button>
          </Grid>
          <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={alertType}>
              {alertMessage}
            </Alert>
          </Snackbar>
        </React.Fragment>
      </Grid>
    </Grid>);
}

function UserAccountDetails(props) {
  const classes = makeStyles(useStyles)();

  const [isModified, setModified] = useState(false);
  const [isSaving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState(props.account.firstName);
  const [lastName, setLastName] = useState(props.account.lastName);
  const [role, setRole] = useState(props.account.role.parent);
  const [email, setEmail] = useState(props.account.email);
  const [phone, setPhone] = useState(props.account.phone);
  const [tmpPwd, setTmpPwd] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  
  const statusProgressRef = useRef();
  const [statusTitle, setStatusTitle] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const [missingRequiredDetails, setMissingRequiredDetails] = useState([]);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    setModified(false);
    setFirstName(props.account.firstName);
    setLastName(props.account.lastName);
    setRole(props.account.role.parent);
    setEmail(props.account.email);
    setPhone(props.account.phone);
    if(props.account._id === '-1') {
      setNewAccount(true);
    }else{
      setNewAccount(false);
    }
    setTmpPwd('');
    setMissingRequiredDetails([]);
  }, [props]);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setModified(true);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setModified(true);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
    setModified(true);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setModified(true);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setModified(true);
  };
  const handleTmpPwdChange = (event) => {
    setTmpPwd(event.target.value);
    setModified(true);
  };
  

  const handleAccountSave = (event) => {
    //console.log("[Users] handleAccountSave");
    var scanMissingRequiredDetails = [];
    if(firstName === undefined || firstName === null || firstName.trim().length === 0)
      scanMissingRequiredDetails.push("user-edit-first-name");
    if(lastName === undefined || lastName === null || lastName.trim().length === 0)
      scanMissingRequiredDetails.push("user-edit-last-name");
    if(role === undefined || role === null || role.trim().length === 0)  
      scanMissingRequiredDetails.push("user-edit-role");
    if(email === undefined || email === null || email.trim().length === 0)    
      scanMissingRequiredDetails.push("user-edit-email");
    if(newAccount && (tmpPwd === undefined || tmpPwd === null || tmpPwd.trim().length === 0))    
      scanMissingRequiredDetails.push("user-edit-temp-pwd");

    setMissingRequiredDetails([...scanMissingRequiredDetails]);
    if(scanMissingRequiredDetails.length > 0) {
      setAlertMessage("Valeur obligatoire manquante");
      setAlertType("error");
      setOpenAlert(true);
      return;
    }

    setSaving(true);

    setStatusTitle("Sauvegarde en court");
    if(!newAccount)
      setStatusMessage("Sauvegarde des modification au compte de " + firstName);
    else
      setStatusMessage("Ajout du compte de " + firstName);
    statusProgressRef.current.showStatus();

    var selectedRole = props.roles.find(r => r._id === role);
    axios.put("/projetkhiron/account", {
      _id: props.account._id,
      firstName:firstName,
      lastName:lastName,
      email:email,
      phone:phone,
      role: {parent:selectedRole._id, name:selectedRole.name, label:selectedRole.label},
      tmpPwd:tmpPwd,
    })
    .then((response) => {
      //console.log(response);
      if (response.status === 200) {
        if(!newAccount)
          setAlertMessage("Modification au compte sauvegarder");
        else
          setAlertMessage("Nouveau compte ajouter");

        setAlertType("success");
        setOpenAlert(true);

        if(props.onChange){
          props.onChange();
        }
      }
    }).catch(error => {
      setAlertMessage(JSON.stringify(error))
      setAlertType("error");
      setOpenAlert(true);
      // console.log("ERROR");
       console.log(error.message);
    }).finally(() => {
      setSaving(false);
      statusProgressRef.current.hideStatus();
    });
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (<Paper>
    <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleCloseAlert}>
      <Alert onClose={handleCloseAlert} severity={alertType}>
        {alertMessage}
      </Alert>
    </Snackbar>
    <StatusProgress ref={statusProgressRef} title={statusTitle} message={statusMessage} />
    <TableContainer><Table className={classes.userDetailSection} size="small" aria-label="caption table">
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableHeaderCell}>Details de compte utilisateur</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell className={classes.userDetailCell}>
          <TextField id="user-edit-first-name" label="Prénom" value={firstName} onChange={handleFirstNameChange} required error={(missingRequiredDetails.findIndex(o => o === "user-edit-first-name") !== -1)?true:false} style={{ width: '100%' }} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.userDetailCell}>
          <TextField id="user-edit-last-name" label="Nom de famille" value={lastName} onChange={handleLastNameChange} required error={(missingRequiredDetails.findIndex(o => o === "user-edit-last-name") !== -1)?true:false}  style={{ width: '100%' }} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.userDetailCell}>
          <TextField
            id="user-edit-role"
            select
            label="Role"
            value={role}
            onChange={handleRoleChange}
            style={{ width: '50%' }}
            required
            error={(missingRequiredDetails.findIndex(o => o === "user-edit-role") !== -1)?true:false} 
          >
            {props.roles.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.userDetailCell}>
          <TextField id="user-edit-email" label="Courriel" value={email} onChange={handleEmailChange}  required error={(missingRequiredDetails.findIndex(o => o === "user-edit-email") !== -1)?true:false}  style={{ width: '100%' }} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.userDetailCell}>
          <TextField id="user-edit-cell" label="Cellulaire" value={phone} onChange={handlePhoneChange}  />
        </TableCell>
      </TableRow>
      {newAccount?
      <TableRow>
        <TableCell className={classes.userDetailCell}>
          <TextField id="user-edit-temp-pwd" label="Mot de passe temporaire" required value={tmpPwd} onChange={handleTmpPwdChange} error={(missingRequiredDetails.findIndex(o => o === "user-edit-email") !== -1)?true:false} style={{ width: '100%' }} />
        </TableCell>
      </TableRow>:null}
      <TableRow>
        <TableCell align='right' >
            <Button variant="contained" disabled={!isModified || isSaving} color="primary" onClick={handleAccountSave}>
              Sauvegarder
            </Button>
        </TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell className={classes.userDetailCell}>
          <TextField id="user-edit-temp-pwd" label="Mot de passe temporaire" style={{ width: '100%' }} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' >
          {props.account._id ?
            <Button variant="contained" color="primary"  >
              Appliquer
            </Button>
            :
            <Button variant="contained" color="primary" disabled >
              Appliquer
            </Button>
          }
        </TableCell>
      </TableRow> */}
    </TableBody>
  </Table></TableContainer></Paper>
  );
}

class Users extends Component {
  constructor(props) {
    super(props);
    //this.classes = makeUseOfStyles();

    this.confirmDlgRef = createRef();
    this.statusProgressRef = createRef();
  }
  
  state = {
    userFilter: '',
    allAccounts : [],
    allRoles : [],
    filteredUserAccounts: [],
    selectedAccount: null,
    selectedAccountForDeletion: null,
    selectedRole: null,
    loadingAccounts:true,
    loadingRoles:true,

    openAlert:false,
    alertMessage:'',
    alertType:'',

    statusTitle:'',
    statusMessage:'',
  };

  componentDidMount () {
    axios.get("/projetkhiron/roles")
    .then((response) => {
      if(response.status === 200) {
        this.setState({allRoles: response.data, loadingRoles:false});
      }
    }, (error) => {
      console.log(error);
    });

    this.loadAccounts();
  }

  loadAccounts() {
    //("[Users] loadingAccounts");
    this.setState({ loadingAccounts:true});
    axios.get("/projetkhiron/accounts")
    .then((response2) => {
      if(response2.status === 200) {
        this.setState({allAccounts: response2.data, filteredUserAccounts: response2.data, selectedAccount: null});
      }
    }).catch(error => {
      console.log("[Users] Failed loading accounts. " + error.message);
    }).finally(() => {
      this.setState({ loadingAccounts:false});
    });
  }

  handleFilterChange(event) {

    this.setState({userFilter: event.target.value})
    
    if(event.target.value && event.target.value.length > 0) {
      var accounts = this.state.allAccounts.filter((item) => { return (item.firstName.toLowerCase().includes(event.target.value.toLowerCase()) || item.lastName.toLowerCase().includes(event.target.value.toLowerCase())) });
      this.setState({filteredUserAccounts:accounts});
    } else {
      this.setState({filteredUserAccounts: this.state.allAccounts});
    }
  }

  handleSetAccountToEdit(account) {
    this.setState({selectedAccount: account});
  }

  handleDeleteAccount(account) {
    console.log("[Users] handleDeleteAccount");
    this.setState({selectedAccountForDeletion: account});
    this.confirmDlgRef.current.showDialog();
  }

  deleteSelectedAccount() {
    this.setState({statusTitle:'Supression de compte',statusMessage:"Supression de compte en cours"});
    this.statusProgressRef.current.showStatus();

    axios.delete("/projetkhiron/account", {
      params: {
        _id: this.state.selectedAccountForDeletion._id,
        cognitoID: this.state.selectedAccountForDeletion.cognitoID
      }
    })
    .then((response) => {
      if (response.status === 200) {
        this.setState({alertMessage:"Compte supprimer", alertType:"success", openAlert: true});
        this.loadAccounts();
      }
    }).catch(error => {
      //console.log(error;
      this.setState({alertMessage:error.message, alertType:"error", openAlert: true});
      // console.log("ERROR");
      //console.log(error.message);
    }).finally(() => {
      this.statusProgressRef.current.hideStatus();
    });
  }
  handleSetRoleToEdit(role) {
    this.setState({selectedRole: role});
  }

  handleCreateNewUser() {
    this.setState({selectedAccount: {_id:'-1', firstName:'', lastName:'', role:{parent:''}, email:'', extra:[], phone:'' }});
  }

  handleCloseAlert(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({openAlert: false});
  }
  render () {
  const { classes } = this.props;
  return (
    <Paper elevation={0} style={{ height: "100%" }}>
      <ConfirmDialog 
          ref={this.confirmDlgRef}
          title="Supprimer compte" 
          message="Etes-vous certain de vouloir supprimer ce compte?" 
          cancelLabel="Annuler"
          confirmLabel="Supprimer"
          onConfirm={this.deleteSelectedAccount.bind(this)}
          />
      <StatusProgress ref={this.statusProgressRef} title={this.state.statusTitle} message={this.state.statusMessage} />
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} width='100%'>
                <TableContainer>
                  <Table style={{ border: 'none' }} size="small">
                    <TableBody style={{ border: 'none' }}>
                      <TableRow style={{ borderBottom: 'none' }}>
                        <TableCell className={classes.pageHeader} style={{ borderBottom: 'none' }}>
                          Gestion des comptes utilisateurs
                    </TableCell>
                        <TableCell style={{ borderBottom: 'none' }}>
                          <TextField id="input-with-icon-grid" className={classes.searchTextField} label="Recherche" onChange={this.handleFilterChange.bind(this)} value={this.state.userFilter}
                            InputProps={{
                              endAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment>,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right" style={{ borderBottom: 'none' }}>
                          <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={this.handleCreateNewUser.bind(this)}>
                            Nouvel utilisateur
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.mainUserTableCell} style={{ verticalAlign: 'top' }} >
                <UserAccountsTable loading={this.state.loadingAccounts} userAccounts={this.state.filteredUserAccounts} roles={this.state.allRoles} onSelectedAccountForEdit={this.handleSetAccountToEdit.bind(this)} onDeleteAccount={this.handleDeleteAccount.bind(this)}/>
              </TableCell>
              <TableCell className={classes.mainUserTableCell} style={{ verticalAlign: 'top' }} >
                {this.state.selectedAccount ?
                  <UserAccountDetails account={this.state.selectedAccount} roles={this.state.allRoles} onChange={this.loadAccounts.bind(this)}/>
                  :
                  <Paper>
                  <TableContainer>
                    <Table className={classes.userDetailSection} size="small" aria-label="caption table">
                    <TableHead>
                      <TableRow>
                        <TableCell className={classes.tableHeaderCell}>Details de compte utilisateur</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.userDetailCell} >
                          <TextField id="user-edit-first-name" label="Prénom" style={{ width: '100%' }} disabled />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.userDetailCell}>
                          <TextField id="user-edit-last-name" label="Nom de famille" disabled style={{ width: '100%' }} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.userDetailCell}>
                          <TextField
                            id="user-edit-role"
                            select
                            label="Role"
                            value=""
                            disabled
                            style={{ width: '50%' }}
                          >
                            {this.state.allRoles.map((option) => (
                              <MenuItem key={option._id} value={option._id}>
                                {option.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.userDetailCell}>
                          <TextField id="user-edit-email" label="Courriel" disabled style={{ width: '100%' }} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.userDetailCell}>
                          <TextField id="standard-required" label="Cellulaire" disabled />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align='right' >
                          <Button variant="contained" color="primary" disabled>
                            Sauvegarder
                          </Button>
                        </TableCell>
                      </TableRow>
                      {/* <TableRow>
                        <TableCell className={classes.userDetailCell}>
                          <TextField id="user-edit-temp-pwd" label="Mot de passe temporaire" disabled style={{ width: '100%' }} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell align='right' >
                          <Button variant="contained" color="primary" disabled >
                            Appliquer
                           </Button>
                        </TableCell>
                      </TableRow> */}
                    </TableBody>
                  </Table></TableContainer></Paper>
                }
              </TableCell>

            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.pageHeader} style={{ borderBottom: 'none' }}>
                        Gestion des roles
                      </TableCell>
                      <TableCell align="right" style={{ borderBottom: 'none' }}>
                        <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>
                          Nouveau role
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ borderBottom: 'none', verticalAlign: 'top' }} className={classes.rolesRable}>
                        <RolesTable loading={this.state.loadingRoles} roles={this.state.allRoles} onSelectedRoleForEdit={this.handleSetRoleToEdit.bind(this)} />
                      </TableCell>
                      <TableCell style={{ borderBottom: 'none', verticalAlign: 'top' }}>
                        {this.state.selectedRole ?
                          <RoleDetails role={this.state.selectedRole} />
                          :
                          <Grid container spacing={1}>
                            <Grid container item xs={12} spacing={3}>
                              <React.Fragment>
                                <Grid item xs={4}>
                                  <TextField id="edit-role-name" label="Identifiant" disabled style={{ width: '100%' }} />
                                </Grid>
                              </React.Fragment>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                              <React.Fragment>
                                <Grid item xs={6}>
                                  <Paper className={classes.rolePropertySections}>
                                    <Typography variant="subtitle1">
                                      Administration
              </Typography>
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="ROLE_SETTINGS_MANAGE_ACCOUNTS"
                                          color="primary"
                                        />
                                      }
                                      label="Gestion des comptes utilisateurs"
                                    />
                                  </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                  <Paper className="rolePropertySections">
                                    <Typography variant="subtitle1">
                                      Application Mobile
                                    </Typography>
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="ROLE_SETTINGS_GEO_FENCED"
                                          color="primary"
                                        />
                                      }
                                      label="Accès disponible seulement dans le périmètre."
                                    />
                                  <FormControlLabel
                                    classes={{ label: classes.checkBoxFont }}
                                    control={
                                      <Checkbox
                                        size="small"
                                        disabled
                                        name="ROLE_MOBILE_SILENCE_NOTIFICATIONS"
                                        color="primary"
                                      />
                                    }
                                    label="Taire les notifications."
                                  />
                                  <FormControlLabel
                                    classes={{ label: classes.checkBoxFont }}
                                    control={
                                      <Checkbox
                                        size="small"
                                        disabled
                                        name="ROLE_MOBILE_HIDE_REQUESTS"
                                        color="primary"
                                      />
                                    }
                                    label="Masquer les demandes."
                                  />
                                  <FormControlLabel
                                    classes={{ label: classes.checkBoxFont }}
                                    control={
                                      <Checkbox
                                        size="small"
                                        disabled
                                        name="ROLE_MOBILE_OOS_STATS"
                                        color="primary"
                                      />
                                    }
                                    label="Visualiser les statistiques des demandes hors service"
                                  />
                                  <FormControlLabel
                                    classes={{ label: classes.checkBoxFont }}
                                    control={
                                      <Checkbox
                                        size="small"
                                        disabled
                                        name="ROLE_MOBILE_ADJUST_SERVICE_LEVEL"
                                        color="primary"
                                      />
                                    }
                                    label="Ajuster les niveaux de services"
                                  />
                                  </Paper>
                                </Grid>
                              </React.Fragment>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                              <React.Fragment>
                                <Grid item xs={4}>
                                  <Paper className={classes.rolePropertySections}>
                                    <Typography variant="subtitle1">
                                      Module Lits
              </Typography>
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEDS_VIEW"
                                          color="primary"
                                        />
                                      }
                                      label="Visualiser l'état des lits."
                                    />
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEDS_UPDATE"
                                          color="primary"
                                        />
                                      }
                                      label="Modifier l'état des lits."
                                    />
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEDS_CONFIG_FLOOR"
                                          color="primary"
                                        />
                                      }
                                      label="Configurer les lits sur les étages."
                                    />
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEDS_CONFIG_BED"
                                          color="primary"
                                        />
                                      }
                                      label="Configurer l'information des lits."
                                    />
                                  </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                  <Paper className={classes.rolePropertySections}>
                                    <Typography variant="subtitle1">
                                      Module Brancarderie
              </Typography>
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEARER_VIEW"
                                          color="primary"
                                        />
                                      }
                                      label="Visualiser l'état des demandes."
                                    />
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEARER_UPDATE"
                                          color="primary"
                                        />
                                      }
                                      label="Modifier l'état des demandes."
                                    />
                                    {/* <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEARER_CONFIG"
                                          color="primary"
                                        />
                                      }
                                      label="Configuration des équipes."
                                    /> */}
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_BEARER_NEW_REQUEST"
                                          color="primary"
                                        />
                                      }
                                      label="Formuler de nouvelle demande de brancarderie."
                                    />
                                  </Paper>
                                </Grid>
                                <Grid item xs={4}>
                                  <Paper className={classes.rolePropertySections}>
                                    <Typography variant="subtitle1">
                                      Module Nettoyage et salubrité
              </Typography>
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_CLEANER_VIEW"
                                          color="primary"
                                        />
                                      }
                                      label="Visualiser l'état des demandes."
                                    />
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_CLEANER_UPDATE"
                                          color="primary"
                                        />
                                      }
                                      label="Modifier l'état des demandes."
                                    />
                                    {/* <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_CLEANER_CONFIG"
                                          color="primary"
                                        />
                                      }
                                      label="Configuration des équipes."
                                    /> */}
                                    <FormControlLabel
                                      classes={{ label: classes.checkBoxFont }}
                                      control={
                                        <Checkbox
                                          size="small"
                                          disabled
                                          name="MODULE_CLEANER_NEW_REQUEST"
                                          color="primary"
                                        />
                                      }
                                      label="Formuler de nouvelle demande de nettoyage."
                                    />

                                  </Paper>
                                </Grid>
                              </React.Fragment>
                            </Grid>
                            <Grid container item xs={12} spacing={3}>
                              <React.Fragment>
                                <Grid item xs={4}>
                                  <Button variant="contained" color="primary" disabled>
                                    Sauvegarder
                                  </Button>
                                </Grid>
                              </React.Fragment>
                            </Grid>
                          </Grid>
                        }
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={this.state.openAlert} autoHideDuration={1000} onClose={this.handleCloseAlert.bind(this)}>
            <Alert onClose={this.handleCloseAlert.bind(this)} severity={this.state.alertType}>
              {this.state.alertMessage}
            </Alert>
          </Snackbar>
    </Paper>
  );
  }
}

export default withStyles(useStyles)(Users);