import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
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

import UserAccountStatus from "../components/UserAccountStatus"
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
  }
}));


function createData(userid, status, firstName, lastName, role, email, phone) {
  return { userid, status, firstName, lastName, role, email, phone };
}

const allUserAccounts = [
  createData(1234567891, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(1234567892, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(1234567893, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(1234567894, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(1234567895, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(1234567896, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(1234567897, 'online', 'Marc-Antoine', 'Dumont', 4, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(1234567898, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(1234567899, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(1234567890, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(12345678911, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(12345678922, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(12345678933, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(12345678944, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(12345678955, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(12345678966, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(12345678977, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(12345678988, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(12345678999, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(12345678912, 'offline', 'Luc', 'Seguin',1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(12345678913, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(12345678914, 'offline', 'Luc', 'Seguin', 1, 'lseguin@hopital.qc.ca', '819-123-1234'),
];


function UserAccountsTable(props) {
  const classes = useStyles();
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
          {props.userAccounts.map((row) => (
            <TableRow key={row.userid}>
              <TableCell component="th" scope="row" className={classes.iconTableCell}>
                <UserAccountStatus account={row} />
              </TableCell>
              <TableCell >{row.firstName + ' ' + row.lastName}</TableCell>
              <TableCell >{roles.find(item => item.id === row.role).name }</TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >{row.phone}</TableCell>
              <TableCell className={classes.iconTableCell}>
                <IconButton aria-label="edit" size="small" onClick={() => props.onSelectedAccountForEdit(row)} >
                  <EditIcon />
                </IconButton >
              </TableCell>
              <TableCell className={classes.iconTableCell}>
                <IconButton aria-label="delete" size="small">
                  <DeleteIcon />
                </IconButton >
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
  );
}

const ROLE_SETTINGS_MANAGE_ACCOUNTS = 1;
const ROLE_SETTINGS_GEO_FENCED = 2;
//const ROLE_SETTINGS_X1 = 4;
//const ROLE_SETTINGS_X2 = 8;

const MODULE_BEDS_VIEW = 16;
const MODULE_BEDS_UPDATE = 32;
const MODULE_BEDS_CONFIG_FLOOR = 64;
const MODULE_BEDS_CONFIG_BED = 128;

const MODULE_BEARER_VIEW = 256;
const MODULE_BEARER_UPDATE = 512;
const MODULE_BEARER_CONFIG = 1024;
//const MODULE_BEARER_X1 = 2048;

const MODULE_CLEANER_VIEW = 4096;
const MODULE_CLEANER_UPDATE = 8192;
const MODULE_CLEANER_CONFIG = 16384;
//const MODULE_CLEANER_X1 = 32768;

const roles = [
  {
    id: 1,
    name: 'Brancardier',
    count: 5,
    settings: ROLE_SETTINGS_GEO_FENCED|MODULE_BEARER_VIEW|MODULE_BEARER_UPDATE,
  },
  {
    id: 2,
    name: 'Nettoyeur',
    count: 5,
    settings: ROLE_SETTINGS_GEO_FENCED|MODULE_CLEANER_VIEW|MODULE_CLEANER_UPDATE,
  },
  {
    id: 3,
    name: 'Administrateur',
    count: 5,
    settings: ROLE_SETTINGS_MANAGE_ACCOUNTS|MODULE_BEDS_VIEW|MODULE_BEDS_CONFIG_FLOOR|MODULE_BEDS_CONFIG_BED|MODULE_BEARER_VIEW|MODULE_BEARER_CONFIG|MODULE_CLEANER_VIEW|MODULE_CLEANER_CONFIG,
  },
  {
    id: 4,
    name: 'Gestionnaire',
    count: 5,
    settings: MODULE_BEDS_VIEW|MODULE_BEARER_VIEW|MODULE_CLEANER_VIEW,
  },
];

function RolesTable(props) {
  const classes = useStyles();
  return (
    <TableContainer className={classes.rolesRable} size="small">
      <Table className={classes.rolesRable} size="small" aria-label="Roles" height="100%">
        {/* <caption>A basic table example with a caption</caption> */}
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell} width='200'>Role</TableCell>
            <TableCell className={classes.tableHeaderCell} width='30'>#</TableCell>
            <TableCell className={classes.tableHeaderCell} width='30'></TableCell>
            <TableCell className={classes.tableHeaderCell} width='30'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.roles.map((row) => (
            <TableRow key={row.id}>
              <TableCell >{row.name}</TableCell>
              <TableCell >{row.count}</TableCell>
              <TableCell className={classes.iconTableCell}>
                <IconButton aria-label="edit role" size="small" onClick={() => props.onSelectedRoleForEdit(row)}>
                  <EditIcon  />
                </IconButton >
              </TableCell>
              <TableCell className={classes.iconTableCell}>
                <IconButton aria-label="delete role" size="small">
                  <DeleteIcon />
                </IconButton >
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function RoleDetails(props) {
  const classes = useStyles();
  const [isModified, setModified] = useState(false);
  const [name, setName] = useState(props.role.name);
  const [settings, setSettings] = useState(props.role.settings);

  useEffect(() => {
    setModified(false);
    setName(props.role.name);
    setSettings(props.role.settings);
  }, [props]);

  const onNameChangeHandler = (event) => {
    setName(event.target.value);
    setSettings(props.role.settings);
    setModified(true);
  }

  const handleRoleSettingChange = (event) => {
    switch (event.target.name) {
      case 'ROLE_SETTINGS_MANAGE_ACCOUNTS':
        setSettings((event.target.checked) ? (settings | ROLE_SETTINGS_MANAGE_ACCOUNTS) : (settings & ~ROLE_SETTINGS_MANAGE_ACCOUNTS));
        break;
      case 'ROLE_SETTINGS_GEO_FENCED':
        setSettings((event.target.checked) ? (settings | ROLE_SETTINGS_GEO_FENCED) : (settings & ~ROLE_SETTINGS_GEO_FENCED));
        break;

      case 'MODULE_BEDS_VIEW':
        setSettings((event.target.checked) ? (settings | MODULE_BEDS_VIEW) : (settings & ~MODULE_BEDS_VIEW));
        break;
      case 'MODULE_BEDS_UPDATE ':
        setSettings((event.target.checked) ? (settings | MODULE_BEDS_UPDATE) : (settings & ~MODULE_BEDS_UPDATE));
        break;
      case 'MODULE_BEDS_CONFIG_FLOOR':
        setSettings((event.target.checked) ? (settings | MODULE_BEDS_CONFIG_FLOOR) : (settings & ~MODULE_BEDS_CONFIG_FLOOR));
        break;
      case 'MODULE_BEDS_CONFIG_BED':
        setSettings((event.target.checked) ? (settings | MODULE_BEDS_CONFIG_BED) : (settings & ~MODULE_BEDS_CONFIG_BED));
        break;

      case 'MODULE_BEARER_VIEW':
        setSettings((event.target.checked) ? (settings | MODULE_BEARER_VIEW) : (settings & ~MODULE_BEARER_VIEW));
        break;
      case 'MODULE_BEARER_UPDATE':
        setSettings((event.target.checked) ? (settings | MODULE_BEARER_UPDATE) : (settings & ~MODULE_BEARER_UPDATE));
        break;
      case 'MODULE_BEARER_CONFIG':
        setSettings((event.target.checked) ? (settings | MODULE_BEARER_CONFIG) : (settings & ~MODULE_BEARER_CONFIG));
        break;

      case 'MODULE_CLEANER_VIEW':
        setSettings((event.target.checked) ? (settings | MODULE_CLEANER_VIEW) : (settings & ~MODULE_CLEANER_VIEW));
        break;
      case 'MODULE_CLEANER_UPDATE':
        setSettings((event.target.checked) ? (settings | MODULE_CLEANER_UPDATE) : (settings & ~MODULE_CLEANER_UPDATE));
        break;
      case 'MODULE_CLEANER_CONFIG':
        setSettings((event.target.checked) ? (settings | MODULE_CLEANER_CONFIG) : (settings & ~MODULE_CLEANER_CONFIG));
        break;
    }
    setModified(true);
  };

  return (
    <Grid container spacing={1}>
      <Grid container item xs={12} spacing={3}>
        <React.Fragment>
          <Grid item xs={4}>
            <TextField id="edit-role-name" label="Identifiant" value={name} onChange={onNameChangeHandler} style={{ width: '100%' }} />
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
                    checked={((settings & ROLE_SETTINGS_MANAGE_ACCOUNTS) === ROLE_SETTINGS_MANAGE_ACCOUNTS)}
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
                Restrictions
              </Typography>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & ROLE_SETTINGS_GEO_FENCED) === ROLE_SETTINGS_GEO_FENCED)}
                    onChange={handleRoleSettingChange}
                    name="ROLE_SETTINGS_GEO_FENCED"
                    color="primary"
                  />
                }
                label="Accès application mobile seulement dans le périmètre."
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
                    checked={((settings & MODULE_BEDS_VIEW) === MODULE_BEDS_VIEW)}
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
                    checked={((settings & MODULE_BEDS_UPDATE) === MODULE_BEDS_UPDATE)}
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
                    checked={((settings & MODULE_BEDS_CONFIG_FLOOR) === MODULE_BEDS_CONFIG_FLOOR)}
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
                    checked={((settings & MODULE_BEDS_CONFIG_BED) === MODULE_BEDS_CONFIG_BED)}
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
            <Paper className={classes.rolePropertySections}>
              <Typography variant="subtitle1">
                Module Brancarderie
              </Typography>
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & MODULE_BEARER_VIEW) === MODULE_BEARER_VIEW)}
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
                    checked={((settings & MODULE_BEARER_UPDATE) === MODULE_BEARER_UPDATE)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_BEARER_UPDATE"
                    color="primary"
                  />
                }
                label="Modifier l'état des demandes."
              />
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & MODULE_BEARER_CONFIG) === MODULE_BEARER_CONFIG)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_BEARER_CONFIG"
                    color="primary"
                  />
                }
                label="Configuration des équipes."
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
                    checked={((settings & MODULE_CLEANER_VIEW) === MODULE_CLEANER_VIEW)}
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
                    checked={((settings & MODULE_CLEANER_UPDATE) === MODULE_CLEANER_UPDATE)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_CLEANER_UPDATE"
                    color="primary"
                  />
                }
                label="Modifier l'état des demandes."
              />
              <FormControlLabel
                classes={{ label: classes.checkBoxFont }}
                control={
                  <Checkbox
                    size="small"
                    checked={((settings & MODULE_CLEANER_CONFIG) === MODULE_CLEANER_CONFIG)}
                    onChange={handleRoleSettingChange}
                    name="MODULE_CLEANER_CONFIG"
                    color="primary"
                  />
                }
                label="Configuration des équipes."
              />
            </Paper>
          </Grid>
        </React.Fragment>
      </Grid>
      <Grid container item xs={12} spacing={3}>
        <React.Fragment>
          <Grid item xs={4}>
            {isModified ?
              <Button variant="contained" color="primary" >
                Sauvegarder
                </Button>
              :
              <Button variant="contained" color="primary" disabled>
                Sauvegarder
                </Button>
            }
          </Grid>
        </React.Fragment>
      </Grid>
    </Grid>);
}

function UserAccountDetails(props) {
  const classes = useStyles();

  const [isModified, setModified] = useState(false);
  const [firstName, setFirstName] = useState(props.account.firstName);
  const [lastName, setLastName] = useState(props.account.lastName);
  const [role, setRole] = useState(props.account.role);
  const [email, setEmail] = useState(props.account.email);
  const [phone, setPhone] = useState(props.account.phone);

  useEffect(() => {
    setModified(false);
    setFirstName(props.account.firstName);
    setLastName(props.account.lastName);
    setRole(props.account.role);
    setEmail(props.account.email);
    setPhone(props.account.phone);
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

  console.log("UserAccountDetails account:" + props.account);

  return (<Paper><TableContainer><Table className={classes.userDetailSection} size="small" aria-label="caption table">
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableHeaderCell}>Details de compte utilisateur</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell className={classes.userDetailCell} >
          <TextField id="user-edit-first-name" label="Prénom" value={firstName} onChange={handleFirstNameChange} style={{ width: '100%' }} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.userDetailCell}>
          <TextField id="user-edit-last-name" label="Nom de famille" value={lastName} onChange={handleLastNameChange} style={{ width: '100%' }} />
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
          >
            {roles.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.userDetailCell}>
          <TextField id="user-edit-email" label="Courriel" value={email} onChange={handleEmailChange} style={{ width: '100%' }} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.userDetailCell}>
          <TextField id="standard-required" label="Cellulaire" value={phone} onChange={handlePhoneChange} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' >
          {isModified ?
            <Button variant="contained" color="primary" >
              Sauvegarder
            </Button>
            :
            <Button variant="contained" color="primary" disabled >
              Sauvegarder
            </Button>
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.userDetailCell}>
          <TextField id="user-edit-temp-pwd" label="Mot de passe temporaire" style={{ width: '100%' }} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align='right' >
          {props.account.id ?
            <Button variant="contained" color="primary"  >
              Appliquer
            </Button>
            :
            <Button variant="contained" color="primary" disabled >
              Appliquer
            </Button>
          }
        </TableCell>
      </TableRow>
    </TableBody>
  </Table></TableContainer></Paper>
  );
}

export default function Users(props) {
  const classes = useStyles();
  const [userFilter, setUserFilter] = useState('');
  const [filteredUserAccounts, setFilteredUserAccounts] = useState(allUserAccounts);
  const [selectedAccount, setSelectedAccount] = useState();
  const [selectedRole, setSelectedRole] = useState();

  const handleFilterChange = (event) => {
    setUserFilter(event.target.value);
    if (!event.target.value || 0 === event.target.value.length)
      setFilteredUserAccounts(allUserAccounts)
    else
      setFilteredUserAccounts(allUserAccounts.filter((item) => {
        return item.firstName.includes(event.target.value) || item.lastName.includes(event.target.value);
      }));
  };

  const handleSetAccountToEdit = (account) => {
    setSelectedAccount(account);
    //console.log("***handleSetAccountToEdit account:" + account);
  };

  const handleSetRoleToEdit = (role) => {
    setSelectedRole(role);
    //console.log("***handleSetRoleToEdit role:" + role);
  };

  return (
    <Paper elevation={0} style={{ height: "100%" }}>
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
                          <TextField id="input-with-icon-grid" className={classes.searchTextField} label="Recherche" onChange={handleFilterChange} value={userFilter}
                            InputProps={{
                              endAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment>,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right" style={{ borderBottom: 'none' }}>
                          <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>
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
                <UserAccountsTable userAccounts={filteredUserAccounts} onSelectedAccountForEdit={handleSetAccountToEdit} />
              </TableCell>
              <TableCell className={classes.mainUserTableCell} style={{ verticalAlign: 'top' }} >
                {selectedAccount ?
                  <UserAccountDetails account={selectedAccount} />
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
                            {roles.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
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
                          <Button variant="contained" color="primary" disabled >
                            Sauvegarder
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
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
                      </TableRow>
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
                        <RolesTable roles={roles} onSelectedRoleForEdit={handleSetRoleToEdit} />
                      </TableCell>
                      <TableCell style={{ borderBottom: 'none', verticalAlign: 'top' }}>
                        {selectedRole ?
                          <RoleDetails role={selectedRole} />
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
                                  <Paper className={classes.rolePropertySections}>
                                    <Typography variant="subtitle1">
                                      Restrictions
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
                                      label="Accès application mobile seulement dans le périmètre."
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
                                      label="Configurer l'informatino des lits."
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
                                    <FormControlLabel
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
                                    <FormControlLabel
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
    </Paper>
  );
}