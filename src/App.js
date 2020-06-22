import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./icons.js";
import BedConfiguration from "./screens/BedConfiguration";
import FloorConfigurations from "./screens/FloorConfigurations";
import Main from "./screens/Main";
import SettingsCleaning from "./screens/SettingsCleaning";
import SettingsStretcherBearer from "./screens/SettingsStretcherBearer";
import Users from "./screens/Users";
import "./style.css";
import TopMenuNavigation from "./components/TopMenuNavigation";
import TopMenuBar from "./components/TopMenuBar";
import SettingsMenuNavigation from "./components/SettingsMenuNavigation";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Grid } from "@material-ui/core";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange
} from "@material-ui/core/colors";


Amplify.configure(awsconfig);

function App() {
  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // const mainPrimaryColor = prefersDarkMode ? orange[500] : lightBlue[500];
  // const mainSecondaryColor = prefersDarkMode ? deepOrange[900] : deepPurple[500];

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>

      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{width:'100%'}}
      >
        <Grid item style={{width:'100%'}}>
          <TopMenuBar />
        </Grid>
        <Grid item style={{width:'100%'}}>
          <TopMenuNavigation />
        </Grid>
      </Grid>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default withAuthenticator(App);
//https://docs.amplify.aws/lib/auth/getting-started/q/platform/js#option-1-use-pre-built-ui-components