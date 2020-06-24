import React from 'react';
import { Switch, Route } from "react-router-dom";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import BedConfiguration from "../screens/BedConfiguration";
import FloorConfigurations from "../screens/FloorConfigurations";
import Main from "../screens/Main";
import SettingsCleaning from "../screens/SettingsCleaning";
import StretcherBearerStatus from "../screens/StretcherBearerStatus";
import CleaningStatus from "../screens/CleaningStatus";

import Users from "../screens/Users";
import SettingsMenuNavigation from "./SettingsMenuNavigation"
import Box from '@material-ui/core/Box';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
        {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TopMenuNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      
      <AppBar position="static" color="default">
        <Tabs
          variant="fullWidth"
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Acceuil" href="/" {...a11yProps(0)} />
          <LinkTab label="Lits" href="/beds" {...a11yProps(1)} />
          <LinkTab label="Nettoyage" href="/cleaning" {...a11yProps(2)} />
          <LinkTab label="Brancarderie" href="/bearer" {...a11yProps(3)} />
          <LinkTab label="Configuration" href="/settings" {...a11yProps(4)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} >
        <Main/>
        {/* <Route path="/" component={Main} />  */}
      </TabPanel>
      <TabPanel value={value} index={1} >
        <div></div>
      </TabPanel>
      <TabPanel value={value} index={2} >
        <CleaningStatus />
      </TabPanel>
      <TabPanel value={value} index={3} >
       <StretcherBearerStatus />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <SettingsMenuNavigation />
        {/* <Route path="/settings" exact component={SettingsMenuNavigation} /> */}
      </TabPanel>

    </div>
  );
}
