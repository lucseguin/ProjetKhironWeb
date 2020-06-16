import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import TableHead from '@material-ui/core/TableHead';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button';
import UserAccountStatus from "../components/UserAccountStatus"
import PropertyList from "../components/PropertyList"
import PropertyEditor from "../components/PropertyEditor"
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


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
  checkBoxFont: {
    fontSize: 14,
  }
}));

function createData(userid, status, firstName, lastName, role, email, phone) {
  return { userid, status, firstName, lastName, role, email, phone };
}

const allUserAccounts = [
  createData(1234567891, 'offline', 'Luc', 'Seguin', 'Brancardier', 'lseguin@hopital.qc.ca', '819-123-1234'),
  createData(1234567892, 'offline', 'Marc-Antoine', 'Dumont', 'Brancardier', 'lseguin@hopital.qc.ca', '819-123-1234'),

];



function BearerAccountsTable(props) {
  const classes = useStyles();
  return (
    <Paper style={{ height: "100%", width: "100%" }}>
    <TableContainer size="small">
      <Table size="small" aria-label="caption table" height="100%">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}></TableCell>
            <TableCell className={classes.tableHeaderCell} >Nom</TableCell>
            <TableCell className={classes.tableHeaderCell} >Specialization</TableCell>
            <TableCell className={classes.tableHeaderCell} >Courriel</TableCell>
            <TableCell className={classes.tableHeaderCell} >Cellulaire</TableCell>
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
              <TableCell ><div>erwerwert wer wer wert wert wert wert wert wert wert wert wert wert ewrt wert wert wert wert wert wer t</div></TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >{row.phone}</TableCell>
              <TableCell className={classes.iconTableCell}>
                <IconButton aria-label="edit" size="small" onClick={() => props.onSelectedAccountForEdit(row)} >
                  <EditIcon />
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

function BearerAccountDetails(props) {
  const classes = useStyles();

  const [isModified, setModified] = useState(false);

  return (
  <Paper style={{ height: "100%", width: "100%" }}>
    <TableContainer>
      <Table className={classes.userDetailSection} size="small" aria-label="caption table">
    <TableHead>
      <TableRow>
        <TableCell className={classes.tableHeaderCell}>Details du brancardier</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell className={classes.userDetailCell} >
          <Typography  gutterBottom>
            Brancardier : {props.account?(props.account.firstName + ' ' + props.account.lastName):null}
          </Typography>  
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
    </TableBody>
  </Table></TableContainer></Paper>
  );
}

export default function SettingsStretcherBearer(props) {
  const classes = useStyles();
  const [userFilter, setUserFilter] = useState('');
  const [selectedAccount, setSelectedAccount] = useState();
  const [selectedProperty, setSelectedProperty] = useState();

  const [bearerAlgo, setBearerAlgo] = useState('Round-Robin');
  
  const [filteredUserAccounts, setFilteredUserAccounts] = useState(allUserAccounts);

  const [items, setItems] = useState([
    { id: "1", text: "Specialisations", type:"4", multi: false, items:[
      { id: "1", text: "COVID"},
    ]},
  ]);
    
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

  const handlePropertyToEdit = (item) => {
    setSelectedProperty(item);
    //console.log("***handleSetAccountToEdit account:" + account);
  };

  const handleBearerAlgoChange = (event) => {
    setBearerAlgo(event.target.value);
    //console.log("***handleSetAccountToEdit account:" + account);
  };
  

  return (
    <Paper elevation={0} style={{ height: "100%", width: "100%" }}>
      <TableContainer >
        <Table >
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} width='100%'>
                <TableContainer>
                  <Table style={{ border: 'none', width:'100%' }} size="small">
                    <TableBody style={{ border: 'none' }}>
                      <TableRow style={{ borderBottom: 'none' }}>
                        <TableCell className={classes.pageHeader} style={{ borderBottom: 'none' }}>
                          Gestion des brancardiers
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
              <TableCell colSpan={2} className={classes.mainUserTableCell} style={{ verticalAlign: 'top' }} >
                <BearerAccountsTable userAccounts={filteredUserAccounts} onSelectedAccountForEdit={handleSetAccountToEdit} />
              </TableCell>
              <TableCell  className={classes.mainUserTableCell} style={{ verticalAlign: 'top' }} >
                  <BearerAccountDetails account={selectedAccount} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell  style={{ verticalAlign: 'top' }}>
                <PropertyList title="Propriétés additionel associer aux brancardiers" items={items} onEdit={(item) => handlePropertyToEdit(item)}/>
              </TableCell>
              <TableCell  style={{ verticalAlign: 'top' }}>
                <PropertyEditor property={selectedProperty}/>
              </TableCell>
              <TableCell style={{ verticalAlign: 'top' }}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    style={{ padding: 20 }}
                  >
                    <Grid item>
                      <Typography variant="subtitle1"gutterBottom>
                        Algorithm d'assignation des demandes
                      </Typography>  
                    </Grid>
                    <Grid item>
                      <Paper>
                      <RadioGroup aria-label="bearer-algo" name="bearer-algo" value={bearerAlgo} onChange={handleBearerAlgoChange}>
                        <ExpansionPanel>
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                          >
                            <FormControlLabel
                              aria-label="Acknowledge"
                              onClick={(event) => event.stopPropagation()}
                              onFocus={(event) => event.stopPropagation()}
                              control={<Radio />}
                              label="Round-Robin"
                              value="Round-Robin"
                            />
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Typography color="textSecondary">
                              Les demandes vonts être directement assigner au prochain brancardiers disponible, selon les conditions de la demande.
                            </Typography>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions2-content"
                            id="additional-actions2-header"
                          >
                            <FormControlLabel
                              aria-label="Acknowledge"
                              onClick={(event) => event.stopPropagation()}
                              onFocus={(event) => event.stopPropagation()}
                              control={<Radio />}
                              label="Notify-Accept"
                              value="Notify-Accept"
                            />
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Typography color="textSecondary">
                              Un notification d'une nouvelle demande sera envoyé à tous les brancardiers qui rencontre les conditions de la demande, afin qu'un d'entre eux accepte la demande.
                            </Typography>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                        </RadioGroup>
                        </Paper>
                    </Grid>
                  </Grid>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
