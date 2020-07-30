import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import TextField from '@material-ui/core/TextField';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}


class SingleInputDialog extends React.Component {
    constructor(props){
        super(props);
        this.showDialog = this.showDialog.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOnConfirm = this.handleOnConfirm.bind(this);
    }

    state = {
        open: false
      };

    handleClickOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    handleOnConfirm() {
        if(this.props.onConfirm)
            this.props.onConfirm();
        this.setState({open: false});
    }

    showDialog(){
        this.setState({open: true});
    }
  
    render () {
        return (
        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            {this.props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {this.props.message}
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="SingleInputDialog-Input"
                    label={this.props.inputLabel}
                    type="text"
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    {this.props.cancelLabel}
                </Button>
                <Button onClick={this.handleOnConfirm} color="primary">
                    {this.props.confirmLabel}
                </Button>
            </DialogActions> 
        </Dialog>
        );
    }
}

export default SingleInputDialog;