import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Users from "../screens/Users"
import BedConfiguration from "../screens/BedConfiguration"
import FloorConfigurations from "../screens/FloorConfigurations"
import SettingsCleaning from "../screens/SettingsCleaning"
import SettingsStretcherBearer from "../screens/SettingsStretcherBearer"
import GlobalSettings from "../screens/GlobalSettings"

import SvgIcon from '@material-ui/core/SvgIcon';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import LayersOutlinedIcon from '@material-ui/icons/LayersOutlined';
import HotelOutlinedIcon from '@material-ui/icons/HotelOutlined';
import TransferWithinAStationOutlinedIcon from '@material-ui/icons/TransferWithinAStationOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

function CleaningIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 947.1 947.101" >

<g>
		<path d="M901.178,714.9H795.979l-97.601-71.3c-9.5-6.9-22.8-4.9-29.7,4.6c-6.899,9.5-4.899,22.8,4.601,29.7l50.399,37h-33.6
			c-7.2,0-12.8,6.6-11.5,13.7l31,180.199c1,5.601,5.8,9.7,11.5,9.7h74.5h75.5c5.7,0,10.6-4.1,11.5-9.8l30-180.2
			C913.878,721.4,908.378,714.9,901.178,714.9z M794.878,777.9c-9,1.399-17.399-4.8-18.8-13.8c-0.5-3.5,0.1-6.9,1.6-9.9
			c2.301-4.6,6.801-8.1,12.301-8.9c6.1-0.899,12,1.601,15.5,6.2c1.699,2.2,2.899,4.8,3.3,7.7
			C810.079,768.101,803.979,776.5,794.878,777.9z"/>
		<path d="M361.779,222.4c24.1,0,50.6-13.4,50.6-13.4c-12.5-7.3-18.899-21.8-22-36.4c13.101,21.7,35.8,36,61.5,36s48.4-14.3,61.5-36
			c-3.1,14.7-9.5,29.1-22,36.4c0,0,26.5,13.4,50.601,13.4c15.6,0,30.3-5.6,36.1-24.3c0.9-2.8-0.3-5.8-2.9-7.1
			c-8.699-4.7-27.8-18.2-27.8-46c0-36,9-145-95.5-145s-95.5,109-95.5,145c0,27.8-19.1,41.3-27.8,46c-2.6,1.4-3.8,4.4-2.9,7.1
			C331.479,216.7,346.178,222.4,361.779,222.4z"/>
		<path d="M691.479,544c15.3-11.399,18.5-33.1,7.1-48.399l-165.7-222.8c-35.3-47-105.6-44.9-149.5-12.2
			c-0.1,0.1-137.3,102.2-137.3,102.2l-82.9-45.9V396l68.9,38.2c5.2,2.9,11,4.3,16.8,4.3c7.3,0,14.6-2.3,20.7-6.8l78.2-58.2v85.9
			l-82.8,231c-2.9,7.7,2.9,16,11.1,16h71.7V885.3c0,25.7,20.8,46.5,46.5,46.5s46.5-20.8,46.5-46.5V706.2h22.399v178.9
			c0,25.699,20.801,46.5,46.5,46.5c25.7,0,46.5-20.801,46.5-46.5V706.2h71.7c8.3,0,14-8.2,11.101-16l-82.801-231v-39.5l87.101,117.1
			c6.8,9.101,17.2,13.9,27.8,13.9C678.079,550.8,685.279,548.601,691.479,544z"/>
		<path d="M144.179,693V385.4v-26.2v-301c0-11-9-20-20-20s-20,9-20,20v632.5c5-1,10.2-1.5,15.3-1.5
			C127.878,689.2,136.279,690.5,144.179,693z"/>
		<path d="M269.979,922.601c-33-16.5-59.9-48.601-59.9-91.7c0-43.101-25.3-61.8-35.3-67.5c-12.1-4.7-26.2-8-41.4-9.3
			c-4.5-0.4-9.2-0.601-13.9-0.601c-2,0-4.1,0-6.1,0.101c-21.8,0.8-41.9,5.699-57.5,13.399c-23.6,15.7-21.5,49.4-21.5,49.4
			c0,106.899,80.3,130.7,151.8,130.7c31.5,0,61.3-4.601,81.7-8.801C275.779,936.8,277.179,926.2,269.979,922.601z"/>
		<path d="M100.378,733.5c4.1-0.399,8.3-0.7,12.5-0.8c2.2-0.1,4.4-0.1,6.6-0.1c5.2,0,10.3,0.199,15.3,0.6c4.2,0.3,8.4,0.8,12.5,1.4
			c3.5,0.5,6.9,1.1,10.3,1.8c2.6,0.6,5.2,1.2,7.8,1.8c-1.4-3-2.9-5.8-4.6-8.3c-2.3-3.4-4.8-6.4-7.4-8.8c-2-1.801-4.1-3.301-6.3-4.4
			c-0.9-0.5-1.9-0.9-2.8-1.3c-7.8-3.4-16.2-5.2-24.7-5.2c-5.2,0-10.3,0.7-15.3,2c-3.2,0.8-6.4,1.9-9.5,3.3c-0.9,0.4-1.8,0.8-2.7,1.2
			c-2.2,1.1-4.4,2.7-6.5,4.6c-4.6,4.2-8.7,10.101-11.8,16.9c5.2-1.3,10.6-2.5,16.2-3.4C93.378,734.3,96.779,733.8,100.378,733.5z"/>
	</g>


    </SvgIcon>
  );
}

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
  );
}

