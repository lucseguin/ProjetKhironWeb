import React from "react";

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
    const onDrop = ({ removedIndex, addedIndex }) => {
        arrayMove(props.items, removedIndex, addedIndex);
        //setItems(items => arrayMove(props.items, removedIndex, addedIndex));
      };
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
            <Button variant="contained" color="primary" startIcon={<AddCircleOutlineIcon />}>
                Nouvelle propriétée
            </Button>
        </Grid>
        <Grid item>
            <Paper elevation={3} style={{minWidth: 400, maxHeight: 600, overflow: 'auto'}}>
                <List >
                    <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop} >
                        {props.items.map((item) => (
                        <Draggable key={item.id}>
                            <ListItem>

                                <ListItemIcon className="drag-handle">
                                <DragHandleIcon />
                                </ListItemIcon>

                            <ListItemText primary={item.text} />

                                <ListItemSecondaryAction >
                                <IconButton aria-label="edit" size="small" onClick={() => props.onEdit(item)}>
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
        </Grid>
    </Grid>
);
}