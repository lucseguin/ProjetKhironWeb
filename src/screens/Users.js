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
import axios from 'axios';
import UserAccountStatus from "../components/UserAccountStatus"
import LinearProgress from '@material-ui/core/LinearProgress';
import * as AR from '../components/AccessRights'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import StatusProgress from '../components/StatusProgress'
import ConfirmDialog from "../components/ConfirmDialog"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

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
  rolesRable: {
    minWidth: 300,
    maxWidth: 300,
    maxHeight: 300,
    overflowY: 'auto', 
    overflowX: 'hidden'
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
    <Paper >
    <TableContainer className={classes.rolesRable} size="small" >
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{width:1100, maxWidth:1100, height:125, maxHeight:125}}>
          {children}
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function RoleDetails(props) {
  // const classes = makeStyles(useStyles)();
  // const theme = useTheme();
  const [isModified, setModified] = useState(false);
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [settings, setSettings] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [selectedRoleSettingsTab, setSelectedRoleSettingsTab] = useState(0);
  
  useEffect(() => {
    setModified(false);
    if(props.role) {
      setName(props.role.name);
      setLabel(props.role.label);
      setSettings(props.role.settings.options);
    }
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

  const handleRoleSettingOptionsChange = (newValue) => {
    setSettings(newValue);
    setModified(true);
  }

  const handleSettingsTabChange = (event, newValue) => {
    setSelectedRoleSettingsTab(newValue);
  };

  return (
    <>
    <Snackbar open={openAlert} autoHideDuration={1000} onClose={handleCloseAlert}>
      <Alert onClose={handleCloseAlert} severity={alertType}>
        {alertMessage}
      </Alert>
    </Snackbar>
    <Grid container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          style={{ padding: 1, border:1 }}
          spacing={1} >
      <Grid container 
            justify="flex-start"
            alignItems="flex-start"
           >
          <TextField id="edit-role-name" label="Identifiant" disabled={!props.role} value={label} onChange={onNameChangeHandler} style={{ width: 300 }} />
      </Grid>
      <Grid item xs={12}  >
        <Paper square>
        <AppBar position="static" color="inherit">
          <Tabs
            value={selectedRoleSettingsTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleSettingsTabChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Admin" {...a11yProps(0)} />
            <Tab label="Lits" {...a11yProps(1)} disabled={!props.user.licence.bed_module}/>
            <Tab label="Brancarderie" {...a11yProps(2)} disabled={!props.user.licence.bearer_module}/>
            <Tab label="Nettoyage" {...a11yProps(3)} disabled={!props.user.licence.cleaner_module}/>
            <Tab label="Mobile" {...a11yProps(4)} disabled={!props.user.licence.cleaner_module && !props.user.licence.bearer_module}/>
            <Tab label="Visiteur" {...a11yProps(5)}  disabled={!props.user.licence.visitor_module}/>
            <Tab label="Journal" {...a11yProps(6)}/>
          </Tabs>
          </AppBar>
          <TabPanel value={selectedRoleSettingsTab} index={0} >
            <AdminRoleSetting options={settings} onChange={handleRoleSettingOptionsChange}/>
          </TabPanel>
          <TabPanel value={selectedRoleSettingsTab} index={1}>
            <BedsRoleSetting options={settings} onChange={handleRoleSettingOptionsChange}/>
          </TabPanel>  
          <TabPanel value={selectedRoleSettingsTab} index={2} >
            <BearerRoleSetting options={settings} onChange={handleRoleSettingOptionsChange}/>
          </TabPanel>
          <TabPanel value={selectedRoleSettingsTab} index={3} >
            <CleanerRoleSetting options={settings} onChange={handleRoleSettingOptionsChange}/>
            </TabPanel>
          <TabPanel value={selectedRoleSettingsTab} index={4} >
            <MobileRoleSetting options={settings} onChange={handleRoleSettingOptionsChange}/>
          </TabPanel>
          <TabPanel value={selectedRoleSettingsTab} index={5} >
            <VisitorsRoleSetting options={settings} onChange={handleRoleSettingOptionsChange}/>
          </TabPanel>
          <TabPanel value={selectedRoleSettingsTab} index={6} >
            <JournalRoleSetting options={settings} onChange={handleRoleSettingOptionsChange}/>
          </TabPanel>
        </Paper>
      </Grid>
      <Grid container 
            justify="flex-start"
            alignItems="flex-start">
          <Button variant="contained" color="primary" disabled={!isModified} onClick={handleSaveRoleSettingsChange}>
            Sauvegarder
          </Button>
        </Grid>
    </Grid></>);
}

function AdminRoleSetting(props) {
  const classes = makeStyles(useStyles)();
  const [options, setOptions] = useState(0);
  useEffect(() => {
    if(props.options) {
      setOptions(props.options);
    }
  }, [props]);
  return(
    <Grid container>
      <Grid item xs={4}>
        <FormControlLabel
        classes={{ label: classes.checkBoxFont }}
        control={
          <Checkbox
            size="small"
            checked={ ((options & AR.ROLE_SETTINGS_MANAGE_ACCOUNTS) === AR.ROLE_SETTINGS_MANAGE_ACCOUNTS)}
            onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_SETTINGS_MANAGE_ACCOUNTS) : (options & ~AR.ROLE_SETTINGS_MANAGE_ACCOUNTS)) }
            name="ROLE_SETTINGS_MANAGE_ACCOUNTS"
            color="primary"
            disabled={!props.options}
          />
        }
        label="Gestion des comptes utilisateurs"
      />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
        classes={{ label: classes.checkBoxFont }}
        control={
          <Checkbox
            size="small"
            checked={((options & AR.ROLE_SETTINGS_MANAGE_ROLES) === AR.ROLE_SETTINGS_MANAGE_ROLES)}
            onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_SETTINGS_MANAGE_ROLES) : (options & ~AR.ROLE_SETTINGS_MANAGE_ROLES)) }
            name="ROLE_SETTINGS_MANAGE_ROLES"
            color="primary"
            disabled={!props.options}
          />
        }
        label="Gestion des roles"
      />
      </Grid>
    </Grid>
  );
}

function MobileRoleSetting(props) {
  const classes = makeStyles(useStyles)();
  const [options, setOptions] = useState(0);
  useEffect(() => {
    if(props.options) {
      setOptions(props.options);
    }
  }, [props]);
  return(
    <Grid container>
      <Grid item xs={4}>
      <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.ROLE_SETTINGS_GEO_FENCED) === AR.ROLE_SETTINGS_GEO_FENCED)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_SETTINGS_GEO_FENCED) : (options & ~AR.ROLE_SETTINGS_GEO_FENCED)) }
                    name="ROLE_SETTINGS_GEO_FENCED"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Accès diponible seulement dans le périmètre."
              />
      </Grid>
      <Grid item xs={4}>
               <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.ROLE_MOBILE_SILENCE_NOTIFICATIONS) === AR.ROLE_MOBILE_SILENCE_NOTIFICATIONS)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_MOBILE_SILENCE_NOTIFICATIONS) : (options & ~AR.ROLE_MOBILE_SILENCE_NOTIFICATIONS)) }
                    name="ROLE_MOBILE_SILENCE_NOTIFICATIONS"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Taire les notifications."
              />
      </Grid>
      <Grid item xs={4}>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.ROLE_MOBILE_HIDE_REQUESTS) === AR.ROLE_MOBILE_HIDE_REQUESTS)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_MOBILE_HIDE_REQUESTS) : (options & ~AR.ROLE_MOBILE_HIDE_REQUESTS)) }
                    name="ROLE_MOBILE_HIDE_REQUESTS"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Masquer les demandes."
              />
      </Grid>
      <Grid item xs={4}>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.ROLE_MOBILE_OOS_STATS) === AR.ROLE_MOBILE_OOS_STATS)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_MOBILE_OOS_STATS) : (options & ~AR.ROLE_MOBILE_OOS_STATS)) }
                    name="ROLE_MOBILE_OOS_STATS"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Visualiser les statistiques des demandes hors service"
              />
      </Grid>
      <Grid item xs={4}>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.ROLE_MOBILE_ADJUST_SERVICE_LEVEL) === AR.ROLE_MOBILE_ADJUST_SERVICE_LEVEL)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_MOBILE_ADJUST_SERVICE_LEVEL) : (options & ~AR.ROLE_MOBILE_ADJUST_SERVICE_LEVEL)) }
                    name="ROLE_MOBILE_ADJUST_SERVICE_LEVEL"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Ajuster les niveaux de services"
              />
      </Grid>
    </Grid>
  );
}

function BedsRoleSetting(props) {
  const classes = makeStyles(useStyles)();
  const [options, setOptions] = useState(0);
  useEffect(() => {
    if(props.options) {
      setOptions(props.options);
    }
  }, [props]);
  return(
    <Grid container>
      <Grid item xs={4}>
        <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.MODULE_BEDS_VIEW) === AR.MODULE_BEDS_VIEW)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.MODULE_BEDS_VIEW) : (options & ~AR.MODULE_BEDS_VIEW)) }
                    name="MODULE_BEDS_VIEW"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Visualiser l'état des lits."
              />
      </Grid>
      <Grid item xs={4}>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.MODULE_BEDS_UPDATE) === AR.MODULE_BEDS_UPDATE)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.MODULE_BEDS_UPDATE) : (options & ~AR.MODULE_BEDS_UPDATE)) }
                    name="MODULE_BEDS_UPDATE"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Modifier l'état des lits."
              />
      </Grid>
      <Grid item xs={4}>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.ROLE_CONFIG_FLOOR) === AR.ROLE_CONFIG_FLOOR)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_CONFIG_FLOOR) : (options & ~AR.ROLE_CONFIG_FLOOR)) }
                    name="MODULE_BEDS_CONFIG_FLOOR"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Configurer les lits sur les étages."
              />
      </Grid>
      <Grid item xs={4}>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.MODULE_BEDS_CONFIG_BED) === AR.MODULE_BEDS_CONFIG_BED)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.MODULE_BEDS_CONFIG_BED) : (options & ~AR.MODULE_BEDS_CONFIG_BED)) }
                    name="MODULE_BEDS_CONFIG_BED"
                    disabled={!props.options}
                    color="primary"
                  />
                }
                label="Configurer l'information des lits."
              />
      </Grid>
    </Grid>
  );
}

function BearerRoleSetting(props) {
  const classes = makeStyles(useStyles)();
  const [options, setOptions] = useState(0);
  useEffect(() => {
    if(props.options) {
      setOptions(props.options);
    }
  }, [props]);
  return(
    <Grid container>
      <Grid item xs={4}>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.ROLE_BEARER_VIEW) === AR.ROLE_BEARER_VIEW)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_BEARER_VIEW) : (options & ~AR.ROLE_BEARER_VIEW)) }
                    name="MODULE_BEARER_VIEW"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Visualiser les demandes"
              />
      </Grid>
      <Grid item xs={4}>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.MODULE_BEARER_UPDATE) === AR.MODULE_BEARER_UPDATE)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.MODULE_BEARER_UPDATE) : (options & ~AR.MODULE_BEARER_UPDATE)) }
                    name="MODULE_BEARER_UPDATE"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Modifier l'état des demandes"
              />
      </Grid>
      <Grid item xs={4}>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.ROLE_BEARER_NEW_REQUEST) === AR.ROLE_BEARER_NEW_REQUEST)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_BEARER_NEW_REQUEST) : (options & ~AR.ROLE_BEARER_NEW_REQUEST)) }
                    name="MODULE_BEARER_NEW_REQUEST"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Formuler de nouvelle demande de brancarderie."
              />
      </Grid>
      <Grid item xs={4}>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.ROLE_BEARER_CONFIG) === AR.ROLE_BEARER_CONFIG)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_BEARER_CONFIG) : (options & ~AR.ROLE_BEARER_CONFIG)) }
                    name="MODULE_BEARER_CONFIG"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Configurer le module brancarderie"
              />
      </Grid>
    </Grid>
  );
}

function CleanerRoleSetting(props) {
  const classes = makeStyles(useStyles)();
  const [options, setOptions] = useState(0);
  useEffect(() => {
    if(props.options) {
      setOptions(props.options);
    }
  }, [props]);
  return(
    <Grid container>
      <Grid item xs={4}>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.ROLE_CLEANER_VIEW) === AR.ROLE_CLEANER_VIEW)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_CLEANER_VIEW) : (options & ~AR.ROLE_CLEANER_VIEW)) }
                    name="MODULE_CLEANER_VIEW"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Visualiser les demandes "
              />
      </Grid>
      <Grid item xs={4}>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.MODULE_CLEANER_UPDATE) === AR.MODULE_CLEANER_UPDATE)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.MODULE_CLEANER_UPDATE) : (options & ~AR.MODULE_CLEANER_UPDATE)) }
                    name="MODULE_CLEANER_UPDATE"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Modifier l'état des demandes"
              />
      </Grid>
      <Grid item xs={4}>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.ROLE_CLEANER_NEW_REQUEST) === AR.ROLE_CLEANER_NEW_REQUEST)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_CLEANER_NEW_REQUEST) : (options & ~AR.ROLE_CLEANER_NEW_REQUEST)) }
                    name="MODULE_CLEANER_NEW_REQUEST"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Formuler de nouvelle demande de nettoyage"
              />
      </Grid>
      <Grid item xs={4}>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((options & AR.ROLE_CLEANER_CONFIG) === AR.ROLE_CLEANER_CONFIG)}
                    onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_CLEANER_CONFIG) : (options & ~AR.ROLE_CLEANER_CONFIG)) }
                    name="MODULE_CLEANER_CONFIG"
                    color="primary"
                    disabled={!props.options}
                  />
                }
                label="Configurer le module nettoyage"
              />
      </Grid>
    </Grid>
  );
}

function VisitorsRoleSetting(props) {
  const classes = makeStyles(useStyles)();
  const [options, setOptions] = useState(0);
  useEffect(() => {
    if(props.options) {
      setOptions(props.options);
    }
  }, [props]);
  return(
    <Grid container>
      <Grid item xs={4}>
        <FormControlLabel
        classes={{ label: classes.checkBoxFont }}
        control={
          <Checkbox
            size="small"
            checked={((options & AR.ROLE_VISITOR_VIEW) === AR.ROLE_VISITOR_VIEW)}
            onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_VISITOR_VIEW) : (options & ~AR.ROLE_VISITOR_VIEW)) }
            name="ROLE_VISITOR_VIEW"
            color="primary"
            disabled={!props.options}
          />
        }
        label="Visualiser les enregistrements"
      />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
        classes={{ label: classes.checkBoxFont }}
        control={
          <Checkbox
            size="small"
            checked={((options & AR.ROLE_VISITOR_NEW_REQUEST) === AR.ROLE_VISITOR_NEW_REQUEST)}
            onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_VISITOR_NEW_REQUEST) : (options & ~AR.ROLE_VISITOR_NEW_REQUEST)) }
            name="ROLE_VISITOR_NEW_REQUEST"
            color="primary"
            disabled={!props.options}
          />
        }
        label="Enregistrer de nouveaux visiteurs"
      />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
        classes={{ label: classes.checkBoxFont }}
        control={
          <Checkbox
            size="small"
            checked={((options & AR.ROLE_VISITOR_CONFIG) === AR.ROLE_VISITOR_CONFIG)}
            onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_VISITOR_CONFIG) : (options & ~AR.ROLE_VISITOR_CONFIG)) }
            name="ROLE_VISITOR_CONFIG"
            color="primary"
            disabled={!props.options}
          />
        }
        label="Configurer module visiteur"
      />
      </Grid>
    </Grid>
  );
}

function JournalRoleSetting(props) {
  const classes = makeStyles(useStyles)();
  const [options, setOptions] = useState(0);
  useEffect(() => {
    if(props.options) {
      setOptions(props.options);
    }
  }, [props]);
  return(
    <Grid container>
      <Grid item xs={4}>
        <FormControlLabel
        classes={{ label: classes.checkBoxFont }}
        control={
          <Checkbox
            size="small"
            checked={((options & AR.ROLE_JOURNAL_SEARCH) === AR.ROLE_JOURNAL_SEARCH)}
            onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_JOURNAL_SEARCH) : (options & ~AR.ROLE_JOURNAL_SEARCH)) }
            name="ROLE_JOURNAL_SEARCH"
            color="primary"
            disabled={!props.options}
          />
        }
        label="Executer des recherches"
      />
      </Grid>
      <Grid item xs={4}>
        <FormControlLabel
        classes={{ label: classes.checkBoxFont }}
        control={
          <Checkbox
            size="small"
            checked={((options & AR.ROLE_JOURNAL_PDF) === AR.ROLE_JOURNAL_PDF)}
            onChange={(event) => props.onChange((event.target.checked) ? (options | AR.ROLE_JOURNAL_PDF) : (options & ~AR.ROLE_JOURNAL_PDF)) }
            name="ROLE_JOURNAL_PDF"
            color="primary"
            disabled={!props.options}
          />
        }
        label="Produire document PDF"
      />
      </Grid>
    </Grid>
  );
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
      email:email.toLowerCase(),
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
    this.loadAllData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) 
      this.loadAllData();
  }

  loadAllData() {
    this.setState({ loadingRoles:true});
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
            {AR.isEnabled(this.props.user.access,AR.ROLE_SETTINGS_MANAGE_ACCOUNTS)?
            [<TableRow key="new-user-row">
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
            ,<TableRow key="user-details-row">
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
            ]:null}

            {AR.isEnabled(this.props.user.access,AR.ROLE_SETTINGS_MANAGE_ROLES)?
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
                        <RoleDetails user={this.props.user} role={this.state.selectedRole} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
            :null}
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