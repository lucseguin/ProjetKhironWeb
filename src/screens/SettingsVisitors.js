import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import PropertyList from "../components/properties/PropertyList"
import PropertyEditor from "../components/properties/PropertyEditor"
import axios from 'axios';
import * as Properties from '../components/properties/Properties'
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Grid from '@material-ui/core/Grid';
import ConfirmDialog from "../components/ConfirmDialog"
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import QRCode from "react-qr-code";
import html2canvas from 'html2canvas';
import EventCoordinator from '../components/EventCoordinator'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { v4 as uuidv4 } from 'uuid';
import CircularProgress from '@material-ui/core/CircularProgress';
// const Cryptr = require('cryptr');

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

// const cryptr = new Cryptr(window._env_.REACT_APP_SALT);
const PrintableQRCode = React.forwardRef((props, ref) => ( 
  <div ref={ref}><QRCode level="L" value={"https://"+ window._env_.REACT_APP_HOST_NAME+"/visitor?site="+props.site}/></div>));

export default function SettingsVisitors(props) {
  const classes = useStyles();
  
  const confirmDlgRef = useRef(null);
  const [selectedProperty, setSelectedProperty] = useState();
  const [loadingSettings, setLoadingSettings] = useState(false);
  const [settingsModified, setSettingsModified] = useState(false);
  const [settings, setSettings] = useState({extra:[]});
  
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertType, setAlertType] = React.useState('');

  const qrCodeRef = useRef();

  const [qrCode, setQrCode] = useState(null);

  const generateQrCode = (genSite) => {
      var qCode = <PrintableQRCode ref={qrCodeRef} site={genSite}/>
      setQrCode(qCode);
  }

  useEffect(() => {

    var user = EventCoordinator.retreive("user");

      setLoadingSettings(true);
      axios.get("/projetkhiron/visitor/settings", {
      })
      .then((response) => {
        //console.log(response);
        if (response.status === 200) {
          setSettings(response.data.settings);

          if(user) {
            setTimeout(function(){generateQrCode(user.site._id) }, 500);
          }
        }
      }).catch(error => {
        console.log("error" + error);
        if (error) throw error;
      }).finally(() => {
        setLoadingSettings(false);
      });
  }, [props.user])

  const handledSaveSettings = (event) => {
    axios.put("/projetkhiron/visitor/settings", {
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
    settingsCopy.extra = [...settingsCopy.extra , { _id: uuidv4(), text: "Nouvelle Propriétée", type: Properties.TEXT_PROPERTY, max: 0, required: false, mlAlgo: '', assistant:'', entity:''}];
    setSettings(settingsCopy); 
    setSettingsModified(true);
  }

  const handlePropListReorder = (reorderedList) => {
    //setExtraAccountProps([...reorderedList]);
    //setItems(reorderedList); 
  }

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const downloadQRCode = () => {
    html2canvas(qrCodeRef.current).then(function (canvas) {
      var image = canvas.toDataURL("png")
      var a = document.createElement("a");
      a.setAttribute('download', 'VisiteurQR.png');
      a.setAttribute('href', image);
      a.click();
  });
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
              <TableCell  width='100%'>
                <TableContainer>
                  <Table style={{ border: 'none', width: '100%' }} size="small">
                    <TableBody style={{ border: 'none' }}>
                      <TableRow style={{ borderBottom: 'none' }}>
                        <TableCell className={classes.pageHeader} style={{ borderBottom: 'none' }}>
                          Gestion des visiteurs
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ verticalAlign: 'top' }}>
                <Grid   container
                  direction="row"
                  justify="space-between"
                  alignItems="flex-start"
                  spacing={1}>

                  <Grid item xs={4} style={{minWidth: 400}}>
                    <PropertyList title="Propriétés additionel associer aux enregistrement"
                      extraProperties={settings.extra}
                      onEdit={(item) => handlePropertyToEdit(item)}
                      onDelete={(item) => handlePropertyDelete(item)}
                      onReorder={(reorderedList) => handlePropListReorder(reorderedList)}
                      loading={loadingSettings} />
                  </Grid>
                  <Grid item xs={4} style={{minWidth: 400}}>
                    <PropertyEditor
                      property={selectedProperty}
                      onChange={(item) => handlePropertyChange(item)} 
                      assistant={true}/>
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
                      <Grid container
                      direction="column"
                      justify="center"
                      alignItems="center">
                        {qrCode?qrCode:<CircularProgress />}
                        <Button disabled={!qrCode} variant="contained" color="primary" startIcon={<GetAppOutlinedIcon />} onClick={() => downloadQRCode()}>
                          Télécharger image
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
