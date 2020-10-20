
import React from "react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as Properties from './Properties'
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DOMPurify from 'dompurify';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
//import { ThemeContext } from "@emotion/core";
//import InputMask from 'react-input-mask';

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={props.mask?props.mask:['(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};



const stringToRegExArray = (strValue) => {

}

export default function PropertySelector(props) {

  const autoCompleteOnChange = (event, value, reason) => {
    if(props.extra.multi) {
      var ar = value.map(function(item) { return item['_id']; });
      if(ar && ar.length > 0)
        props.onChange({target:{value:ar}});
      else
        props.onChange({target:{value:undefined}});
    } else {
      if(value)
        props.onChange({target:{value:value._id}});
      else
        props.onChange({target:{value:undefined}});
    }
  }
  const getOptionSelected = (option,value) => {
    if(props.value) {
      if(props.extra.multi) {
        if(props.value.length > 0)
          return props.value.includes(option._id);
        else
          return true;
      }else{
        return (option._id === props.value);
      }
    }else{
      return true;
    }
  }

  const theme = useTheme();
  let propSelector = null;

    if(props.extra.type === Properties.TEXT_PROPERTY) { //text
        propSelector = <TextField id={props.extra._id+"-text"} {...props} required={props.extra.required?true:false} helperText={props.extra.required?"Valeur obligatoire":null} label={props.label} value={props.value} onChange={props.onChange}/>;
    } else  if(props.extra.type === Properties.PHONE_NUM_PROPERTY) {
      propSelector = <FormControl id={props.extra._id+"-fc"} required={props.extra.required?true:false}  {...props}>
        <InputLabel id={props.extra._id+"-label"}>{props.label}</InputLabel>
        <Input
          onChange={props.onChange}
          value={props.value}
          name="textmask"
          id={props.extra._id+"-mask"}
          inputComponent={TextMaskCustom}
          inputProps={{
            mask:  ['(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
          }}
          style={{width:'100%'}}
        />
        {props.extra.required?<FormHelperText>Valeur obligatoire</FormHelperText>:null}
      </FormControl>
    } else  if(props.extra.type === Properties.EMAIL_PROPERTY) {
      propSelector = <TextField placeholder="email@example.com" type="email"  id={props.extra._id+"-text"} {...props} required={props.extra.required?true:false} helperText={props.extra.required?"Valeur obligatoire":null} label={props.label} value={props.value} onChange={props.onChange}/>;
      //propSelector = [<TextField required={props.extra.required?true:false} helperText={props.extra.required?"Valeur obligatoire":null} placeholder="email@example.com" type="email" name="email" label={props.label} value={props.value} onChange={props.onChange} />];
    } else if(props.extra.type === Properties.YES_NO_PROPERTY) { //numerique
      propSelector =
        <FormControl id={props.extra._id+"-fc"} required={props.extra.required?true:false}  {...props}>
          <Box style={{color:props.error?'red':theme.palette.text.primary}} component="div" display="inline"  key={props.extra._id+"-yesno-div2"} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.extra.question) }}></Box>
          <ButtonGroup size="large" color="primary" key={props.extra._id+"-yesno-bg"}  >
            <Button id={props.extra._id+"-yes"}  variant={props.value==='yes'?'contained':'outlined'} onClick={() => (props.value!=='yes')?props.onChange({target:{value:'yes'}}):props.onChange({target:{value:undefined}})}>Oui</Button>
            <Button id={props.extra._id+"-no"}  variant={props.value==='no'?'contained':'outlined'} onClick={() => (props.value!=='no')?props.onChange({target:{value:'no'}}):props.onChange({target:{value:undefined}})}>Non</Button>
          </ButtonGroup>
          {props.extra.required?<FormHelperText>Valeur obligatoire</FormHelperText>:null}
        </FormControl>
    } else if(props.extra.type === Properties.NUM_PROPERTY) { //numerique
      //TODO : numeric mask
      propSelector = <TextField id={props.extra._id+"-numeric"} {...props} required={props.extra.required?true:false} helperText={props.extra.required?"Valeur obligatoire":null} label={props.label} value={props.value} onChange={props.onChange}/>;
    } else if(props.extra.type === Properties.LIST_PROPERTY) { //liste
      var disabled = (props.disabled)?true:false;
      var error = (props.error)?true:false;
      propSelector =<FormControl id={props.extra._id+"-fc"} required={props.extra.required?true:false} {...props}>        
        <Autocomplete
          id={props.extra._id+"-ac"}
          multiple={props.extra.multi}
          renderInput={(params) => <TextField error={error} {...params} label={props.label} variant="outlined" />}
          getOptionSelected={getOptionSelected}
          options={props.extra.items}
          onChange={autoCompleteOnChange}
          disabled={disabled}
          getOptionLabel={(option) => (option)?option.text:''}
          style={{width:'95%'}}
        >
        </Autocomplete>
        {props.extra.required?<FormHelperText>Sélection obligatoire</FormHelperText>:null}
      </FormControl>
    } 

    return (propSelector);
}