import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import PlayForWorkOutlinedIcon from '@material-ui/icons/PlayForWorkOutlined';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
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
      backgroundColor:  theme.palette.background.default, 
      color: theme.palette.text.primary,
    },
    statusIcons: {
      width:24,
      height:24
    }
  }));

  
export default function CleaningRequestsSummary(props) {
    const classes = useStyles();
  
    return (
      //<ThemeProvider theme={theme}>
      <Grid container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ padding: 20 }}>
        <Grid item>
          <Typography variant="h6">
            {props.title}
          </Typography>
        </Grid>
        {props.showGraph?
        <Grid item>
          <LineChart
              width={600}
              height={250}
              data={props.data}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </Grid>
        :null}
        <Grid item>
          <TableContainer className={classes.tableContainer} size="small" component={Paper}>
            <Table className={classes.table} size="small" aria-label={props.title} height="100%">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCell}></TableCell>
                  <TableCell className={classes.tableHeaderCell} >Lit</TableCell>
                  <TableCell className={classes.tableHeaderCell} >Assignée à</TableCell>
                  <TableCell className={classes.tableHeaderCell} >Demande</TableCell>
                  <TableCell className={classes.tableHeaderCell} >Accepter</TableCell>
                  <TableCell className={classes.tableHeaderCell} >Terminer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell style={{width:30}}>
                      {request.status==='new'?<PlayForWorkOutlinedIcon className={classes.statusIcons}/>:request.status==='inprogress'?<CircularProgress size={20}/>:request.status==='done'?<CheckCircleOutlinedIcon className={classes.statusIcons}/>:null}
                    </TableCell>
                    <TableCell >{request.location.bedlabel}</TableCell>
                    <TableCell >{request.cleaner.firstName}</TableCell>
                    <TableCell >{request.in}</TableCell>
                    <TableCell >{request.started}</TableCell>
                    <TableCell >{request.completed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>    
      //</ThemeProvider>
    );
  }
  