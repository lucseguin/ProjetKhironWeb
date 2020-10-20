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
import * as AR from '../components/AccessRights'
import SettingsMenuNavigation from "./SettingsMenuNavigation"
import Box from '@material-ui/core/Box';
import EventLog from "../screens/EventLog";
import VisitorRegistration from "../screens/VisitorRegistration";

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

  var tabIdx = -1;
  var linkTabArr = [];
  var tabPanelArr = [];

  if(props.user.licence.cleaner_module && (props.user.access&AR.ROLE_CLEANER_VIEW)) {
    tabIdx = tabIdx + 1;
    linkTabArr.push(<Tab key="cleaning-tab" label="Nettoyage" {...a11yProps(tabIdx)} />)
    tabPanelArr.push(<TabPanel key="cleaning-tab-panel" value={value} index={tabIdx} ><CleaningStatus user={props.user} userSettings={props.userSettings}/></TabPanel>);
  }

  if(props.user.licence.bearer_module && (props.user.access&AR.ROLE_BEARER_VIEW)) {
    tabIdx = tabIdx + 1;
    linkTabArr.push(<Tab key="bearer-tab" label="Brancarderie" {...a11yProps(tabIdx)} />)
    tabPanelArr.push(<TabPanel key="bearer-tab-panel" value={value} index={tabIdx} ><StretcherBearerStatus user={props.user} userSettings={props.userSettings}/></TabPanel>);
  }

  if(props.user.licence.visitor_module && (props.user.access&AR.ROLE_VISITOR_VIEW)) {
    tabIdx = tabIdx + 1;
    linkTabArr.push(<Tab key="visitors-tab" label="Registre visiteur" {...a11yProps(tabIdx)} />)
    tabPanelArr.push(<TabPanel key="visitors-panel" value={value} index={tabIdx} ><VisitorRegistration user={props.user} userSettings={props.userSettings}/></TabPanel>);
  }

  if((props.user.access&AR.ROLE_JOURNAL_SEARCH)) {
    tabIdx = tabIdx + 1;
    linkTabArr.push(<Tab key="logs-tab" label="Journal" {...a11yProps(tabIdx)} />)
    tabPanelArr.push(<TabPanel key="logs-tab-panel" value={value} index={tabIdx} ><EventLog user={props.user} userSettings={props.userSettings}/></TabPanel>);
  }

  if(props.user.role.name === "admin" || 
    (props.user.access&AR.ROLE_BEARER_CONFIG)) {
    tabIdx = tabIdx + 1;
    linkTabArr.push(<Tab key="config-tab" label="Configuration" {...a11yProps(tabIdx)} />)
    tabPanelArr.push(<TabPanel key="config-tab-panel" value={value} index={tabIdx} ><SettingsMenuNavigation user={props.user} userSettings={props.userSettings}/></TabPanel>);
  }

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
          {linkTabArr}
        </Tabs>
      </AppBar>
      {tabPanelArr}
    </div>
  );
}
