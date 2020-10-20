import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import { Accordion } from '@material-ui/core';
import { AccordionSummary } from '@material-ui/core'
import { AccordionDetails } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export default function AvailableAlgos(props) {
    let allAlgoRows = null;
  
    if(!props.loading) {
      allAlgoRows =   <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
    >
      <Grid item>
        <Typography variant="subtitle1" gutterBottom>
          Algorithm d'assignation des demandes
        </Typography>  
      </Grid>
      <Grid item><Paper><RadioGroup aria-label="bearer-algo" name="bearer-algo" value={props.value} onChange={props.onChange}>
      {props.allAlgos.map((algo) => (
      <Accordion key={algo.name}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Radio />}
            label={algo.label}
            value={algo.name}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
          {algo.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      ))}
      </RadioGroup>
      </Paper>
      </Grid>
  </Grid>
    }else{
      allAlgoRows = [<Typography key="t1-aa" variant="subtitle1" gutterBottom>
      Algorithm d'assignation des demandes
    </Typography>  ,<LinearProgress key="lp-aa"/>]
    }
  
    return(allAlgoRows)
  
  }