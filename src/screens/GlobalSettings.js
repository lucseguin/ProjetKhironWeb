import React from "react";

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

export default function GlobalSettings(props) {
    return (
        <Paper elevation={0} style={{ height: "100vh", verticalAlign: 'top', alignItems: 'top',
        justifyContent: 'top', }}>
          <TableContainer>
            <Table size="small">
              <TableBody>
                <TableRow>
                  <TableCell colSpan={3} style={{ width:'100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Configurations Systèmes
                    </Typography>  
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} style={{ width:'100%' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Systèmes d'authenfication d'usager
                    </Typography>  
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} >
                    <Typography variant="subtitle1" gutterBottom>
                      Base de donnée patient
                    </Typography>  
                  </TableCell>
                </TableRow>
               
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
    );
}
