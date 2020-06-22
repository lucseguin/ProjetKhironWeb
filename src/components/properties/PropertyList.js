import React, {useState, useEffect} from "react";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import arrayMove from "array-move";
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
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export default function PropertyList(props) {
    const [modified, setModified] = useState(false);
    const [items, setItems] = useState();
    
    useEffect(() => {
        setItems(props.extraProperties);
      }, [props.extraProperties]);

    const onDrop = ({ removedIndex, addedIndex }) => {
        setModified(true);
        setItems(arrayMove(items, removedIndex, addedIndex));
        props.onReorder(items);
    };

    const handledPropertyEdit = (item) => {
        props.onEdit(item)
    }

    const handledNewProp = () => {
        props.onNew();
        setModified(true);
    }

    const handledDeleteProp = (item) => {
        props.onDelete(item);
        setModified(true);
    }    

    const handledSaveList = () => {
        props.onSave();
        setModified(false);
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
            <Typography gutterBottom>
                {props.title}
            </Typography>  
        </Grid>
        <Grid item style={{width:'100%', display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />} onClick={handledNewProp}>
                Nouvelle propriétée
            </Button>
        </Grid>
        <Grid item>
            <Paper elevation={3} style={{minWidth: 400, maxHeight: 600, overflow: 'auto'}}>
                {items?
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
                                <IconButton aria-label="edit" size="small" onClick={() => handledPropertyEdit(item)}>
                                    <EditIcon />
                                </IconButton >
                                <IconButton aria-label="delete" size="small" onClick={() => handledDeleteProp(item)}>
                                    <DeleteIcon />
                                </IconButton >
                                </ListItemSecondaryAction>

                            </ListItem>
                        </Draggable>
                        ))}
                    </Container>
                </List>
                :null}
            </Paper>
        </Grid>
        <Grid item style={{width:'100%', display: 'flex', justifyContent: 'flex-end'}}>
            <Button variant="contained" color="primary" disabled={!modified} onClick={handledSaveList}>
                Sauvegarder
            </Button>
        </Grid>
    </Grid>
);
}