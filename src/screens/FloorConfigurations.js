import React, { useState, useEffect, Component, createRef } from "react";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import FloorSvgEditor from '../components/FloorSvgEditor'
import Slider from '@material-ui/core/Slider';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import { v4 as uuidv4 } from 'uuid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import StatusProgress from '../components/StatusProgress'
import ConfirmDialog from '../components/ConfirmDialog'

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

  floorListSection: {
    minWidth: 350,
    maxWidth: 350,
    verticalAlign: 'top',
  },
  rolePropertySections: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    minHeight: 650,
    maxheight: 650,
  },
  floorInformationCell: {

  }

});


function FloorList(props) {
  const classes = makeStyles(useStyles)();
  //const [selectedID, setSelectedID] = useState('');

  const handleListItemClick = (event, floor) => {
    //setSelectedID(floor._id);
    props.onSelectedFloor(floor);
  };


  return (
    <div>
      <Typography variant="subtitle1">
        Étages
      </Typography>
      <Divider />
      <List component="nav" aria-label="Floors" style={{ maxHeight: 400, overflow: 'auto'}}>
        {props.floors.map((floor) => (
          <ListItem
            button
            selected={props.selectedID === floor._id}
            onClick={(event) => handleListItemClick(event, floor)}
            key={floor._id}
          >
            <ListItemText primary={floor.label} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={props.onDelete(floor)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>))}
      </List>
    </div>
  );
}

function SectionList(props) {
  const classes = makeStyles(useStyles)();

  const handleListItemClick = (event, section) => {
    props.onSelectedSection(section);
  };

  return (
    <div>
      <Typography variant="subtitle1">
        Sections
      </Typography>
      <Divider />
      <List component="nav" aria-label="Floors" style={{ maxHeight: 250, overflow: 'auto'}}>
        {props.sections.map((section) => (
          <ListItem
            button
            selected={props.selectedID === section._id}
            onClick={(event) => handleListItemClick(event, section)}
            key={section._id}
          >
            <ListItemText primary={section.label} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={props.onDelete(section)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>))}
      </List>
    </div>
  );
}

class FloorConfigurations extends Component {
  constructor(props) {
    super(props);
    this.floorEditor = null;
    this.statusProgressRef = createRef();
    this.confirmDlgRef = createRef();
    this.loadFloorList = this.loadFloorList.bind(this);
  }

  state = {
    selectedFloor: null,
    selectedSection: null,
    modified: false,
    bedSize: 1.0,
    newBedsPattern:"7[0-9][0-9]-0[1-2]",
    newBedsCount:0,
    allFloorDetails:[],
    loading:false,
    openAlert:false,
    newFloor:false,
    alertMessage:'',
    alertType:'',
    statusTitle:'',
    statusMessage:'',
  };

  loadFloorList() {
    this.setState({statusTitle:'Chargement de donnée',statusMessage:"Chargement de la liste d'étage ", loading:true});
    this.statusProgressRef.current.showStatus();
    axios.get("/projetkhiron/floors")
    .then((response) => {
      if(response.status === 200) {
        this.setState({allFloorDetails: response.data});
      }
    }, (error) => {
      console.log(error);
    }).finally(() => {
      this.statusProgressRef.current.hideStatus();
      this.setState({loading:false});
    });
  }

  componentDidMount () {
    this.loadFloorList();
  }

  showStatusProgress(title, message) {
    this.setState({statusTitle:title,statusMessage:message});
    this.statusProgressRef.current.showStatus();
  }

  hideStatusProgress() {
    this.statusProgressRef.current.hideStatus();
  }

  handleSelectedFloor(floor){
    if(this.state.selectedFloor && this.state.modified) {
      this.showConfirmFloorNotSaved(this.state.selectedFloor, floor);
    } else {
      if(floor._id !== "-1") {
        this.loadFloorDetailsForEdit(floor);
      }
    }
  }

  loadFloorDetailsForEdit(floor) {
    this.showStatusProgress('Chargement de donnée', "Chargement des données pour l'étage " + floor.label);

    axios.get("/projetkhiron/floor/" + floor._id)
    .then((response) => {
      if(response.status === 200) {
        this.setState({selectedFloor:response.data, selectedSection:null, modified:false});
        this.floorEditor.editSelectionBeds(response.data.beds);
      }
    }).catch(error => {
      console.log("error" +error);
      if (error) throw error;
    }).finally(() => {
      this.hideStatusProgress()
    });
  }

  handleSelectedSection(section) {
    const selectedSectionIndex = this.state.selectedFloor.sections.findIndex(s => s._id === section._id);
    this.setState({selectedSection:this.state.selectedFloor.sections[selectedSectionIndex], modified:false});
    this.floorEditor.editSelectionBeds(this.state.selectedFloor.sections[selectedSectionIndex].beds);
  }

  handleNewBedsCount(event) {
    this.setState({newBedsCount:event.target.value});
  }

  handleNewBedsPattern(event) {
    this.setState({newBedsPattern:event.target.value});
  }

  handleFloorLabelChange(event) {
    let updatedFloor = {...this.state.selectedFloor, label: event.target.value};

    const selectedFloorIndex = this.state.allFloorDetails.findIndex(floor => floor._id === updatedFloor._id);

    let updatedFloorDetail = [
                          ...this.state.allFloorDetails.slice(0, selectedFloorIndex),
                          {...this.state.allFloorDetails[selectedFloorIndex], label: event.target.value},
                          ...this.state.allFloorDetails.slice(selectedFloorIndex + 1)
                        ];

    this.setState({selectedFloor:updatedFloor, modified:true, allFloorDetails:updatedFloorDetail});
    //this.setState({selectedFloor:updatedFloor, modified:true});
  }
  handleFloorDescriptionChange(event) {
    let updatedFloor = {...this.state.selectedFloor, description: event.target.value};
    this.setState({selectedFloor:updatedFloor, modified:true});
  }

  updateSectionInFloor(updatedSection){
    const selectedSectionIndex = this.state.selectedFloor.sections.findIndex(section => section._id === updatedSection._id);

    let updatedFloor = {...this.state.selectedFloor,
                      sections:[
                        ...this.state.selectedFloor.sections.slice(0, selectedSectionIndex),
                        updatedSection,
                        ...this.state.selectedFloor.sections.slice(selectedSectionIndex + 1)
                      ]};
    return updatedFloor;
  }

  handleSectionLabelChange (event) {
    let updatedSection = {...this.state.selectedSection, label: event.target.value};

    let updatedFloor = this.updateSectionInFloor(updatedSection);

    const selectedFloorIndex = this.state.allFloorDetails.findIndex(floor => floor._id === updatedFloor._id);

    let updatedFloorDetail = [
                          ...this.state.allFloorDetails.slice(0, selectedFloorIndex),
                          updatedFloor,
                          ...this.state.allFloorDetails.slice(selectedFloorIndex + 1)
                        ];
                    
    this.setState({selectedFloor:updatedFloor, selectedSection:updatedSection, allFloorDetails:updatedFloorDetail, modified:true});
  }

  handleSectionDescriptionChange(event) {
    let updatedSection = {...this.state.selectedSection, description: event.target.value};
    let updatedFloor = this.updateSectionInFloor(updatedSection);
    this.setState({selectedFloor:updatedFloor, selectedSection:updatedSection,  modified:true});
  }

  handleBedSizeChange (event,value) {
    this.setState({bedSize:value, modified:true});
  }

  handleFloorLayoutChange(event) {
    if(this.state.selectedSection) {
      let updatedSection = {...this.state.selectedSection, layout: event.target.value};
      let updatedFloor = this.updateSectionInFloor(updatedSection);
      this.setState({selectedFloor:updatedFloor, selectedSection:updatedSection,  modified:true, layout:event.target.value});
    } else if (this.state.selectedFloor){
      let updatedFloor = {...this.state.selectedFloor, layout: event.target.value};
      this.setState({selectedFloor:updatedFloor, modified:true, layout:event.target.value});
    }
  }

  handleBedUpdates(beds) {
    if(this.state.selectedSection) {
      let updatedSection = {...this.state.selectedSection, beds:beds};
      let updatedFloor = this.updateSectionInFloor(updatedSection);
      this.setState({selectedFloor:updatedFloor, modified:true});
    } else {
      let updatedFloor = {...this.state.selectedFloor, beds:beds};
      this.setState({selectedFloor:updatedFloor, modified:true});
    }
  }

  handleNewFloor(event) {
    let newFloor = {_id:'-1', label:'Nouvel Étage', description:'Nouvel Étage', layout:'', sections:[], beds:[]};
    
    let updatedFloorDetails = [...this.state.allFloorDetails, newFloor];

    this.setState({selectedFloor:newFloor, allFloorDetails:updatedFloorDetails, selectedSection:null, modified:true, newFloor:true});
  }

  handleNewSection(event) {
    const selectedFloorIndex = this.state.selectedFloor.sections.findIndex(floor => floor._id === this.state.selectedFloor._id);
    let newSection = {_id:uuidv4(), label:'Nouvelle Section', description:'Nouvelle Section', layout:'', beds:[]};
    let updatedFloor = {...this.state.selectedFloor, sections:[...this.state.selectedFloor.sections, newSection], modified:true};

    this.setState({
      modified:true, 
      selectedFloor:updatedFloor,
      selectedSection:newSection, 
    });
  }

  handledSaveSelectedFloor(event) {
    //reload floor list

    this.setState({statusTitle:'Sauvegarde de donnée',statusMessage:"Sauvegarde des données pour l'étage " + this.state.selectedFloor.label});
    this.statusProgressRef.current.showStatus();

    axios.put("/projetkhiron/floor", this.state.selectedFloor)
    .then((response) => {
      //console.log(response);
      if (response.status === 200) {
        //console.log(response);

        // const selectedFloorIndex = this.state.allFloorDetails.findIndex(floor => floor._id === this.state.selectedFloor._id);

        // let updatedFloorDetail = {...this.state.allFloorDetails[selectedFloorIndex], label: this.state.selectedFloor.label};
        
        //TODO : need to also copy section details only to updatedFloorDetail

        if(this.state.newFloor) {
          //updatedFloorDetail = {...updatedFloorDetail, _id:response.data.insertedId};
          let updatedSelectedFloor = {...this.state.selectedFloor, _id:response.data.insertedId};
          this.setState({selectedFloor:updatedSelectedFloor});
        }

        // let updatedAllFloorDetails = [
        //                 ...this.state.allFloorDetails.slice(0, selectedFloorIndex),
        //                 updatedFloorDetail,
        //                 ...this.state.allFloorDetails.slice(selectedFloorIndex + 1)
        //               ];
        //allFloorDetails:updatedAllFloorDetails,

        this.setState({
          openAlert:true, 
          alertMessage:"Sauvegarder",
          alertType:"success", 
          modified:false, 
          newFloor:false,
        });

       //this.loadFloorList();
      }
    }).catch(error => {
      this.setState({
        openAlert:true, 
        alertMessage:error.message,
        alertType:"error", 
      });

      console.log("ERROR");
      console.log(error);
    }).finally(() => {
      this.statusProgressRef.current.hideStatus();
    });
  }

  handleCloseAlert(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({openAlert:false});
  }

  handleDeleteFloor(floor){
    this.showStatusProgress("Supression d'étage", "Supression de l'étage " + floor.label + " en cours");

    axios.delete("/projetkhiron/floor/" + floor._id)
    .then((response) => {
      if(response.status === 200) {
        //no need to reload all, just remove floor from list
        const selectedFloorIndex = this.state.allFloorDetails.findIndex(f => f._id === floor._id);
        let updatedFloorDetails = [
                              ...this.state.allFloorDetails.slice(0, selectedFloorIndex),
                              ...this.state.allFloorDetails.slice(selectedFloorIndex + 1)
                            ];
        this.setState({allFloorDetails:updatedFloorDetails});

        this.setState({
          openAlert:true, 
          alertMessage:"Supprimer",
          alertType:"success", 
        });
      }
    }).catch(error => {
      this.setState({
        openAlert:true, 
        alertMessage:error.message,
        alertType:"error", 
      });
      console.log("error" +error);
      //if (error) throw error;
    }).finally(() => {
      this.hideStatusProgress()
    });
  }

  handleDeleteSection(section){
    const selectedSectionIndex = this.state.selectedFloor.sections.findIndex(s => s._id === section._id);
    let updatedFloor = {...this.state.selectedFloor,
                      sections:[
                        ...this.state.selectedFloor.sections.slice(0, selectedSectionIndex),
                        ...this.state.selectedFloor.sections.slice(selectedSectionIndex + 1)
                      ]};
    const selectedFloorIndex = this.state.allFloorDetails.findIndex(floor => floor._id === updatedFloor._id);

    let updatedFloorDetail = [
                          ...this.state.allFloorDetails.slice(0, selectedFloorIndex),
                          updatedFloor,
                          ...this.state.allFloorDetails.slice(selectedFloorIndex + 1)
                        ];
                    
    this.setState({selectedFloor:updatedFloor, allFloorDetails:updatedFloorDetail});

    this.showStatusProgress("Supression de section", "Supression de la section "+section.label+" de l'étage " + this.state.selectedFloor.label + " en cours");

    //just need to update the floor, the section has laready been removed
    axios.put("/projetkhiron/floor", updatedFloor)
    .then((response) => {
      //console.log(response);
      if (response.status === 200) {
        this.setState({
          openAlert:true, 
          alertMessage:"Supprimer",
          alertType:"success", 
        });
      }

      }).catch(error => {
        this.setState({
          openAlert:true, 
          alertMessage:error.message,
          alertType:"error", 
        });
        console.log("error" +error);
        //if (error) throw error;
      }).finally(() => {
        this.hideStatusProgress()
      });
  }

  showConfirmDeleteFloor(floor){
    this.setState({
      confirmDlgTitle:"Suppession d'étage", 
      confirmDlgMessage:"Etes-vous certain de vouloir supprimer l'étage "+floor.label+"?", 
      confirmDlgCancelLablel:"Annuler", 
      confirmDlgComfirmLablel:"Supprimer", 
      confirmDlgComfirmAction:() => this.handleDeleteFloor(floor),
    });
    this.confirmDlgRef.current.showDialog();
  }

  showConfirmDeleteSection(section){
    this.setState({
      confirmDlgTitle:"Suppession de section", 
      confirmDlgMessage:"Etes-vous certain de vouloir supprimer la section "+section.label+" de l'étage "+this.state.selectedFloor.label+"?", 
      confirmDlgCancelLablel:"Annuler", 
      confirmDlgComfirmLablel:"Supprimer", 
      confirmDlgComfirmAction:() => this.handleDeleteSection(section),
    });
    this.confirmDlgRef.current.showDialog();
  }

  showConfirmFloorNotSaved(currentFloor, nextFloor) {
    this.setState({
      confirmDlgTitle:"Modification d'étage non sauvegarder", 
      confirmDlgMessage:"Vous avez apporter des modification à l'étage "+currentFloor.label+" qui non pas été sauvegarder. Si vous Continuer tout vos chnagement seront perdus. Clicker sur Annuler opur revenir en arrière et sauvegarder vos changement.", 
      confirmDlgCancelLablel:"Annuler", 
      confirmDlgComfirmLablel:"Continuer", 
      confirmDlgComfirmAction:() => {this.loadFloorList();this.loadFloorDetailsForEdit(nextFloor)},
    });
    this.confirmDlgRef.current.showDialog();
  }

  render () {
  const { classes } = this.props;
  return (
    <Paper elevation={0} style={{ height: "100%" }} >

      <Snackbar open={this.state.openAlert} autoHideDuration={1000} onClose={this.handleCloseAlert.bind(this)}>
        <Alert onClose={this.handleCloseAlert.bind(this)} severity={this.state.alertType}>
          {this.state.alertMessage}
        </Alert>
      </Snackbar>

      <StatusProgress ref={this.statusProgressRef} title={this.state.statusTitle} message={this.state.statusMessage} />

      <ConfirmDialog 
          ref={this.confirmDlgRef}
          title={this.state.confirmDlgMsg} 
          message={this.state.confirmDlgMessage}
          cancelLabel={this.state.confirmDlgCancelLablel}
          confirmLabel={this.state.confirmDlgComfirmLablel}
          onConfirm={this.state.confirmDlgComfirmAction}
          />

      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} width='100%' >
                <TableContainer>
                  <Table style={{ border: 'none' }} size="small">
                    <TableBody style={{ border: 'none' }}>
                      <TableRow style={{ borderBottom: 'none' }}>
                        <TableCell className={classes.pageHeader} style={{ borderBottom: 'none' }}>
                          <Typography variant="h6" gutterBottom>
                            Configuration des lits sur les étages
                          </Typography>  
                        </TableCell>
                        <TableCell align="right" style={{ borderBottom: 'none' }}>
                          <Grid container
                            direction="row"
                            justify="flex-end"
                            spacing={2}>
                            <Grid item>
                              <Button variant="contained" color="secondary" disabled={!this.state.modified} onClick={this.handledSaveSelectedFloor.bind(this)}>
                                  Sauvegarder
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button variant="contained" color="primary" disabled={this.state.newFloor} startIcon={<AddCircleOutlineIcon />} onClick={this.handleNewFloor.bind(this)}>
                                Nouvel étage
                              </Button>
                           </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.floorListSection} >
                {this.state.loading?
                <Paper className={classes.rolePropertySections}><LinearProgress /></Paper>
                :
                <Paper className={classes.rolePropertySections}>
                  <FloorList floors={this.state.allFloorDetails} selectedID={(this.state.selectedFloor)?this.state.selectedFloor._id:''} onSelectedFloor={this.handleSelectedFloor.bind(this)} onDelete={(floor) => this.showConfirmDeleteFloor.bind(this,floor)}/>
                  {this.state.selectedFloor ?
                    <>
                    <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={this.handleNewSection.bind(this)}>
                          Nouvelle section
                    </Button>                 
                    <SectionList sections={this.state.selectedFloor.sections} selectedID={(this.state.selectedSection)?this.state.selectedSection._id:''} onSelectedSection={this.handleSelectedSection.bind(this)} onDelete={(section) => this.showConfirmDeleteSection.bind(this,section)}/>
                    </>
                  : null}
                </Paper>
                }
              </TableCell>
              <TableCell width="100%" height="100%">
                <Paper className={classes.rolePropertySections}>
                  <TableContainer size="small" style={{ border: '1px' }} >
                    <Table size="small" >
                      <TableBody>
                        <TableRow>
                          <TableCell style={{ borderBottom: 'none', width: 200 }}>
                            {this.state.selectedFloor ?
                              <TextField id="edit-floor-label" label="Identifiant étage" value={this.state.selectedFloor.label} onChange={this.handleFloorLabelChange.bind(this)} style={{ width: 200 }} />
                              :
                              <TextField id="edit-floor-label-dis" label="Identifiant étage" disabled value="" style={{ width: 200 }} />
                            }
                          </TableCell>
                          <TableCell style={{ borderBottom: 'none' }} >
                            {this.state.selectedSection ?
                              <TextField id="edit-section-label" label="Identifiant de la section" value={this.state.selectedSection.label} onChange={this.handleSectionLabelChange.bind(this)} style={{ width: 200 }} />
                              :  null}
                          </TableCell>
                          <TableCell width="100%">
                            <Typography id="discrete-slider-small-steps" gutterBottom>
                              Taille des lits
                            </Typography>
                            <Slider
                              value={this.state.bedSize}
                              onChange={this.handleBedSizeChange.bind(this)}
                              aria-labelledby="discrete-slider-small-steps"
                              step={0.1}
                              min={0.1}
                              max={2.0}
                              style={{maxWidth:200}}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ borderBottom: 'none', width: 400 }}>
                            {this.state.selectedFloor ?
                              <TextField id="edit-floor-desc" label="Description de l'étage" value={this.state.selectedFloor.description} onChange={this.handleFloorDescriptionChange.bind(this)} style={{ width: 400 }} />
                              :
                              <TextField id="edit-floor-desc-dis" label="Description de l'étage" disabled value="" style={{ width: 400 }} />
                            }
                          </TableCell>
                          <TableCell style={{ borderBottom: 'none', width: 400 }}>
                            {this.state.selectedSection?
                              <TextField id="edit-section-desc" label="Description de la section" value={this.state.selectedSection.description} onChange={this.handleSectionDescriptionChange.bind(this)} style={{ width: 400 }} />
                              : null}
                          </TableCell>
                          <TableCell width="100%">
                          {(this.state.selectedFloor || this.state.selectedSection) ?
                              <TextField id="edit-floor-layout" label="Layout" value={this.state.selectedSection?this.state.selectedSection.layout:this.state.selectedFloor.layout} onChange={this.handleFloorLayoutChange.bind(this)} style={{ width: 400 }} />
                              : <TextField id="edit-floor-layout-dis" label="Layout" value="" disabled style={{ width: 400 }} />}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TableContainer size="small">
                    <Table size="small" >
                      <TableBody>
                        <TableRow>
                          <TableCell style={{ borderBottom: 'none',width: 900 }}>
                            <FloorSvgEditor 
                              ref={floorSvgEditorRef => { this.floorEditor = floorSvgEditorRef }}
                              viewBox="0 0 1200 800" 
                              width={900} 
                              height={600} 
                              bedSize={this.state.bedSize} 
                              layout={this.state.selectedSection?this.state.selectedSection.layout:(this.state.selectedFloor?this.state.selectedFloor.layout:'')}
                              loading={this.state.loading}
                              onBedUpdates={this.handleBedUpdates.bind(this)}
                              />
                          </TableCell>
                          <TableCell style={{ borderBottom: 'none',verticalAlign: 'top' }}>
                            <Paper>
                            <Grid
                              container
                              direction="column"
                              justify="flex-start"
                              alignItems="flex-start"
                            >
                              <Grid item >
                                <Typography variant="subtitle1">
                                  Ajout de lit
                                </Typography>
                              </Grid>
                              <Grid item >
                              {((this.state.selectedFloor && !this.state.selectedFloor.useSections) || this.state.selectedSection) ?
                                <TextField id="edit-bed-id-pattern" label="Modèle de numérotation" value={this.state.newBedsPattern} onChange={this.handleNewBedsPattern.bind(this)} style={{ width: '300px' }}/>
                                :
                                <TextField id="edit-bed-id-pattern-dis" label="Modèle de numérotation" value="" disabled style={{ width: '300px' }}/>
                              }
                              </Grid>
                              <Grid item >
                              {((this.state.selectedFloor && !this.state.selectedFloor.useSections) || this.state.selectedSection) ?
                                <TextField id="edit-bed-add-count" label="Nombre de lit" value={this.state.newBedsCount} onChange={this.handleNewBedsCount.bind(this)} style={{ width: '100px' }}/>
                                :
                                <TextField id="edit-bed-add-count-dis" label="Nombre de lit" value="" disabled style={{ width: '100px' }}/>
                              }
                              </Grid>
                              <Grid item >
                              {((this.state.selectedFloor && !this.state.selectedFloor.useSections) || this.state.selectedSection) ?
                                <Button  variant="contained" color="primary" onClick={() => this.floorEditor.addNewBeds(this.state.newBedsPattern,this.state.newBedsCount)}>
                                  Ajouter Lit(s)
                                </Button>
                                :
                                <Button  id="add-bed-btn-dis" variant="contained" color="primary" disabled>
                                Ajouter Lit(s)
                              </Button>
                              }
                              </Grid>
                              <Grid item style={{height:20}}>
                              <div> </div>
                              </Grid>
                              {/* <Grid container item justify="flex-end">
                              <Button variant="contained" color="primary" disabled={!this.state.modified} onClick={this.handledSaveSelectedFloor.bind(this)}>
                                Sauvegarder
                              </Button>
                              </Grid> */}
                            </Grid>
                            </Paper>
                          </TableCell>
                       </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>


                </Paper>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>)
  };
}

export default withStyles(useStyles)(FloorConfigurations);
