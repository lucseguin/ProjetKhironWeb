import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const styles = theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      color: theme.palette.text.primary,
    },
  });

  
  
  class StatusProgress extends React.Component {
    constructor(props){
        super(props);
        this.showStatus = this.showStatus.bind(this);
        this.hideStatus = this.hideStatus.bind(this);
    }

    state = {
        open: false,
        modalStyle: getModalStyle(),
      };


    showStatus(){
        this.setState({open: true});
    }
  
    hideStatus(){
        this.setState({open: false});
    }

    render () {
        const { classes } = this.props;
        return (<Modal
            open={this.state.open}
            aria-labelledby="draggable-dialog-title"
        >
            <div style={this.state.modalStyle} className={classes.paper}>
              <Grid container 
              direction="column"
              justify="center"
              alignItems="center">
                <Grid item>
                  <Typography variant="h6" align="center">
                      {this.props.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <CircularProgress />
                </Grid>
                <Grid item>
                  <Typography variant="body1" align="center">
                  {this.props.message}
                  </Typography>  
                </Grid>
              </Grid>
            </div>
        </Modal>
        );
    }
}

export default  withStyles(styles)(StatusProgress);