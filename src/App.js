import React, {useState} from "react";
import { BrowserRouter, Redirect } from "react-router-dom";
import "./icons.js";
import "./style.css";
import TopMenuNavigation from "./components/TopMenuNavigation";
import TopMenuBar from "./components/TopMenuBar";
import axios from "axios"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Amplify,  { Auth }  from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log("process.env.REACT_APP_PK_DB_API_ENDPOINT:"+process.env.REACT_APP_PK_DB_API_ENDPOINT);


Amplify.configure(awsconfig);

function App() {
  
  const [verificationCompleted, setVerificationCompleted] = useState(false);
  const [verifyingUser, setVerifyingUser] = useState(false);
  const [userValidated, setUserValidated] = useState(false);
  const [user, setUser] = useState();
  const [userSettings, setUserSettings] = useState(0);
  const [paletteType, setPaletteType] = useState('light');

  //const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  async function verifyAuthenticatedUser(){
    setVerifyingUser(true);
    try {
      let user = await Auth.currentAuthenticatedUser();
      const response = await axios.get("/projetkhiron/accounts", {
        params: {
            email: user.attributes.email
          }
      });
      if (response.status === 200 && response.data.length === 1) {
        console.log("Did find user!")
        setUser(response.data[0]);
        setPaletteType(response.data[0].paletteType);

        const r2 = await axios.get("/projetkhiron/roles", {
          params: {
              name: response.data[0].role.name
            }
        });
        if (r2.status === 200 && r2.data.length === 1) {
          setUserSettings(r2.data[0].settings);
        }
        setUserValidated(true);
      } else {
        console.log("did not find user")
      }
    } catch (err) {
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
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{width:'100%'}}
      >
        <Grid item >
          <Paper>
            <CircularProgress />
          </Paper>
        </Grid>
      </Grid>
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

export default withAuthenticator(App);
//https://docs.amplify.aws/lib/auth/getting-started/q/platform/js#option-1-use-pre-built-ui-components