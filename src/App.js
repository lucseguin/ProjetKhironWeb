import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./icons.js";
import "./style.css";
import TopMenuNavigation from "./components/TopMenuNavigation";
import TopMenuBar from "./components/TopMenuBar";

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Grid } from "@material-ui/core";

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