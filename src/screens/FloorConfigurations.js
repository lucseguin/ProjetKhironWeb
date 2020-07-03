import React, { useState, useRef, Component } from "react";
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
import CircularProgress from '@material-ui/core/CircularProgress';

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

// const allFloorDetails = [
//   {
//     id: 7,
//     label: '7',
//     description: 'Post operatoire',
//     useSections: false,
//     layout: "../assets/testfloor1.svg",
//     beds: [
//       {
//         id: 1,
//         label: "701-01",
//         x: 20,
//         y: 20,
//         w: 30,
//         h: 50,
//         rot: 0
//       },
//       {
//         id: 2,
//         label: "701-02",
//         x: 80,
//         y: 80,
//         w: 30,
//         h: 50,
//         rot: 45
//       }
//     ]
//   },
//   {
//     id: 8,
//     label: '8',
//     description: 'Post operatoire',
//     useSections: true,
//     layout : null,
//     sections: [
//       {
//         id: 1,
//         label: 'Est',
//         description: "Chirurgie d'un jour",
//         layout: "../assets/testfloor1.svg",
//         beds: [
//           {
//             id: 1,
//             label: "801-01",
//             x: 50,
//             y: 50,
//             w: 30,
//             h: 50,
//             rot: 45
//           },
//           {
//             id: 2,
//             label: "801-02",
//             x: 100,
//             y: 100,
//             w: 30,
//             h: 50,
//             rot: 90
//           }
//         ]
//       },
//       {
//         id: 2,
//         label: 'Ouest',
//         description: "Chirurgie plus d'un jour",
//         layout: '',
//         beds: []
//       }
//     ]
//   }
// ];

function FloorList(props) {
  const classes = makeStyles(useStyles)();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleListItemClick = (event, index, floor) => {
    setSelectedIndex(index);
    props.onSelectedFloor(floor);
  };

  return (
    <div>
      <Typography variant="subtitle1">
        Étages
      </Typography>
      <Divider />
      <List component="nav" aria-label="Floors">
        {props.floors.map((floor, index) => (
          <ListItem
            button
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index, floor)}
            key={floor._id}
          >
            <ListItemText primary={floor.label} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
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
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleListItemClick = (event, index, section) => {
    setSelectedIndex(index);
    props.onSelectedSection(section);
  };

  return (
    <div>
      <Typography variant="subtitle1">
        Sections
      </Typography>
      <Divider />
      <List component="nav" aria-label="Floors">
        {props.sections.map((section, index) => (
          <ListItem
            button
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index, section)}
            key={section._id}
          >
            <ListItemText primary={section.label} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
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
  }

  state = {
    selectedFloor: null,
    selectedSection: null,
    beds: [],
    selectionModified: false,
    layout: "",
    bedSize: 1.0,
    newBedsPattern:"7[0-9][0-9]-0[1-2]",
    newBedsCount:0,
    allFloorDetails:[],
    loadingFloors:true,
    loadingBeds:false,
  };

 


  componentDidMount () {
    axios.get("/projetkhiron/floors")
    .then((response) => {
      if(response.status === 200) {
        this.setState({allFloorDetails: response.data, loadingFloors:false});
      }
    }, (error) => {
      console.log(error);
    });
  }

  handleSelectedFloor(floor){
    if(!floor.useSections) {
      //get beds
      this.setState({loadingBeds:true});

      axios.get("/projetkhiron/beds/" + floor._id)
      .then((response) => {
        if(response.status === 200) {
          this.setState({selectedFloor:floor, selectedSection:null, beds:response.data, selectionModified:false, layout:floor.layout});
          this.floorEditor.editSelectionBeds(this.state.beds);
        }
      }).catch(error => {
        console.log("error" +error);
        if (error) throw error;
      }).finally(() => {
        this.setState({loadingBeds:false});
      });

    } else {
      this.setState({selectedFloor:floor, selectedSection:null,beds:[], layout:""});
      this.floorEditor.editSelectionBeds([]);
    }
  }


  handleSelectedSection(section) {

    this.setState({loadingBeds:true});
    axios.get("/projetkhiron/beds/" + section._id)
    .then((response) => {
      if(response.status === 200) {
        this.setState({selectedSection:section, beds:response.data, selectionModified:false, layout:section.layout});
        this.floorEditor.editSelectionBeds(this.state.beds);
      }
    }).catch(error => {
      console.log("error" +error);
      if (error) throw error;
    }).finally(() => {
      this.setState({loadingBeds:false});
    });
  }

  handleNewBedsCount(event) {
    this.setState({newBedsCount:event.target.value});
  }

  handleNewBedsPattern(event) {
    this.setState({newBedsPattern:event.target.value});
  }

  handleFloorUseSectionChange (event) {
    let updatedFloor = {...this.state.selectedFloor, useSections: event.target.checked};
    this.setState({selectedFloor:updatedFloor, selectionModified:true});
  }

  handleFloorLabelChange(event) {
    let updatedFloor = {...this.state.selectedFloor, label: event.target.value};
    this.setState({selectedFloor:updatedFloor, selectionModified:true});
  }
  handleFloorDescriptionChange(event) {
    let updatedFloor = {...this.state.selectedFloor, description: event.target.value};
    this.setState({selectedFloor:updatedFloor, selectionModified:true});
  }
  handleSectionLabelChange (event) {
    let updatedSection = {...this.state.selectedSection, label: event.target.value};
    this.setState({selectedSection:updatedSection, selectionModified:true});
  }
  handleSectionDescriptionChange(event) {
    let updatedSection = {...this.state.selectedSection, description: event.target.value};
    this.setState({selectedSection:updatedSection, selectionModified:true});
  }
  handleBedSizeChange (event,value) {
    this.setState({bedSize:value, selectionModified:true});
  }

  handleFloorLayoutChange(event) {
    if(this.state.selectedSection) {
      let updatedSection = {...this.state.selectedSection, layout: event.target.value};
      this.setState({selectedSection:updatedSection, selectionModified:true, layout:event.target.value});
    } else if (this.state.selectedFloor){
      let updatedFloor = {...this.state.selectedFloor, layout: event.target.value};
      this.setState({selectedFloor:updatedFloor, selectionModified:true, layout:event.target.value});
    }
  }

  render () {
  const { classes } = this.props;
  return (
    <Paper elevation={0} style={{ height: "100%" }} >
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
                          <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>
                            Nouvel étage
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.floorListSection} >
                {this.state.loadingFloors?
                <Paper className={classes.rolePropertySections}><CircularProgress /></Paper>
                :
                <Paper className={classes.rolePropertySections}>
                  <FloorList floors={this.state.allFloorDetails} onSelectedFloor={this.handleSelectedFloor.bind(this)} />
                  {this.state.selectedFloor?
                  <FormControlLabel
                    classes={{ label: classes.checkBoxFont }}
                    control={
                      <Checkbox
                        id="edit-floor-use-sections"
                        size="small"
                        checked={this.state.selectedFloor.useSections}
                        onChange={this.handleFloorUseSectionChange.bind(this)}
                        name="floor-use-sections"
                        color="primary"
                      />
                    }
                    label="Utilisations de section pour cet étage" /> 
                    : null}

                  {this.state.selectedFloor && this.state.selectedFloor.useSections ?
                    <SectionList sections={this.state.selectedFloor.sections} onSelectedSection={this.handleSelectedSection.bind(this)} />
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
                            {(this.state.selectedFloor && this.state.selectedFloor.useSections && this.state.selectedSection) ?
                              <TextField id="edit-section-label" label="Identifiant de la section" value={this.state.selectedSection.label} onChange={this.handleSectionLabelChange.bind(this)} style={{ width: 200 }} />
                              : (this.state.selectedFloor && this.state.selectedFloor.useSections) ?
                                <TextField id="edit-section-label-dis" label="Identifiant de la section" disabled value="" style={{ width: 200 }} />
                                : null}
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
                            {(this.state.selectedFloor && this.state.selectedFloor.useSections && this.state.selectedSection) ?
                              <TextField id="edit-section-desc" label="Description de la section" value={this.state.selectedSection.description} onChange={this.handleSectionDescriptionChange.bind(this)} style={{ width: 400 }} />
                              : (this.state.selectedFloor && this.state.selectedFloor.useSections) ?
                                <TextField id="edit-section-desc-dis" label="Description de la section" value="" disabled style={{ width: 400 }} />
                                : null}
                          </TableCell>
                          <TableCell width="100%">
                          {((this.state.selectedFloor && !this.state.selectedFloor.useSections) || this.state.selectedSection) ?
                              <TextField id="edit-floor-layout" label="Layout" value={this.state.layout} onChange={this.handleFloorLayoutChange.bind(this)} style={{ width: 400 }} />
                              : <TextField id="edit-floor-layout" label="Layout" value="" disabled style={{ width: 400 }} />}
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
                              layout={this.state.layout}
                              loading={this.state.loadingBeds}
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
                                <Button  variant="contained" color="primary" onClick={() => this.floorEditor.current.addNewBeds(this.state.newBedsPattern,this.state.newBedsCount)}>
                                  Ajouter Lit(s)
                                </Button>
                                :
                                <Button  id="add-bed-btn-dis" variant="contained" color="primary" disabled>
                                Ajouter Lit(s)
                              </Button>
                              }
                              </Grid>
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
