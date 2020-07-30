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
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LayersOutlinedIcon from '@material-ui/icons/LayersOutlined';
import HotelOutlinedIcon from '@material-ui/icons/HotelOutlined';
import TransferWithinAStationOutlinedIcon from '@material-ui/icons/TransferWithinAStationOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import CleaningIcon from "./CleaningIcon"

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

export default function SettingsMenuNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <LinkTab icon={<AccountCircleOutlinedIcon />} aria-label="accounts" href="/settings/accounts" {...a11yProps(0)} className={classes.tab}/>
          <LinkTab icon={<LayersOutlinedIcon />} aria-label="floors" {...a11yProps(1)} href="/settings/floors" className={classes.tab}/>
          <LinkTab icon={<HotelOutlinedIcon />} aria-label="beds" {...a11yProps(2)} href="/settings/beds" className={classes.tab}/>
          <LinkTab icon={<CleaningIcon />} aria-label="cleaning" {...a11yProps(3)} href="/settings/cleaning" className={classes.tab}/>
          <LinkTab icon={<TransferWithinAStationOutlinedIcon />} aria-label="bearer" href="/settings/bearer" {...a11yProps(4)} className={classes.tab}/>
          <LinkTab icon={<SettingsOutlinedIcon />} aria-label="shopping" href="/settings/global" {...a11yProps(5)} className={classes.tab}/>
      </Tabs>
      <SettingsTabPanel value={value} index={0}>
         <Users />
         {/* <Route path="/settings/accounts" exact component={Users} /> */}
      </SettingsTabPanel>
      <SettingsTabPanel value={value} index={1}>
        <FloorConfigurations/>
        {/* <Route path="/settings/floors" exact component={FloorConfigurations} /> */}
      </SettingsTabPanel>
      <SettingsTabPanel value={value} index={2}>
        <BedConfiguration />
        {/* <Route path="/settings/beds" exact component={BedConfiguration} /> */}
      </SettingsTabPanel>
      <SettingsTabPanel value={value} index={3}>
         <SettingsCleaning />
         {/* <Route path="/settings/cleaning" exact component={SettingsCleaning} /> */}
      </SettingsTabPanel>
      <SettingsTabPanel value={value} index={4}>
        <SettingsStretcherBearer />
        {/* <Route path="/settings/bearer" exact component={SettingsStretcherBearer} /> */}
      </SettingsTabPanel>
      <SettingsTabPanel value={value} index={5}>
        <GlobalSettings />
        {/* <Route path="/settings/global" exact component={GlobalSettings} /> */}
      </SettingsTabPanel>
      </div>
      </Grid>
    </Grid>
  );
}

