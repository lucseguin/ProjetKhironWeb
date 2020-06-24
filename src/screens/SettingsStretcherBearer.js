import React, {useState,useEffect} from "react";
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
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import PropertyList from "../components/properties/PropertyList"
import PropertyEditor from "../components/properties/PropertyEditor"
import PropertiesAccountDetails from '../components/properties/PropertiesAccountDetails'
import PropertiesAccountsTable from '../components/properties/PropertiesAccountsTable'

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

const allBearerUsers = [
  {
    id:1234567891,
    status:'offline',
    firstName: 'Luc',
    lastName : 'Seguin',
    phone: '819-123-1234',
    email: 'luc@test.com',
    extra : []
  },
  {
    id:1234567892,
    status:'offline',
    firstName: 'Marc-Antoine',
    lastName : 'Dumont',
    phone: '819-123-1234',
    email: 'ma@test.com',
    extra : []
  }
];

const bearerExtraFieldsX = [
  { id: 1, text: "Specialisations", type:"4", multi: true, items:[
    { id: 1, text: "COVID"},
    { id: 2, text: "SRAS"},
    { id: 3, text: "Nuclear"},
  ]}
];

export default function SettingsStretcherBearer(props) {
  const classes = useStyles();
  const [userFilter, setUserFilter] = useState('');
  const [selectedAccount, setSelectedAccount] = useState();
  const [selectedProperty, setSelectedProperty] = useState();
  const [filteredUserAccounts, setFilteredUserAccounts] = useState([...allBearerUsers]);

  //TODO:pull from db
  const [bearerAlgo, setBearerAlgo] = useState('Round-Robin');
  const [allUserAccounts, setAllUserAccounts] = useState([...allBearerUsers]);
  const [extraAccountProps, setExtraAccountProps] = useState(bearerExtraFieldsX);
    
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

  const refreshUserAccountFilterUpdate = () => {
    const lcFilterVal = userFilter.toLowerCase();

    if(lcFilterVal && lcFilterVal.value.length > 0) {
      setFilteredUserAccounts([...allUserAccounts.filter((item) => {
        //TODO also search additional fields
        return item.firstName.toLowerCase().includes(lcFilterVal) || 
              item.lastName.toLowerCase().includes(lcFilterVal) ||
              item.email.toLowerCase().includes(lcFilterVal) ||
              item.phone.toLowerCase().includes(lcFilterVal);
      })]);
    } else {
      setFilteredUserAccounts([...allUserAccounts]);
    }
  } 

  const handleSetAccountToEdit = (account) => {
    setSelectedAccount(account);
    //console.log("***handleSetAccountToEdit account:" + account);
  };

  const handlePropertyToEdit = (item) => {
    setSelectedProperty(item);
    //console.log("***handleSetAccountToEdit account:" + account);
  };

  const handlePropertyDelete = (item) => {
    const selectedBedIndex = extraAccountProps.findIndex(o => o.id === item.id);
    setExtraAccountProps( [
        ...extraAccountProps.slice(0, selectedBedIndex),
        ...extraAccountProps.slice(selectedBedIndex + 1)
      ]);
  };
  
  const handleSavePropItem = (xitem)=> {
    const idx = extraAccountProps.findIndex(o => o.id === xitem.id);
    setExtraAccountProps( [
        ...extraAccountProps.slice(0, idx),
        {...xitem},
        ...extraAccountProps.slice(idx + 1)
    ]);
  }

  const handleNewProperty = () => {
    let newId = Math.max(...extraAccountProps.map(o => o.id), 0) + 1;
    let updatedItems = [...extraAccountProps, { id: newId, text: "Nouvelle Propriétée", type:"1", max:0, mandatory:false, mlAlgo:'' }];
    setExtraAccountProps(updatedItems); 
  }
  const handleSavePropList = () => {
    //TODO
    console.log("//TODO:need to persist changes");
  }
  
  const handlePropListReorder = (reorderedList) => {
    //setItems(reorderedList); 
    //setItems(reorderedList); 
  }

  const handleBearerAlgoChange = (event) => {
    setBearerAlgo(event.target.value);
    //console.log("***handleSetAccountToEdit account:" + account);
  };
  
  const handleSaveAccountChnage = (account) => {
    const idx = allUserAccounts.findIndex(o => o.id === account.id);
    
    let copyAccnt = {...account};

    let newUserAccountLis = [
      ...allUserAccounts.slice(0, idx),
      copyAccnt,
      ...allUserAccounts.slice(idx + 1)
    ];
    setAllUserAccounts( newUserAccountLis);
   
    const lcFilterVal = userFilter.toLowerCase();
    if(lcFilterVal && lcFilterVal.value.length > 0) {
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

  return (
    <Paper elevation={0} style={{ height: "100%", width: "100%" }}>
      <TableContainer >
        <Table>
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
              <TableCell colSpan={2} className={classes.mainUserTableCell} style={{ verticalAlign: 'top', width:'100%' }} >
                <PropertiesAccountsTable 
                  userAccounts={filteredUserAccounts} 
                  extraProperties={extraAccountProps} 
                  onSelectedAccountForEdit={handleSetAccountToEdit} />
              </TableCell>
              <TableCell  className={classes.mainUserTableCell} style={{ verticalAlign: 'top', minWidth:300, maxWidth:300}} >
                <PropertiesAccountDetails 
                  header="Details du brancardier"
                  label="Brancardier"
                  account={selectedAccount} 
                  extraProperties={extraAccountProps} 
                  onSave={handleSaveAccountChnage}/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell  style={{ verticalAlign: 'top' }}>
                <PropertyList title="Propriétés additionel associer aux brancardiers" 
                  extraProperties={extraAccountProps} 
                  onEdit={(item) => handlePropertyToEdit(item)} 
                  onDelete={(item) => handlePropertyDelete(item)}
                  onNew={handleNewProperty}
                  onSave={handleSavePropList}
                  onReorder={(reorderedList) => handlePropListReorder(reorderedList)}/>
              </TableCell>
              <TableCell  style={{ verticalAlign: 'top' }}>
                <PropertyEditor 
                  property={selectedProperty}
                  onSave={(item) => handleSavePropItem(item)}/>
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
