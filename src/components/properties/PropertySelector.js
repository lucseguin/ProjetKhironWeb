
import React from "react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import * as Properties from './Properties'

export default function PropertySelector(props) {
  let propSelector = [];

    if(props.extra.type === Properties.TEXT_PROPERTY) { //text
        propSelector = <TextField {...props} required={props.extra.required?true:false} helperText={props.extra.required?"Valeur obligatoire":null} label={props.label} value={props.value} onChange={props.onChange}/>;
    } else if(props.extra.type === Properties.NUM_PROPERTY) { //numerique

    } else if(props.extra.type === Properties.LIST_PROPERTY) { //liste
      propSelector =<FormControl required={props.extra.required?true:false} {...props}>
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
            <MenuItem key={option._id} value={option._id}>
              {option.text}
            </MenuItem>
          ))}
        </Select>
        {props.extra.required?<FormHelperText>Sélection obligatoire</FormHelperText>:null}
      </FormControl>
    }  else if(props.type===Properties.DB_LINK_PROPERTY) { //DB link (HL7)  

    }

    return (propSelector);
}