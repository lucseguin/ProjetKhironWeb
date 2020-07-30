import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Main from "../screens/Main";
import StretcherBearerStatus from "../screens/StretcherBearerStatus";
import CleaningStatus from "../screens/CleaningStatus";
import BedStatus from "../screens/BedStatus";

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

export default function TopMenuNavigation(props) {
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
          {props.user.role.name === "admin"?<LinkTab label="Configuration" href="/settings" {...a11yProps(4)} />:null}
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0} >
        <Main/>
        {/* <Route path="/" component={Main} />  */}
      </TabPanel>
      <TabPanel value={value} index={1} >
        <BedStatus />
      </TabPanel>
      <TabPanel value={value} index={2} >
        <CleaningStatus />
      </TabPanel>
      <TabPanel value={value} index={3} >
       <StretcherBearerStatus />
      </TabPanel>
      {props.user.role.name === "admin"?
      <TabPanel value={value} index={4}>
        <SettingsMenuNavigation />
      </TabPanel>
      :null}

    </div>
  );
}
