import React, {useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropertySelector from './PropertySelector'
import * as Properties from './Properties'

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

export default function PropertiesAccountDetails(props) {
    const classes = useStyles();
  
    const [isModified, setModified] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState();
  
    useEffect(() => {
      setSelectedAccount(props.account);
    }, [props.account]);
  
    const handleAccountPropertyChange = (propertyId, e) => {
        let updatedAccount = {...selectedAccount};

        const idx = updatedAccount.extra.findIndex(o => o.id === propertyId);
        updatedAccount.extra = [
            ...updatedAccount.extra.slice(0, idx),
            {id:propertyId, value:e.target.value},
            ...updatedAccount.extra.slice(idx + 1)
        ];

        //updatedAccount.extra = [...updatedAccount.extra, {id:propertyId, value:e.target.value}];
        setSelectedAccount(updatedAccount);
        setModified(true);
    }
  
    const handleSaveUpdatedAccount = () => {
      //TODO:persist changes
      props.onSave(selectedAccount);
      setModified(false);
    }
  
  
    const getAccountValueFor = (property) => {
      if(selectedAccount) {
        let accountProp = selectedAccount.extra.find(item => item.id === property.id);
        if(accountProp)
          return accountProp.value;
        else {
          if(property.type === Properties.NUM_PROPERTY.id)
            return 0;
          else if(property.type === Properties.LIST_PROPERTY.id && property.multi === true) 
            return [];
          else
            return '';
        }
      } else {
        if(property.type === Properties.NUM_PROPERTY.id) {
          return 0;
        } else if(property.type === Properties.LIST_PROPERTY.id && property.multi === true) {
          return [];
        } else {
          return '';
        }
      }
    }
  
    return (
    <Paper style={{ height: "100%", width: "100%" }}>
      <TableContainer>
        <Table className={classes.userDetailSection} size="small" aria-label="caption table">
      <TableHead>
        <TableRow>
         <TableCell className={classes.tableHeaderCell}>{props.header}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell className={classes.userDetailCell} >
            <Typography  gutterBottom>
                {props.label} : {selectedAccount?(selectedAccount.firstName + ' ' + selectedAccount.lastName):null}
            </Typography>  
          </TableCell>
        </TableRow>
        {props.extraProperties.map((element) => (
        <TableRow key={element.id}> 
          <TableCell className={classes.userDetailCell} >
            <PropertySelector 
              disabled={!selectedAccount} 
              label={element.text} 
              value={getAccountValueFor(element)} 
              onChange={(e) => handleAccountPropertyChange(element.id, e)} 
              extra={element}
              style={{width:'100%'}}/>
          </TableCell>
        </TableRow>
        ))}
        <TableRow>
          <TableCell align='right' >
              <Button variant="contained" color="primary" disabled={!isModified} onClick={handleSaveUpdatedAccount}>
                Sauvegarder
              </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table></TableContainer></Paper>
    );
  }