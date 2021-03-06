import React , {useState,useEffect }from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EventCoordinator from '../components/EventCoordinator';
import Button from '@material-ui/core/Button';
import { logoutUser } from '../components/Authentication';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function TopMenuBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [globalSettings, setGlobalSettings] = useState({departments:[]});
  const [loadingSettings, setLoadingSettings]  = useState(false);
  // const [currentOrg, setCurrentOrg]  = useState();
  
  useEffect(() => {
    //setCurrentOrg(props.user.currentOrg);
    setLoadingSettings(true);
    axios.get("/projetkhiron/settings", {
      params: {
          config: "production"
      }
    })
      .then((response) => {
        if (response.status === 200 && response.data.length === 1) {
          setGlobalSettings(response.data[0]);
        }
      }).catch(error => {
        console.log("error" + error);
        if (error) throw error;
      }).finally(() => {
        setLoadingSettings(false);
    });
}, [])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handlePaletteTypeChange = (event) => {
    if(event.target.checked)
      props.onThemeChange('dark');
    else
      props.onThemeChange('light');
  }

  // const handleOrgChange = (event) => {
  //   setCurrentOrg(event.target.value);
  //   EventCoordinator.store("user", {...EventCoordinator.retreive("user"), currentOrg:event.target.value});
  //   EventCoordinator.signal('notif', {type:'orgChange', data:event.target.value, message:'Sucessfully signed out through Cognito'});
  // }

  const extractInitials = (userInfo) => {
    return ((userInfo.firstName && userInfo.firstName.length > 1)?userInfo.firstName.charAt(0):'') + ((userInfo.lastName && userInfo.lastName.length > 1)?userInfo.lastName.charAt(0):'');
  }
  let avatarIcon = <Avatar>{extractInitials(props.user)}</Avatar>;

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem> */}
      <MenuItem><FormControlLabel
        control={
          <Switch
            checked={props.paletteType==='dark'}
            onChange={handlePaletteTypeChange}
            name="dark-mode-switch"
            color="primary"
          />
        }
        label="Dark Mode"
      /></MenuItem>

      {/* {props.user.org.length>1?
      <MenuItem>
      <FormControl className={classes.formControl}>
        <InputLabel id="org-simple-select-label">Organisation</InputLabel>
        <Select
          labelId="org-simple-select-label"
          id="org-simple-select"
          value={currentOrg}
          onChange={handleOrgChange}
        >
          {props.user.org.map(org => (
            <MenuItem key={org.db} value={org.db}>{org.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </MenuItem>:null} */}

      <MenuItem>
      <Button variant="contained" color="primary" onClick={() => logoutUser("cognito")}>Déconnexion</Button>
      </MenuItem>

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  var siteLabel = props.user.sites[0].label;
  return (
    <div className={classes.grow}>
      <AppBar position="static" color="primary">
        <Toolbar>


        {props.user.sites.length > 1? 
              <Select
                labelId="select-site-label"
                id="site-select"
                value={props.user.site}
                onChange={(e) => props.onSiteChange(e.target.value)}
                style={{fontSize:'150%'}}
              >
                {props.user.sites.map(site => (
                  <MenuItem key={site._id} value={site}>{site.label}</MenuItem>
                ))}
              </Select>
          :<Typography className={classes.title} variant="h6" noWrap>
          {siteLabel}
        </Typography>}


          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
                {avatarIcon}
            </IconButton>
          </div>
          {/* <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div> */}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
