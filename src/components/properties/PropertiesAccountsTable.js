import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton'
import UserAccountStatus from "../UserAccountStatus"
import * as Properties from './Properties';
import LinearProgress from '@material-ui/core/LinearProgress';
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


export default function PropertiesAccountsTable(props) {
  const classes = useStyles();

  const propsAccountValueToString = (account, property) => {
    const accountProp = account.extra.find(o => o._id === property._id);
    if(accountProp) {
      if(property.type === Properties.TEXT_PROPERTY) {
        return accountProp.value;
      } else if(property.type === Properties.NUM_PROPERTY) {
        return ''+accountProp.value;
      } else if(property.type === Properties.LIST_PROPERTY) {
        if(property.multi === true) {
          return accountProp.value.map((item) => (
            property.items.find(o => o._id === item).text
          ))
          //accountProp.value
          //value is an array
        } else {
          //value is not an array
          return property.find(o => o._id === accountProp.value).text;
        }
      }
    }
  }
  
  let allUserRows = null;
  if(!props.loading) {
    allUserRows = props.userAccounts.map((account) => (
      <TableRow key={account._id}>
        <TableCell component="th" scope="row" className={classes.iconTableCell}>
          <UserAccountStatus account={account} />
        </TableCell>
        <TableCell >{account.firstName + ' ' + account.lastName}</TableCell>
        {props.extraProperties.map((option) => (
          <TableCell key={option._id}>
            <div>
              {propsAccountValueToString(account,option)}
            </div>
          </TableCell>
        ))}
        <TableCell >{account.email}</TableCell>
        <TableCell >{account.phone}</TableCell>
        <TableCell className={classes.iconTableCell}>
          <IconButton aria-label="edit" size="small" onClick={() => props.onSelectedAccountForEdit(account)} >
            <EditIcon />
          </IconButton >
        </TableCell>
      </TableRow>
    ))
  } else {
    allUserRows = <TableRow><TableCell colSpan={5+props.extraProperties.length} ><LinearProgress/> </TableCell></TableRow>
  }

  
  return (
    <Paper style={{ height: "100%", width: "100%" }}>
    <TableContainer size="small">
      <Table size="small" aria-label="caption table" height="100%">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}></TableCell>
            <TableCell className={classes.tableHeaderCell} >Nom</TableCell>
            {props.extraProperties.map((option) => (
              <TableCell key={option._id} className={classes.tableHeaderCell} >{option.text}</TableCell>
            ))}
            <TableCell className={classes.tableHeaderCell} >Courriel</TableCell>
            <TableCell className={classes.tableHeaderCell} >Cellulaire</TableCell>
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