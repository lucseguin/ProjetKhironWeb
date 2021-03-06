import React, { useState, useEffect, useRef } from "react";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
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
import { v4 as uuidv4 } from 'uuid';
import SingleInputDialog from '../SingleInputDialog'
import * as Properties from './Properties'
// import JoditEditor from "jodit-react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useTheme } from '@material-ui/core/styles';
import '@ckeditor/ckeditor5-build-classic/build/translations/fr.js'

export default function PropertyEditor(props) {
    const theme = useTheme();

    const [selectedProperty, setSelectedProperty] = useState(props.property);
    const [selectedPropertyListOption, setSelectedPropertyListOption] = useState({_id:'', text:''});

    const inputDlgRef = useRef(null);
    const [singleInputTitle, setSingleInputTitle] = useState('');
    const [singleInputMsg, setSingleInputMsg] = useState('');
    const [singleInputLabel, setSingleInputLabel] = useState('');
    const [singleInputValue, setSingleInputValue] = useState('');

    useEffect(() => {
        setSelectedProperty(props.property);
    }, [props.property]);


    const handlePropTextChange = (event) => {
        let updatedSelection = { ...selectedProperty, text: event.target.value };
        setSelectedProperty(updatedSelection);
        props.onChange(updatedSelection);
    }

    const handlePropTypeChange = (event) => {
        let updatedSelection = { ...selectedProperty, type: event.target.value, required: false};
        if (event.target.value === Properties.TEXT_PROPERTY) {
            updatedSelection = { ...selectedProperty, type: Properties.TEXT_PROPERTY, mlAlgo: '', max: 0, required: false, entity:'text'};
        } else if (event.target.value === Properties.NUM_PROPERTY) {
            updatedSelection = { ...selectedProperty, type: Properties.NUM_PROPERTY, mlAlgo: '', max: 365, min: 0, required: false, entity:'number'  };
        } else if (event.target.value === Properties.LIST_PROPERTY) {
            updatedSelection = { ...selectedProperty, type: Properties.LIST_PROPERTY, multi: false, items: [], required: false, entity:'text'  };
        } else if (event.target.value === Properties.DB_LINK_PROPERTY) {
            updatedSelection = { ...selectedProperty, type: Properties.DB_LINK_PROPERTY, items: [], required: false };
        } else if (event.target.value === Properties.PHONE_NUM_PROPERTY) { 
            updatedSelection = { ...selectedProperty, type: Properties.PHONE_NUM_PROPERTY, required: false,  entity:Properties.PHONE_NUM_PROPERTY};
        } else if (event.target.value === Properties.EMAIL_PROPERTY) { 
            updatedSelection = { ...selectedProperty, type: Properties.EMAIL_PROPERTY, required: false, entity:Properties.EMAIL_PROPERTY };
        } else if (event.target.value === Properties.YES_NO_PROPERTY) { 
            updatedSelection = { ...selectedProperty, type: Properties.YES_NO_PROPERTY, required: false, question:'', entity:Properties.YES_NO_PROPERTY };
        }

        setSelectedProperty(updatedSelection);
        props.onChange(updatedSelection);
    }

    const handlePropMandatoryChange = (event) => {
        let updatedSelection = { ...selectedProperty, required: event.target.checked };
        setSelectedProperty(updatedSelection);
        props.onChange(updatedSelection);
    }

    const handlePropTextMaxChange = (event) => {
        let updatedSelection = { ...selectedProperty, max: event.target.value };
        setSelectedProperty(updatedSelection);
        props.onChange(updatedSelection);
    }

    const handlePropMinChange = (event) => {
        let updatedSelection = { ...selectedProperty, min: event.target.value };
        setSelectedProperty(updatedSelection);
        props.onChange(updatedSelection);
    }

    // const handlePropMLAlgo = (event) => {
    //     let updatedSelection = { ...selectedProperty, mlAlgo: event.target.value };
    //     setSelectedProperty(updatedSelection);
    //     props.onChange(updatedSelection);
    // }

    // const handlePropEntityChange = (event) => {
    //     let updatedSelection = { ...selectedProperty, entity: event.target.value };
    //     setSelectedProperty(updatedSelection);
    //     props.onChange(updatedSelection);
    // }
    const handlePropMaskChange = (event) => {
        let updatedSelection = { ...selectedProperty, mask: event.target.value };
        setSelectedProperty(updatedSelection);
        props.onChange(updatedSelection);
    }
    const handlePropQuestionChange = (newContent) => {
        let updatedSelection = { ...selectedProperty, question: newContent };
        setSelectedProperty(updatedSelection);
        props.onChange(updatedSelection);
    }
    
    const handlePropAssistantChange = (event) => {
        let updatedSelection = { ...selectedProperty, assistant: event.target.value };
        setSelectedProperty(updatedSelection);
        props.onChange(updatedSelection);
    }
    const handlePropEntityChange = (event) => {
        let updatedSelection = { ...selectedProperty, entity: event.target.value };
        setSelectedProperty(updatedSelection);
        props.onChange(updatedSelection);
    }
    const handlePropListMultiChange = (event) => {
        let updatedSelection = { ...selectedProperty, multi: event.target.checked };
        setSelectedProperty(updatedSelection);
        props.onChange(updatedSelection);
    }
    const onSelectedPropItemsDrop = ({ removedIndex, addedIndex }) => {
        let updatedSelection = { ...selectedProperty, items: arrayMove(selectedProperty.items, removedIndex, addedIndex) };
        setSelectedProperty(updatedSelection);
        props.onChange(updatedSelection);
    };

    const handleNewPropertyListOption = () => {
        let newOption = {_id:uuidv4(), text:"Nouvelle Option"};

        setSelectedPropertyListOption(newOption);

        setSingleInputTitle("Nouvelle Option");
        setSingleInputMsg("Nouvelle option pour la liste " + selectedProperty.text);
        setSingleInputLabel("Valeur de l'option");
        setSingleInputValue("");

        inputDlgRef.current.showDialog();
    }

    const handlePropertyListOptionChange = (event) => {
        let updatedOption = {...selectedPropertyListOption};
        updatedOption.text = event.target.value;
        setSelectedPropertyListOption(updatedOption);
    }

    const handleConfirmPropertyListOptionChange = () => {
        let updatedProperty = {...selectedProperty};
        const selectedListOptionIndex = updatedProperty.items.findIndex(o => o._id === selectedPropertyListOption._id);
        if (selectedListOptionIndex === -1){ //new   
            updatedProperty.items = [...updatedProperty.items, selectedPropertyListOption];
        } else { //existing
          updatedProperty.items = [
          ...updatedProperty.items.slice(0, selectedListOptionIndex),
          selectedPropertyListOption,
          ...updatedProperty.items.slice(selectedListOptionIndex + 1)
        ];
        }
        setSelectedProperty(updatedProperty);
        props.onChange(updatedProperty);
    }

    const handleEditListOption = (option) => {
        setSelectedPropertyListOption(option);

        setSingleInputTitle("Modification d'option");
        setSingleInputMsg("Modification d'option pour la liste " + selectedProperty.text);
        setSingleInputLabel("Valeur de l'option");
        setSingleInputValue("");

        inputDlgRef.current.showDialog();
    }

    const handleDeleteListOption = (option) => {
        let updatedProperty = {...selectedProperty};

        const selectedListOptionIndex = updatedProperty.items.findIndex(o => o._id === option._id);
        
        updatedProperty.items = [
          ...updatedProperty.items.slice(0, selectedListOptionIndex),
          ...updatedProperty.items.slice(selectedListOptionIndex + 1)
        ];
        setSelectedProperty(updatedProperty);

        props.onChange(updatedProperty);
    }

    let selectedPropertyElement;
    if (selectedProperty) {
        selectedPropertyElement = [<TextField
            id="sel-prop-edit-type"
            key="sel-prop-edit-type"
            select
            label="Type"
            style={{ width: '200px' }}
            value={selectedProperty.type}
            onChange={handlePropTypeChange}
        >
            {Properties.SUPPORTED_PROPERTIES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>];

        if (selectedProperty.type === Properties.TEXT_PROPERTY) { //text
            selectedPropertyElement = [...selectedPropertyElement,
                <TextField id="user-prop-text-char-num" key="user-prop-text-char-num" label="Nombre charactères max" value={selectedProperty.max} onChange={handlePropTextMaxChange} style={{ width: '400px' }} />,
            ]; 

            if(props.assistant && props.assistant === true) {
                selectedPropertyElement = [...selectedPropertyElement,
                <TextField
                    id="user-prop-assistant-entity"
                    key="user-prop-assistant-entity"
                    select
                    label="Assistant - Entité"
                    style={{ width: '400px' }}
                    value={selectedProperty.entity}
                    onChange={handlePropEntityChange}
                >
                    <MenuItem value="name">Nom</MenuItem>
                </TextField>
                ];
            }
        } else if (selectedProperty.type === Properties.NUM_PROPERTY) { //numerique
            selectedPropertyElement = [...selectedPropertyElement,
                <TextField id="user-prop-min-val" key="user-prop-min-val" label="Valeur min" value={selectedProperty.min} onChange={handlePropMinChange} style={{ width: '400px' }} />,
                <TextField id="user-prop-max-val" key="user-prop-max-val" label="Valeur max" value={selectedProperty.max} onChange={handlePropTextMaxChange} style={{ width: '400px' }} />,
            ];
        } else if (selectedProperty.type === Properties.PHONE_NUM_PROPERTY) { 
            // selectedPropertyElement = [...selectedPropertyElement,
            //     <TextField id="user-prop-phone-mask" key="user-prop-phone-mask" label="Masque d'entré" value={selectedProperty.mask} onChange={handlePropMaskChange} style={{ width: '400px' }} />,
            // ];
        } else if (selectedProperty.type === Properties.EMAIL_PROPERTY) { 
            // selectedPropertyElement = [...selectedPropertyElement,
            //     <TextField id="user-prop-email-mask" key="user-prop-email-mask" label="Masque d'entré" value={selectedProperty.mask} onChange={handlePropMaskChange} style={{ width: '400px' }} />,
            // ];
        } else if (selectedProperty.type === Properties.YES_NO_PROPERTY) { 
            selectedPropertyElement = [...selectedPropertyElement,
                <div style={{color:'black'}} id="user-prop-yesno-question-div" key="user-prop-yesno-question-div" >
                <CKEditor
                id="user-prop-yesno-question" key="user-prop-yesno-question" 
                config={ {
                    language: 'fr',
                    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote' ],
                } }
                editor={ ClassicEditor }
                data={selectedProperty.question}
                onInit={ editor => {
                    editor.editing.view.change(writer => {
                        writer.setStyle("height","200px",editor.editing.view.document.getRoot());
                        writer.setStyle("width","400px",editor.editing.view.document.getRoot());
                      });
                    //console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    //const data = editor.getData();
                    //console.log( { event, editor, data } );
                    const data = editor.getData();
                    handlePropQuestionChange(data);
                } }
                onBlur={ ( event, editor ) => {
                    //console.log( 'Blur.', editor );
                    // const data = editor.getData();
                    // handlePropQuestionChange(data);
                } }
                onFocus={ ( event, editor ) => {
                    //console.log( 'Focus.', editor );
                } }
            /></div>
            ];
        } else if (selectedProperty.type === Properties.LIST_PROPERTY) { //liste
            selectedPropertyElement = [...selectedPropertyElement,
                <FormControlLabel
                    key="user-prop-list-multi"
                    control={
                        <Checkbox
                            size="small"
                            name="user-prop-list-multi-2"
                            id="user-prop-list-multi-2"
                            color="primary"
                            checked={selectedProperty.multi}
                            onChange={handlePropListMultiChange}
                        />
                    }
                    label="Multi selection"
                />,
                <TableContainer key="tbl-cont-prop-static-list" size="small" style={{ border: '1px' }} >
                    <Table size="small" >
                        <TableBody>
                            <TableRow>
                                <TableCell style={{ width: '100%', borderBottom: 'none' }}>
                                    <FormControlLabel
                                        key="user-prop-list-mandatory-check"
                                        control={
                                            <Checkbox
                                                size="small"
                                                name="user-prop-list-mandatory-check-2"
                                                id="user-prop-list-mandatory-check-2"
                                                color="primary"
                                                checked={selectedProperty.required}
                                                onChange={handlePropMandatoryChange}
                                            />
                                        }
                                        label="Sélection obligatoire"
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='right' style={{ width: '100%', borderBottom: 'none' }}>
                                    <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={handleNewPropertyListOption}>
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
                                                    <Draggable key={item._id}>
                                                        <ListItem>
                                                            <ListItemIcon className="drag-handle">
                                                                <DragHandleIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={item.text} />
                                                            <ListItemSecondaryAction >
                                                                <IconButton aria-label="edit" size="small" onClick={() => handleEditListOption(item)}>
                                                                    <EditIcon />
                                                                </IconButton >
                                                                <IconButton aria-label="delete" size="small" onClick={() => handleDeleteListOption(item)}>
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
        }
        // } else if (selectedProperty.type === Properties.DB_LINK_PROPERTY) { //DB link (HL7)    
        //     selectedPropertyElement = [selectedPropertyElement,
        //         <TableContainer key="tbl-cont-prop-db-list" size="small" style={{ border: '1px' }} >
        //             <Table size="small" >
        //                 <TableBody>
        //                 <TableRow>
        //                         <TableCell style={{ width: '100%', borderBottom: 'none' }}>
        //                             <FormControlLabel
        //                                 key="user-prop-db-mandatory-check"
        //                                 control={
        //                                     <Checkbox
        //                                         size="small"
        //                                         name="user-prop-db-mandatory-check-2"
        //                                         id="user-prop-db-mandatory-check-2"
        //                                         color="primary"
        //                                         checked={selectedProperty.required}
        //                                         onChange={handlePropMandatoryChange}
        //                                     />
        //                                 }
        //                                 label="Entrée obligatoire"
        //                             />
        //                         </TableCell>
        //                     </TableRow>
        //                     <TableRow>
        //                         <TableCell align='right' style={{ width: '100%', borderBottom: 'none' }}>
        //                             <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} >
        //                                 Lien additionel
        //                             </Button>
        //                         </TableCell>
        //                     </TableRow>

        //                     <TableRow>
        //                         <TableCell style={{ borderBottom: 'none' }}>
        //                             <Paper elevation={3} >
        //                                 <List style={{ width: '100%', maxHeight: 300, overflow: 'auto', border: 1 }}>
        //                                     <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onSelectedPropItemsDrop} >
        //                                         {selectedProperty.items.map((item) => (
        //                                             <Draggable key={item.id}>
        //                                                 <ListItem>
        //                                                     <ListItemIcon className="drag-handle">
        //                                                         <DragHandleIcon />
        //                                                     </ListItemIcon>
        //                                                     <ListItemText primary={item.text} />
        //                                                     <ListItemSecondaryAction >
        //                                                         <IconButton aria-label="edit" size="small" >
        //                                                             <EditIcon />
        //                                                         </IconButton >
        //                                                         <IconButton aria-label="delete" size="small">
        //                                                             <DeleteIcon />
        //                                                         </IconButton >
        //                                                     </ListItemSecondaryAction>
        //                                                 </ListItem>
        //                                             </Draggable>
        //                                         ))}
        //                                     </Container>
        //                                 </List>
        //                             </Paper>
        //                         </TableCell>
        //                     </TableRow>
        //                 </TableBody>
        //             </Table>
        //         </TableContainer>];
        // }
        
        selectedPropertyElement = [...selectedPropertyElement, <FormControlLabel
            key="user-prop-text-mandatory-check"
            control={
                <Checkbox
                    size="small"
                    name="user-prop-text-mandatory-check-2"
                    id="user-prop-text-mandatory-check-2"
                    color="primary"
                    checked={selectedProperty.required}
                    onChange={handlePropMandatoryChange}
                />
            }
            label="Valeur obligatoire"
        />];

        if(props.assistant && props.assistant === true) {
            selectedPropertyElement= [...selectedPropertyElement,
                <TextField id="user-prop-assistant-phrase" 
                            key="user-prop-assistant-phrase" 
                            label="Assistant - Phrase" 
                            value={selectedProperty.assistant} 
                            onChange={handlePropAssistantChange}
                            style={{ width: '400px' }} />,
            ];
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
            {Properties.SUPPORTED_PROPERTIES.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>;
    }

    return (
        <>
        <SingleInputDialog
        ref={inputDlgRef}
        title={singleInputTitle} 
        message={singleInputMsg}
        inputLabel={singleInputLabel}
        value={selectedPropertyListOption.text}
        cancelLabel="Annuler"
        confirmLabel="Terminer"
        onChange={handlePropertyListOptionChange}
        onConfirm={handleConfirmPropertyListOptionChange}
      />

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
                        <Grid container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start" style={{ minWidth: 400, }}>
                            {selectedPropertyElement}
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        </>
    );
}