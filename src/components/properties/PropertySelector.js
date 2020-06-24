
import React, {useState, useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import * as Properties from './Properties'

export default function PropertySelector(props) {
    let propSelector = [];

    if(props.extra.type === Properties.TEXT_PROPERTY.id) { //text
        propSelector = <TextField {...props} label={props.label} value={props.value} onChange={props.onChange}/>;
    } else if(props.extra.type === Properties.NUM_PROPERTY.id) { //numerique

    } else if(props.extra.type === Properties.LIST_PROPERTY.id) { //liste
      propSelector =<FormControl {...props}>
        <InputLabel id="demo-mutiple-name-label">{props.label}</InputLabel>
        <Select
          labelId="demo-mutiple-name-label"
          id="demo-mutiple-name"
          multiple={props.extra.multi}
          value={props.value}
          onChange={props.onChange}
          input={<Input />}
          
        >
          {props.extra.items.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    }  else if(props.type===Properties.DB_LINK_PROPERTY.id) { //DB link (HL7)  

    }

    return (propSelector);
}