
import React, {useState, useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import * as Properties from './Properties'

export default function PropertySelector(props) {
    let propSelector = [];

    if(props.extra.type === Properties.TEXT_PROPERTY.id) { //text
        propSelector = <TextField {...props} label={props.label} value={props.value} onChange={props.onChange}/>;
    } else if(props.extra.type === Properties.NUM_PROPERTY.id) { //numerique

    } else if(props.extra.type === Properties.LIST_PROPERTY.id) { //liste
        propSelector = <TextField
            select
            {...props}
            value={props.value}
            onChange={props.onChange}
            label={props.label}
         >
          {props.extra.items.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.text}
            </MenuItem>
          ))}
      </TextField>;   
    }  else if(props.type===Properties.DB_LINK_PROPERTY.id) { //DB link (HL7)  

    }

    return (propSelector);
}