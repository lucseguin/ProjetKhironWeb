import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import arrayMove from "array-move";
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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import * as Properties from './Properties'

const propertyTypes = [
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


export default function PropertyEditor(props) {
    const [modified, setModified] = useState(false);

    const [selectedProperty, setSelectedProperty] = useState(props.property);

    useEffect(() => {
        setSelectedProperty(props.property);
    }, [props.property]);

    const handlePropTextChange = (event) => {
        let updatedSelection = { ...selectedProperty, text: event.target.value };
        setSelectedProperty(updatedSelection);
        setModified(true);
    }

    const handlePropTypeChange = (event) => {
        let updatedSelection = { ...selectedProperty, type: event.target.value };
        if (event.target.value === Properties.TEXT_PROPERTY.id) {
            updatedSelection = { ...selectedProperty, type: Properties.TEXT_PROPERTY.id, mlAlgo: '', max: 0, mandatory: false };
        } else if (event.target.value === Properties.NUM_PROPERTY.id) {
            updatedSelection = { ...selectedProperty, type: Properties.NUM_PROPERTY.id, mlAlgo: '', max: 365, min: 0 };
        } else if (event.target.value === Properties.LIST_PROPERTY.id) {
            updatedSelection = { ...selectedProperty, type: Properties.LIST_PROPERTY.id, multi: false, items: [] };
        } else if (event.target.value === Properties.DB_LINK_PROPERTY.id) {
            updatedSelection = { ...selectedProperty, type: Properties.DB_LINK_PROPERTY.id, items: [] };
        }
        setSelectedProperty(updatedSelection);
        setModified(true);
    }

    const handlePropMandatoryChange = (event) => {
        let updatedSelection = { ...selectedProperty, mandatory: event.target.checked };
        setSelectedProperty(updatedSelection);
        setModified(true);
    }

    const handlePropTextMaxChange = (event) => {
        let updatedSelection = { ...selectedProperty, max: event.target.value };
        setSelectedProperty(updatedSelection);
        setModified(true);
    }

    const handlePropMinChange = (event) => {
        let updatedSelection = { ...selectedProperty, min: event.target.value };
        setSelectedProperty(updatedSelection);
        setModified(true);
    }

    const handlePropMLAlgo = (event) => {
        let updatedSelection = { ...selectedProperty, mlAlgo: event.target.value };
        setSelectedProperty(updatedSelection);
        setModified(true);
    }

    const handlePropListMultiChange = (event) => {
        let updatedSelection = { ...selectedProperty, multi: event.target.checked };
        setSelectedProperty(updatedSelection);
        setModified(true);
    }
    const onSelectedPropItemsDrop = ({ removedIndex, addedIndex }) => {
        let updatedSelection = { ...selectedProperty, items: arrayMove(selectedProperty.items, removedIndex, addedIndex) };
        setSelectedProperty(updatedSelection);
        setModified(true);
    };

    const handlePropSave = () => {
        props.onSave(selectedProperty);
        setModified(false);
    }

    let selectedPropertyElement;
    if (selectedProperty) {
        selectedPropertyElement = <TextField
            id="sel-prop-edit-type"
            key="sel-prop-edit-type"
            select
            label="Type"
            style={{ width: '200px' }}
            value={selectedProperty.type}
            onChange={handlePropTypeChange}
        >
            {propertyTypes.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.text}
                </MenuItem>
            ))}
        </TextField>
        if (selectedProperty.type === Properties.TEXT_PROPERTY.id) { //text
            selectedPropertyElement = [selectedPropertyElement,
                <TextField id="user-prop-text-char-num" key="user-prop-text-char-num" label="Nombre charactères max" value={selectedProperty.max} onChange={handlePropTextMaxChange} style={{ width: '400px' }} />,
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
        } else if (selectedProperty.type === Properties.NUM_PROPERTY.id) { //numerique
            selectedPropertyElement = [selectedPropertyElement,
                <TextField id="user-prop-min-val" key="user-prop-min-val" label="Valeur min" value={selectedProperty.min} onChange={handlePropMinChange} style={{ width: '400px' }} />,
                <TextField id="user-prop-max-val" key="user-prop-max-val" label="Valeur max" value={selectedProperty.max} onChange={handlePropTextMaxChange} style={{ width: '400px' }} />,
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
        } else if (selectedProperty.type === Properties.LIST_PROPERTY.id) { //liste
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
                                        Nouvel option
                      </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{ borderBottom: 'none' }}>
                                    <Paper elevation={3} >
                                        <List style={{ width: '100%', maxHeight: 300, overflow: 'auto', border: 1 }}>
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
        } else if (selectedProperty.type === Properties.DB_LINK_PROPERTY.id) { //DB link (HL7)    
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
                                        <List style={{ width: '100%', maxHeight: 300, overflow: 'auto', border: 1 }}>
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
        selectedPropertyElement = <TextField
            id="sel-prop-edit-type-dis"
            select
            label="Type"
            style={{ width: '200px' }}
            disabled
            value=""
        >
            {propertyTypes.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.text}
                </MenuItem>
            ))}
        </TextField>;
    }

    return (
    <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{ padding: 20 }}
        >
            <Grid item>
                <Typography variant="subtitle1" gutterBottom>
                    Détail de la propriété capturés
                    </Typography>
            </Grid>
            <Grid item>
                <Paper elevation={3} >
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                        style={{ padding: 20 }}
                    >
                        <Grid item>
                            {selectedProperty ?
                                <TextField id="user-prop-text" label="Identifiant" value={selectedProperty.text} onChange={handlePropTextChange} style={{ width: '400px' }} /> :
                                <TextField id="user-prop-text-dis" label="Identifiant" disabled value="" style={{ width: '400px' }} />
                            }
                        </Grid>
                        <Grid item style={{ width: '400px' }}>
                            {selectedPropertyElement}
                        </Grid>
                        <Grid item>
                            <Button key="btn-save-pselected-prop" variant="contained" color="primary" disabled={!modified} onClick={handlePropSave}>
                                Sauvegarder
                                </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}