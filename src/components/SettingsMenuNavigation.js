import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Users from "../screens/Users"
import BedConfiguration from "../screens/BedConfiguration"
import FloorConfigurations from "../screens/FloorConfigurations"
import SettingsCleaning from "../screens/SettingsCleaning"
import SettingsStretcherBearer from "../screens/SettingsStretcherBearer"
import GlobalSettings from "../screens/GlobalSettings"
import SettingsVisitors from "../screens/SettingsVisitors"
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LayersOutlinedIcon from '@material-ui/icons/LayersOutlined';
import HotelOutlinedIcon from '@material-ui/icons/HotelOutlined';
import TransferWithinAStationOutlinedIcon from '@material-ui/icons/TransferWithinAStationOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import CleaningIcon from "./CleaningIcon"
import WcIcon from '@material-ui/icons/Wc';
import * as AR from '../components/AccessRights'

function SettingsTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box >
          {children}
        </Box>
      )}
    </div>
  );
}

SettingsTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    width:'100%'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth : 50,
    maxWidth : 50,
  },
  tab: {
    minWidth : 50,
    maxWidth : 50,
  },
}));

export default function SettingsMenuNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var tabIdx = -1;
  var linkTabArr = [];
  var tabPanelArr = [];

  if(props.user.access&AR.ROLE_SETTINGS_MANAGE_ACCOUNTS || props.user.access&AR.ROLE_SETTINGS_MANAGE_ROLES) {
    tabIdx = tabIdx + 1;
    linkTabArr.push(<Tab key="accounts-config-tab" icon={<AccountCircleOutlinedIcon />} aria-label="accounts" {...a11yProps(tabIdx)} className={classes.tab}/>)
    tabPanelArr.push(<SettingsTabPanel key="accounts-config-tab-panel" value={value} index={tabIdx}><Users user={props.user}/></SettingsTabPanel>);
  }

  if(props.user.access&AR.ROLE_CONFIG_FLOOR) {
    tabIdx = tabIdx + 1;
    linkTabArr.push(<Tab key="floors-config-tab" icon={<LayersOutlinedIcon />} aria-label="floors" {...a11yProps(tabIdx)} className={classes.tab}/>)
    tabPanelArr.push(<SettingsTabPanel key="floors-config-tab-panel" value={value} index={tabIdx}><FloorConfigurations user={props.user}/></SettingsTabPanel>);
  }

  if(props.user.licence.cleaner_module && props.user.access&AR.ROLE_CLEANER_CONFIG) {
    tabIdx = tabIdx + 1;
    linkTabArr.push(<Tab key="cleaning-config-tab"  icon={<CleaningIcon />} aria-label="cleaning" {...a11yProps(tabIdx)} className={classes.tab}/>)
    tabPanelArr.push(<SettingsTabPanel key="cleaning-config-tab-panel" value={value} index={tabIdx}><SettingsCleaning user={props.user}/></SettingsTabPanel>);
  }

  if(props.user.licence.bearer_module && props.user.access&AR.ROLE_BEARER_CONFIG) {
    tabIdx = tabIdx + 1;
    linkTabArr.push(<Tab key="bearer-config-tab"  icon={<TransferWithinAStationOutlinedIcon />} aria-label="bearer" {...a11yProps(tabIdx)} className={classes.tab}/>)
    tabPanelArr.push(<SettingsTabPanel key="bearer-config-tab-panel"  value={value} index={tabIdx}><SettingsStretcherBearer user={props.user}/></SettingsTabPanel>);
  }

  if(props.user.licence.visitor_module && props.user.access&AR.ROLE_VISITOR_CONFIG) {
    tabIdx = tabIdx + 1;
    linkTabArr.push(<Tab key="visitors-config-tab" icon={<WcIcon />} aria-label="visitor" {...a11yProps(tabIdx)} className={classes.tab}/>)
    tabPanelArr.push(<SettingsTabPanel key="visitors-config-tab-panel" value={value} index={tabIdx}><SettingsVisitors user={props.user}/></SettingsTabPanel>);
  }

  //if(props.user.access&&AR.ROLE_VISITOR_CONFIG) {
    tabIdx = tabIdx + 1;
    linkTabArr.push(<Tab key="system-config-tab" icon={<SettingsOutlinedIcon />} aria-label="settings" {...a11yProps(tabIdx)} className={classes.tab}/>)
    tabPanelArr.push(<SettingsTabPanel key="system-config-tab" value={value} index={tabIdx}><GlobalSettings user={props.user}/></SettingsTabPanel>);
  //}

  return (
    <Grid container 
    direction="row"
    justify="flex-start"
    alignItems="flex-start"
    style={{paddingTop:10, width: '100%', height: '100vh' }}>
      <Grid item>
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            indicatorColor="primary"
            textColor="primary"
            variant="standard"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            {linkTabArr}
          </Tabs>
          {tabPanelArr}
        </div>
      </Grid>
    </Grid>
  );
}

