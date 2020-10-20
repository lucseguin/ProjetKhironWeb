import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        //backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%',
        width: '100%'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        color: theme.palette.text.primary,
        width: '300px',
    },
    paper2: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        color: theme.palette.text.primary,
        width: '300px',
    },

    tableContainer: {
        maxHeight: 280,
    },
    table: {
        minWidth: 800,
    },
    tableHeaderCell: {
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    },
    statusIcons: {
        width: 24,
        height: 24
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


export default function NewPasswordScreen(props:any) {
    const classes = useStyles();

    const [pwd, setPwd] = useState('');
    const [confirmedPwd, setConfirmedPwd] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isProcessingLogin, setIsProcessingLogin] = useState(false);
    const [paletteType, setPaletteType] = useState('light');

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: 'light',
                },
            }),
        [paletteType],
    );

    const handleLogin = () => {
        setErrorMessage('');
        setIsProcessingLogin(true);
        if(props.onNewPassword) {
            props.onNewPassword(props.user, props.email, pwd)
            .then(() => {
                //setIsProcessingLogin(false);
            }).catch((error:any) => {
                //console.log("[NewPasswordScreen] Error login in : " + error.message);
                setErrorMessage(error.message);
                setIsProcessingLogin(false);
            })
        }
    }

    return (<ThemeProvider theme={theme}>
        <div className={classes.root} >
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={true}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={true}>
                    <div className={classes.paper}>
                        <Grid container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            style={{ padding: 10, width:'100%'}}
                            spacing={1}>
                            <Grid item>
                                <Typography>
                                    Projet Khiron
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    Vous devez changer votre mot de passe
                                </Typography>
                            </Grid>
                            <Grid item>
                                {isProcessingLogin?<CircularProgress size={14}/>:null}
                            </Grid>
                            <Grid item style={{ width:'100%'}}>
                                <TextField
                                    id="standard-account-input"
                                    label="Nouveau mot de passe"
                                    type="password"
                                    autoComplete="new-password"
                                    value={pwd}
                                    onChange={event => setPwd(event.target.value)}
                                    style={{ width:'100%'}}
                                />
                            </Grid>
                            <Grid item style={{ width:'100%'}}>
                                <TextField
                                    id="standard-password-input"
                                    label="Confirmer mot de passe"
                                    type="password"
                                    value={confirmedPwd}
                                    onChange={event => setConfirmedPwd(event.target.value)}
                                    style={{ width:'100%'}}
                                />
                            </Grid>
                            <Grid item>
                                {props.errorMessage ? <Typography style={{ color: 'red' }}>{props.errorMessage}</Typography> : null}
                                <Typography style={{ color: 'red' }}>{errorMessage}</Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained" color="primary"
                                    style={{ width: 150 }}
                                    disabled={isProcessingLogin || pwd.trim().length === 0 || confirmedPwd.trim().length === 0}
                                    onClick={handleLogin}
                                >Mettre à jours</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </Modal >
        </div >
    </ThemeProvider >);
}