import React, { useState, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
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

}));

const allFloorDetails = [
  {
    id: 7,
    label: '7',
    description: 'Post operatoire',
    useSections: false,
    layout: "../assets/testfloor1.svg",
    beds: [
      {
        id: 1,
        label: "701-01",
        x: 20,
        y: 20,
        w: 30,
        h: 50,
        rot: 0
      },
      {
        id: 2,
        label: "701-02",
        x: 80,
        y: 80,
        w: 30,
        h: 50,
        rot: 45
      }
    ]
  },
  {
    id: 8,
    label: '8',
    description: 'Post operatoire',
    useSections: true,
    layout : null,
    sections: [
      {
        id: 1,
        label: 'Est',
        description: "Chirurgie d'un jour",
        layout: "../assets/testfloor1.svg",
        beds: [
          {
            id: 1,
            label: "801-01",
            x: 50,
            y: 50,
            w: 30,
            h: 50,
            rot: 45
          },
          {
            id: 2,
            label: "801-02",
            x: 100,
            y: 100,
            w: 30,
            h: 50,
            rot: 90
          }
        ]
      },
      {
        id: 2,
        label: 'Ouest',
        description: "Chirurgie plus d'un jour",
        layout: '',
        beds: []
      }
    ]
  }
];

function FloorList(props) {
  //const classes = useStyles();
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
            key={floor.id}
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
  //const classes = useStyles();
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
            key={section.id}
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

function FloorConfigurations(props) {
  const classes = useStyles();
  const [selectedFloor, setSelectedFloor] = useState();
  const [selectedSection, setSelectedSection] = useState();
  const floorEditor = useRef(null);

  //const [beds, setBeds] = useState([]);
  const [selectionModified, setSelectionModified] = useState(false);
  const [layout, setLayout] = useState("");
  const [bedSize, setBedSize] = useState(1.0);

  const [newBedsPattern, setNewBedsPattern] = useState("7[0-9][0-9]-0[1-2]");
  const [newBedsCount, setNewBedsCount] = useState(0);

  const handleSelectedFloor = (floor) => {
    setSelectedFloor(floor);
    setSelectedSection(null);
    if(!floor.useSections) {
      //setBeds([...floor.beds]); //copy beds
      floorEditor.current.editSelectionBeds(floor.beds);
      setSelectionModified(false);
      setLayout(floor.layout);
    } else {
      //setBeds(null);
      floorEditor.current.editSelectionBeds([]);
      setLayout("");
    }
  };


  const handleSelectedSection = (section) => {
    setSelectedSection(section);
    //setBeds([...section.beds]); // copy beds
    floorEditor.current.editSelectionBeds(section.beds);
    setSelectionModified(false);
    setLayout(section.layout);
  };

  
  const handleNewBedsCount = (event) => {
    setNewBedsCount(event.target.value);
  };

  const handleNewBedsPattern = (event) => {
    setNewBedsPattern(event.target.value);
  };

  const handleFloorUseSectionChange = (event) => {
    let updatedFloor = {...selectedFloor, useSections: event.target.checked};
    setSelectedFloor(updatedFloor);
  };

  const handleFloorLabelChange = (event) => {
    let updatedFloor = {...selectedFloor, label: event.target.value};
    setSelectedFloor(updatedFloor);
  };
  const handleFloorDescriptionChange = (event) => {
    let updatedFloor = {...selectedFloor, description: event.target.value};
    setSelectedFloor(updatedFloor);
  };
  const handleSectionLabelChange = (event) => {
    let updatedSection = {...selectedSection, label: event.target.value};
    setSelectedSection(updatedSection);
  };
  const handleSectionDescriptionChange = (event) => {
    let updatedSection = {...selectedSection, description: event.target.value};
    setSelectedSection(updatedSection);
  };
  const handleBedSizeChange = (event,value) => {
    setBedSize(value);
  };
  const handleFloorLayoutChange = (event) => {
    if(selectedSection) {
      let updatedSection = {...selectedSection, layout: event.target.value};
      setSelectedSection(updatedSection);
    } else if (selectedFloor){
      let updatedFloor = {...selectedFloor, layout: event.target.value};
      setSelectedFloor(updatedFloor);
    }
    setLayout(event.target.value);
  };


  let floorEditorCpt;
  //if((selectedFloor && selectedFloor.useSections && selectedSection) || (selectedFloor && !selectedFloor.useSections)){
    floorEditorCpt = <FloorSvgEditor 
    ref={floorEditor}
    viewBox="0 0 1200 800" 
    width={900} 
    height={600} 
    bedSize={bedSize} 
    layout={layout}
    />;
  // } else {
  //   floorEditorCpt = <div></div>;
  // }

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
                <Paper className={classes.rolePropertySections}>
                  <FloorList floors={allFloorDetails} onSelectedFloor={handleSelectedFloor} />
                  {selectedFloor?
                  <FormControlLabel
                    classes={{ label: classes.checkBoxFont }}
                    control={
                      <Checkbox
                        id="edit-floor-use-sections"
                        size="small"
                        checked={selectedFloor.useSections}
                        onChange={handleFloorUseSectionChange}
                        name="floor-use-sections"
                        color="primary"
                      />
                    }
                    label="Utilisations de section pour cet étage" /> 
                    : null}

                  {selectedFloor && selectedFloor.useSections ?
                    <SectionList sections={selectedFloor.sections} onSelectedSection={handleSelectedSection} />
                    : null}
                </Paper>
              </TableCell>
              <TableCell width="100%" height="100%">
                <Paper className={classes.rolePropertySections}>
                  <TableContainer size="small" style={{ border: '1px' }} >
                    <Table size="small" >
                      <TableBody>
                        <TableRow>
                          <TableCell style={{ borderBottom: 'none', width: 200 }}>
                            {selectedFloor ?
                              <TextField id="edit-floor-label" label="Identifiant étage" value={selectedFloor.label} onChange={handleFloorLabelChange} style={{ width: 200 }} />
                              :
                              <TextField id="edit-floor-label-dis" label="Identifiant étage" disabled value="" style={{ width: 200 }} />
                            }
                          </TableCell>
                          <TableCell style={{ borderBottom: 'none' }} >
                            {(selectedFloor && selectedFloor.useSections && selectedSection) ?
                              <TextField id="edit-section-label" label="Identifiant de la section" value={selectedSection.label} onChange={handleSectionLabelChange} style={{ width: 200 }} />
                              : (selectedFloor && selectedFloor.useSections) ?
                                <TextField id="edit-section-label-dis" label="Identifiant de la section" disabled value="" style={{ width: 200 }} />
                                : null}
                          </TableCell>
                          <TableCell width="100%">
                            <Typography id="discrete-slider-small-steps" gutterBottom>
                              Taille des lits
                            </Typography>
                            <Slider
                              value={bedSize}
                              onChange={handleBedSizeChange}
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
                            {selectedFloor ?
                              <TextField id="edit-floor-desc" label="Description de l'étage" value={selectedFloor.description} onChange={handleFloorDescriptionChange} style={{ width: 400 }} />
                              :
                              <TextField id="edit-floor-desc-dis" label="Description de l'étage" disabled value="" style={{ width: 400 }} />
                            }
                          </TableCell>
                          <TableCell style={{ borderBottom: 'none', width: 400 }}>
                            {(selectedFloor && selectedFloor.useSections && selectedSection) ?
                              <TextField id="edit-section-desc" label="Description de la section" value={selectedSection.description} onChange={handleSectionDescriptionChange} style={{ width: 400 }} />
                              : (selectedFloor && selectedFloor.useSections) ?
                                <TextField id="edit-section-desc-dis" label="Description de la section" value="" disabled style={{ width: 400 }} />
                                : null}
                          </TableCell>
                          <TableCell width="100%">
                          {((selectedFloor && !selectedFloor.useSections) || selectedSection) ?
                              <TextField id="edit-floor-layout" label="Layout" value={layout} onChange={handleFloorLayoutChange} style={{ width: 400 }} />
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
                            {floorEditorCpt}
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
                              {((selectedFloor && !selectedFloor.useSections) || selectedSection) ?
                                <TextField id="edit-bed-id-pattern" label="Modèle de numérotation" value={newBedsPattern} onChange={handleNewBedsPattern} style={{ width: '300px' }}/>
                                :
                                <TextField id="edit-bed-id-pattern-dis" label="Modèle de numérotation" value="" disabled style={{ width: '300px' }}/>
                              }
                              </Grid>
                              <Grid item >
                              {((selectedFloor && !selectedFloor.useSections) || selectedSection) ?
                                <TextField id="edit-bed-add-count" label="Nombre de lit" value={newBedsCount} onChange={handleNewBedsCount} style={{ width: '100px' }}/>
                                :
                                <TextField id="edit-bed-add-count-dis" label="Nombre de lit" value="" disabled style={{ width: '100px' }}/>
                              }
                              </Grid>
                              <Grid item >
                              {((selectedFloor && !selectedFloor.useSections) || selectedSection) ?
                                <Button  variant="contained" color="primary" onClick={() => floorEditor.current.addNewBeds(newBedsPattern,newBedsCount)}>
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
    </Paper>);
}

export default FloorConfigurations;
