import React, {useState} from "react";
import { BrowserRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import "./icons.js";
import "./style.css";
import TopMenuNavigation from "./components/TopMenuNavigation";
import TopMenuBar from "./components/TopMenuBar";
import axios from "axios"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import EventCoordinator from './components/EventCoordinator';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {withAuthenticator} from './components/Authentication'
import Amplify, { Auth }  from 'aws-amplify';

const awsConfig = {
  "aws_project_region": window._env_.REACT_APP_AWS_PROJECT_REGION,
  "aws_cognito_region": window._env_.REACT_APP_AWS_COGNITO_REGION,
  "aws_user_pools_id": window._env_.REACT_APP_AWS_USER_POOLS_ID,
  "aws_user_pools_web_client_id": window._env_.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
  "oauth": {}
};

Amplify.configure(awsConfig);


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    //backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: theme.palette.text.primary,
  },
  paper2: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: theme.palette.text.primary,
    width: '300px',
  },

  tableContainer: {
    maxHeight: 280,
  },
  table: {
    minWidth: 800,
  },
  tableHeaderCell: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  statusIcons: {
    width: 24,
    height: 24
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Main() {
  const classes = useStyles();

  const [verificationCompleted, setVerificationCompleted] = useState(false);
  const [verifyingUser, setVerifyingUser] = useState(false);
  const [userValidated, setUserValidated] = useState(false);
  const [user, setUser] = useState();
  const [userSettings, setUserSettings] = useState(0);
  const [paletteType, setPaletteType] = useState('light');

  async function verifyAuthenticatedUser(){
    setVerifyingUser(true);
    try {
      let cognitoUser = await Auth.currentAuthenticatedUser();
      if(cognitoUser == null) {
        EventCoordinator.signal('auth', {type:'signOut', data:null, message:'Failed user verification, kicking out.'});
      }

      const response = await axios.get("/projetkhiron/accounts", {
        params: {
            email: cognitoUser.attributes.email
          }
      });

      if (response.status === 200 && response.data.length === 1) {
        EventCoordinator.store("user", response.data[0]); //after this, all axios call will be tenant aware
        
        const licenceRes = await axios.post("/projetkhiron/settings/licence", {config: "production"});
        var licence = {};
        if(licenceRes.data) 
          licence = licenceRes.data
      
        var tmpUser = {...response.data[0], licence:licence};

        const r2 = await axios.get("/projetkhiron/roles", {
          params: {
              name: response.data[0].role.name
          }
        });

        if (r2.status === 200 && r2.data.length === 1) {
          setUserSettings(r2.data[0].settings);
          tmpUser = {...tmpUser, access:r2.data[0].settings.options };
        }

        setUser(tmpUser);
        EventCoordinator.store("user", tmpUser);
        setPaletteType(tmpUser.paletteType);
        setUserValidated(true);
      } else {
        EventCoordinator.signal('auth', {type:'signOut', data:null, message:'Unknown user, kicking out', errorMessage:"Vous n'avez pas encore access à l'application. Veuillez contacter votre administrateur."});
        console.log("did not find user")
      }
    } catch (err) {
        EventCoordinator.signal('auth', {type:'signOut', data:null, message:'Failed user verification, kicking out.'});
        console.error(err);

    } finally {
      setVerificationCompleted(true);
      setVerifyingUser(false);
    }
  }

  if(!verificationCompleted && !verifyingUser) {
    verifyAuthenticatedUser();
  }
  // const mainPrimaryColor = prefersDarkMode ? orange[500] : lightBlue[500];
  // const mainSecondaryColor = prefersDarkMode ? deepOrange[900] : deepPurple[500];

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: paletteType,
        },
      }),
    [paletteType],
  );

  let doc = null;
  if(!verificationCompleted) {
    //Loading screen
    doc = <ThemeProvider theme={theme}>
    <div className={classes.root} >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={true}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={true}>
          <div className={classes.paper}>
          <Grid container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ padding: 10, }}
            spacing={1}>
            <Grid item>
             <Typography>
               Démarrage de l'application en cours
             </Typography>
            </Grid> 
            <Grid item>
             <CircularProgress />
            </Grid> 
          </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
    </ThemeProvider>
  } else if(userValidated) {
    doc = <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{width:'100%'}}
      >
        <Grid item style={{width:'100%'}}>
          <TopMenuBar user={user} userSettings={userSettings} paletteType={paletteType} onThemeChange={(newPalette) => setPaletteType(newPalette)}/>
        </Grid>
        <Grid item style={{width:'100%'}}>
          <TopMenuNavigation user={user} userSettings={userSettings}/>
        </Grid>
      </Grid>
    </ThemeProvider>
    </BrowserRouter>
  } else {
    doc = 
      <ThemeProvider theme={theme}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{width:'100%'}}
        >
          <Grid item >
            <Paper>
            <Typography variant="subtitle1" gutterBottom>
              Project Khiron
            </Typography>  
            <Typography variant="subtitle1" gutterBottom>
              Vous n'avez pas access à cette application. Veuillez contacter votre administrateur.
            </Typography>  
            </Paper>
          </Grid>
        </Grid>
      </ThemeProvider>
  }

  return (
   doc
  );
}

export default withAuthenticator(Main, "cognito");
//https://docs.amplify.aws/lib/auth/getting-started/q/platform/js#option-1-use-pre-built-ui-components