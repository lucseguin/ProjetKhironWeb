import React, {useState, useRef, useEffect} from "react";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import { Container, Draggable } from "react-smooth-dnd";
import arrayMove from "array-move";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { CanvasWidget, Action, InputType} from '@projectstorm/react-canvas-core';
import createEngine, { DiagramModel, DefaultNodeModel } from '@projectstorm/react-diagrams';
import { BedStatusWorkspaceWidget } from '../components/BedStatusWorkspaceWidget';
import { BedStatusCanvasWidget } from '../components/BedStatusCanvasWidget';
import BedStatusNodeDetailEditor from '../components/BedStatusNodeDetailEditor'
import * as _ from 'lodash';

class MyDeleteItemsAction extends Action {
	constructor() {
		const keyCodes =[46, 8];

		super({
			type: InputType.KEY_DOWN,
			fire: (e) => {
				const { keyCode, shiftKey} = e.event;

				if (keyCodes.indexOf(keyCode) !== -1 && shiftKey === true) {
					_.forEach(this.engine.getModel().getSelectedEntities(), (model) => {
						// only delete items which are not locked
						if (!model.isLocked()) {
              model.remove();
              
              //TODO//On Delete need to clear all current editing
						}
					});
					this.engine.repaintCanvas();
				}
			}
		});
	}
}

function BedConfiguration(props) {
  //1) setup the diagram engine
  
  const [engine] = useState(createEngine({ registerDefaultDeleteItemsAction: false }));
  const [model] = useState(new DiagramModel()); 
  engine.maxNumberPointsPerLink = 0;
  engine.setModel(model);
  engine.getActionEventBus().registerAction(new MyDeleteItemsAction() );
  
  model.registerListener({
    linksUpdated: e => linkEvents(e),
    nodesUpdated: e => nodesEvents(e)
  });

  const linkEvents = (e) => {
    if (e.isCreated) {
      e.link.registerListener({
        selectionChanged: (event) => {
          console.log(event);
          if(statusNodeEditor.current && event) {
            if(event.isSelected)
              statusNodeEditor.current.editSelectedLink(event.entity);
            else
              statusNodeEditor.current.editSelectedLink(null);
          }
        }
      });
    } else {
      statusNodeEditor.current.editSelectedLink(null);
    }
  }
  const nodesEvents = (e) => {
    if (!e.isCreated) {
      statusNodeEditor.current.editSelectedNode(null);
    }
  }

  useEffect(() => {
    generateNodes(model)
  },[engine]);


  function generateNodes(forModel) {
    //3-A) create a default node
    var n1 = new DefaultNodeModel('Lit prêt', 'rgb(0,192,255)');
    var n1out = n1.addOutPort('Sortie');
    var n1in = n1.addInPort('Entrée');
    n1.setPosition(300, 50 );


    var n2 = new DefaultNodeModel('Assigner', 'rgb(0,192,255)');
    var n2out = n2.addOutPort('Sortie');
    var n2in = n2.addInPort('Entrée');
    n2.setPosition(500, 250 );

    var n3 = new DefaultNodeModel('Hygiène et salubrité', 'rgb(0,192,255)');
    var n3out = n3.addOutPort('Sortie');
    var n3in = n3.addInPort('Entrée');
    n3.setPosition(100, 250 );

    let models = forModel.addAll(n1, n2, n3);
    
    models.forEach((item) => {
      item.registerListener({
        selectionChanged: (e) => {
          if(statusNodeEditor.current && e) {
            if(e.isSelected)
              statusNodeEditor.current.editSelectedNode(e.entity);
            else
              statusNodeEditor.current.editSelectedNode(null);
          }
        },
      });  
    });

    //3-C) link the 2 nodes together
    const link1 = n1out.link(n2in);
	  link1.addLabel('Assigner');
    forModel.addLink(link1);

    const link2 = n2out.link(n3in);
	  link2.addLabel('Libérer');
    forModel.addLink(link2);

    const link3 = n3out.link(n1in);
	  link3.addLabel('Nettoyer');
    forModel.addLink(link3); 
    //4) add the models to the root graph

    engine.registerListener({
      selectionChanged: (e) => {
        console.log("[BedConfiguration] selectionChanged:"+ e);
      },
    }); 

  }


  const [items, setItems] = useState([
    { id: "1", text: "Patient", type:"5", items :[
      { id: "1", text: "Dossier", type:"5"},
      { id: "2", text: "Diagnostique", type:"5", max:0, mandatory:true, mlAlgo:""},
      { id: "3", text: "Code postal", type:"5"},
      { id: "4", text: "Medecin Traitant", type:"5"},
      { id: "5", text: "Specialization Medecin Traitant", type:"5"},
    ] },
    { id: "3", text: "Assigné le" , type:"3" },
    { id: "4", text: "Estimé du séjour", type:"2", min:0, max:365, mlAlgo:"1" },

    { id: "6", text: "NSA", type:"4", multi:false, items :[
      { id: "1", text: "SAD"},
      { id: "2", text: "CHSLD"},
      { id: "3", text: "Conval"},
      { id: "4", text: "OJ"},
      { id: "5", text: "PO"},
      { id: "6", text: "Residence privée"},
      { id: "7", text: "RM"},
      { id: "8", text: "PQ"},
      { id: "9", text: "RIS"},
    ]},
    { id: "7", text: "ISO", type:"4", multi: false, items:[
      { id: "1", text: "Précaution de contact"},
      { id: "2", text: "Précaution de contact x 2"},
      { id: "3", text: "Précaution de contact +"},
      { id: "4", text: "Précaution de goutelettes"},
      { id: "5", text: "Précaution de aériennes"},
      { id: "6", text: "Précaution de contact et goutelettes"},
      { id: "7", text: "Précaution de contact et aériennes"},
      { id: "8", text: "Isolation inversée"},
    ]},

    { id: "9", text: "Profesionnels requis", type:"4", multi:true, items:[
      { id: "1", text: "Ergo therapeute"},
      { id: "2", text: "Inhalo therapeute"},
      { id: "3", text: "Physio therapeute"},
    ] },
  ]);

  const bedPropType = [
    { id: "1", text: "Text" },
    { id: "2", text: "Numerique" },
    { id: "3", text: "Date" },
    { id: "4", text: "Liste" },
    { id: "5", text: "Lien HL7" },
    { id: "6", text: "Geo" },
  ];

  const mlRegressions = [
    { id: "1", text: "Régression linéraire - Estimé de séjour" },
  ];

  const mlClassification = [
   
  ];


  const [selectedProperty, setSelectedProperty] = useState();
  const [modified, setModified] = useState(false);
  const statusNodeEditor = useRef(null);

  const addNewBedStateNode = () => {
    var n1 = new DefaultNodeModel('Nouvel Etat', 'rgb(0,192,255)');
    n1.addOutPort('Sortie');
    n1.addInPort('Entrée');
    n1.registerListener({
      selectionChanged: (e) => {
        if(statusNodeEditor.current && e) {
          if(e.isSelected)
            statusNodeEditor.current.editSelectedNode(e.entity);
          else
            statusNodeEditor.current.editSelectedNode(null);
        }
      },
    }); 
    model.addAll(n1);
    engine.repaintCanvas();
    //forceUpdate();
  }

  const onSelectedPropertyChange = (item) => {
    setSelectedProperty(item);
  }

  const handlePropTextChange = (event) => {
    let updatedSelection = {...selectedProperty, text: event.target.value};
    setSelectedProperty(updatedSelection);
    setModified(true);
  }

  const handlePropTypeChange = (event) => {
    let updatedSelection = {...selectedProperty, type: event.target.value};
    setSelectedProperty(updatedSelection);
    setModified(true);
  }
  
  const handlePropMandatoryChange = (event) => {
    let updatedSelection = {...selectedProperty, mandatory: event.target.checked};
    setSelectedProperty(updatedSelection);
    setModified(true);
  }

  const handlePropTextMaxChange = (event) => {
    let updatedSelection = {...selectedProperty, max: event.target.value};
    setSelectedProperty(updatedSelection);
    setModified(true);
  }

  const handlePropMinChange = (event) => {
    let updatedSelection = {...selectedProperty, min: event.target.value};
    setSelectedProperty(updatedSelection);
    setModified(true);
  }
  
  const handlePropMLAlgo = (event) => {
    let updatedSelection = {...selectedProperty, mlAlgo: event.target.value};
    setSelectedProperty(updatedSelection);
    setModified(true);
  }
  
  const handlePropListMultiChange = (event) => {
    let updatedSelection = {...selectedProperty, multi: event.target.checked};
    setSelectedProperty(updatedSelection);
    setModified(true);
  }
  
  const onSelectedPropItemsDrop = ({ removedIndex, addedIndex }) => {
    let updatedSelection = {...selectedProperty, items: arrayMove(selectedProperty.items, removedIndex, addedIndex)};
    setSelectedProperty(updatedSelection);
    setModified(true);
  };
  const onDrop = ({ removedIndex, addedIndex }) => {
    setItems(theItems => arrayMove(theItems, removedIndex, addedIndex));
  };

  const handleNodeEditorUpdate = (n) => {
    let node = model.getNode(n.options.id)
    node.options.name = n.options.name;
    engine.repaintCanvas();
    //TODO:Persist change
  }

  const handleLinkEditorUpdate = (l, label) => {
    let link = model.getLink(l.options.id);

    if (link.labels.length > 0) {
      link.labels[0].options.label = label;
    } else {
      link.addLabel(label);
    }
    engine.repaintCanvas();
    //TODO:Persist change
  }

  




  let selectedPropertyElement;
  if(selectedProperty) {
    selectedPropertyElement = <TextField
      id="sel-prop-edit-type"
      key="sel-prop-edit-type"
      select
      label="Type"
      style={{ width: '200px' }}
      value={selectedProperty.type}
      onChange={handlePropTypeChange}
    >
      {bedPropType.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.text}
        </MenuItem>
      ))}
    </TextField>
    if(selectedProperty.type==="1") { //text
      selectedPropertyElement = [selectedPropertyElement,
        <TextField id="user-prop-text-char-num" key="user-prop-text-char-num" label="Nombre charactères max" value={selectedProperty.max} onChange={handlePropTextMaxChange} style={{ width: '400px' }}/>,
        <FormControlLabel
          key="user-prop-text-mandatory-check"
          control={
            <Checkbox
              size="small"
              name="user-prop-text-mandatory-check"
              id="user-prop-text-mandatory-check"
              color="primary"
              checked={selectedProperty.mandatory}
              onChange={handlePropMandatoryChange}
            />
          }
          label="Entrée obligatoire"
        />,
        <TextField
        id="user-prop-classif-ml-algo"
        key="user-prop-classif-ml-algo"
        select
        label="IA Prédiction - Valeur Initial"
        style={{ width: '400px' }}
        value={selectedProperty.mlAlgo}
        onChange={handlePropMLAlgo}
      >
        {mlClassification.map((mlAlgo) => (
          <MenuItem key={mlAlgo.id} value={mlAlgo.id}>
            {mlAlgo.text}
          </MenuItem>
        ))}
      </TextField>
      ];
    } else if(selectedProperty.type==="2") { //numerique
      selectedPropertyElement = [selectedPropertyElement,
        <TextField id="user-prop-min-val" key="user-prop-min-val" label="Valeur min" value={selectedProperty.min} onChange={handlePropMinChange} style={{ width: '400px' }}/>,
        <TextField id="user-prop-max-val" key="user-prop-max-val" label="Valeur max" value={selectedProperty.max} onChange={handlePropTextMaxChange} style={{ width: '400px' }}/>,
        <TextField
        id="user-prop-linreg-ml-algo"
        key="user-prop-linreg-ml-algo"
        select
        label="IA Prédiction - Valeur Initial"
        style={{ width: '400px' }}
        value={selectedProperty.mlAlgo}
        onChange={handlePropMLAlgo}
      >
        {mlRegressions.map((mlAlgo) => (
          <MenuItem key={mlAlgo.id} value={mlAlgo.id}>
            {mlAlgo.text}
          </MenuItem>
        ))}
      </TextField>
      ];
    } else if(selectedProperty.type==="4") { //liste
      selectedPropertyElement = [selectedPropertyElement,
        <TableContainer key="tbl-cont-prop-static-list" size="small" style={{ border: '1px' }} >
            <Table size="small" >
              <TableBody>
                <TableRow>
                  <TableCell style={{ width: '100%', borderBottom: 'none' }}>
                    <FormControlLabel
                      key="user-prop-text-mandatory-check"
                      control={
                        <Checkbox
                          size="small"
                          name="user-prop-list-multi"
                          id="user-prop-list-multi"
                          color="primary"
                          checked={selectedProperty.multi}
                          onChange={handlePropListMultiChange}
                        />
                      }
                      label="Multi selection"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='right' style={{ width: '100%', borderBottom: 'none' }}>
                    <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} >
                          Nouvel item
                    </Button>
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell style={{ borderBottom: 'none' }}>
                  <Paper elevation={3} >
                  <List style={{ width: '100%', maxHeight: 300, overflow: 'auto', border:1}}>
                    <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onSelectedPropItemsDrop} >
                      {selectedProperty.items.map((item) => (
                        <Draggable key={item.id}>
                          <ListItem>
                              <ListItemIcon className="drag-handle">
                                <DragHandleIcon />
                              </ListItemIcon>
                              <ListItemText primary={item.text} />
                              <ListItemSecondaryAction >
                                <IconButton aria-label="edit" size="small" >
                                  <EditIcon />
                                </IconButton >
                                <IconButton aria-label="delete" size="small">
                                  <DeleteIcon />
                                </IconButton >
                              </ListItemSecondaryAction>
                          </ListItem>
                        </Draggable>
                      ))}
                    </Container>
                  </List>
                  </Paper>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer> 
      ];
    }  else if(selectedProperty.type==="5") { //DB link (HL7)    
      selectedPropertyElement = [selectedPropertyElement,
        <TableContainer key="tbl-cont-prop-db-list" size="small" style={{ border: '1px' }} >
            <Table size="small" >
              <TableBody>
                <TableRow>
                  <TableCell align='right' style={{ width: '100%', borderBottom: 'none' }}>
                    <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} >
                          Lien additionel
                    </Button>
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell style={{ borderBottom: 'none' }}>
                  <Paper elevation={3} >
                  <List style={{ width: '100%', maxHeight: 300, overflow: 'auto', border:1}}>
                    <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onSelectedPropItemsDrop} >
                      {selectedProperty.items.map((item) => (
                        <Draggable key={item.id}>
                          <ListItem>
                              <ListItemIcon className="drag-handle">
                                <DragHandleIcon />
                              </ListItemIcon>
                              <ListItemText primary={item.text} />
                              <ListItemSecondaryAction >
                                <IconButton aria-label="edit" size="small" >
                                  <EditIcon />
                                </IconButton >
                                <IconButton aria-label="delete" size="small">
                                  <DeleteIcon />
                                </IconButton >
                              </ListItemSecondaryAction>
                          </ListItem>
                        </Draggable>
                      ))}
                    </Container>
                  </List>
                  </Paper>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>];
    }
  } else {
    selectedPropertyElement =  <TextField
    id="sel-prop-edit-type-dis"
    select
    label="Type"
    style={{ width: '200px' }}
    disabled
    value=""
  >
      {bedPropType.map((option) => (
        <MenuItem key={option.id} value={option.id}>
          {option.text}
        </MenuItem>
      ))}
  </TextField>;   
  }

  //function generateNodes(model: DiagramModel, offsetX: number, offsetY: number) {

  // selectedProperty.type==="1"?:null

  return (
    <Paper elevation={0} style={{ height: "100%", verticalAlign: 'top', alignItems: 'top',
    justifyContent: 'top', }}>
      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} style={{ width:'100%' }}>
                <Typography variant="h6" gutterBottom>
                  Configurations des informations capturés pour chaque lits
                </Typography>  
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{minWidth: 400, maxWidth: 400, maxHeight: 600, verticalAlign: 'top', alignItems: 'top',
    justifyContent: 'top'}}  >
                <Paper elevation={3} style={{minWidth: 400, maxWidth: 400, maxHeight: 600, overflow: 'auto'}}>
                  <List >
                    <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop} >
                      {items.map((item) => (
                        <Draggable key={item.id}>
                          <ListItem>

                              <ListItemIcon className="drag-handle">
                                <DragHandleIcon />
                              </ListItemIcon>

                            <ListItemText primary={item.text} />

                              <ListItemSecondaryAction >
                                <IconButton aria-label="edit" size="small" onClick={() => onSelectedPropertyChange(item)}>
                                  <EditIcon />
                                </IconButton >
                                <IconButton aria-label="delete" size="small">
                                  <DeleteIcon />
                                </IconButton >
                              </ListItemSecondaryAction>

                          </ListItem>
                        </Draggable>
                      ))}
                    </Container>
                  </List>
                </Paper>
              </TableCell>
              <TableCell style={{minWidth: 440, maxWidth: 440,verticalAlign: 'top', alignItems: 'top',
    justifyContent: 'top'}} >
                <Paper elevation={3} >
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
                  style={{ padding: 20 }}
                >
                  <Grid item>
                    <Typography variant="subtitle1"gutterBottom>
                      Détail de la propriété capturés
                    </Typography>  
                  </Grid>
                  <Grid item>
                    <Divider width="400px"></Divider>
                  </Grid>
                  <Grid item>
                    {selectedProperty?
                    <TextField id="user-prop-text" label="Identifiant" value={selectedProperty.text} onChange={handlePropTextChange} style={{ width: '400px' }}/>:
                     <TextField id="user-prop-text-dis" label="Identifiant" disabled value="" style={{ width: '400px' }}/>
                    }
                  </Grid>
                  <Grid item style={{ width: '400px' }}>
                    {selectedPropertyElement}
                  </Grid>
                  <Grid item>
                    {modified?
                    <Button key="btn-save-pselected-prop" variant="contained" color="primary" >
                      Sauvegarder
                    </Button>:
                    <Button key="btn-save-pselected-prop" variant="contained" color="primary" disabled>
                      Sauvegarder
                    </Button>
                    }
                  </Grid>
                </Grid>
                </Paper>
              </TableCell>
              <TableCell width="100%">
                <div></div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} >
                <Typography variant="h6" gutterBottom>
                  Configuration des détails de transition d'état des lits
                </Typography>  
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} height="400">
                <BedStatusWorkspaceWidget buttons={
                  <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={addNewBedStateNode}>
                    Nouvel etat
                  </Button>
                }>
                  <BedStatusCanvasWidget>
                    <CanvasWidget engine={engine} />
                  </BedStatusCanvasWidget>
                </BedStatusWorkspaceWidget>
              </TableCell>
              <TableCell height="400" style={{verticalAlign:'top'}}>
                <BedStatusNodeDetailEditor ref={statusNodeEditor} onNodeUpdate={handleNodeEditorUpdate} onLinkUpdate={handleLinkEditorUpdate}/>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default BedConfiguration;
