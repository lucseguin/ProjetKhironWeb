import React from "react";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import Tooltip from '@material-ui/core/Tooltip';

import { green, blue, orange } from '@material-ui/core/colors';

export default function UserAccountStatus(props) {
    let statusIcon;
    if (props.account.status === 'online')
      statusIcon = <Tooltip title="en ligne">{props.account.statusDevice === 'mobile'?<PhoneAndroidIcon aria-label="en ligne" style={{ color: green[500] }} />:<FiberManualRecordIcon aria-label="en ligne" style={{ color: green[500] }} />}</Tooltip>;
    else if (props.account.status === 'offline')
      statusIcon =  <Tooltip title="hors ligne">{props.account.statusDevice === 'mobile'?<PhoneAndroidIcon aria-label="hors ligne" />:<FiberManualRecordIcon aria-label="hors ligne" />}</Tooltip>;
    else if (props.account.status === 'break')
      statusIcon = <Tooltip title="en pause">{props.account.statusDevice === 'mobile'?<PhoneAndroidIcon aria-label="en pause" style={{ color: blue[500] }}/>:<FiberManualRecordIcon aria-label="en pause" style={{ color: blue[500] }}/>}</Tooltip>;
    else if (props.account.status === 'lunch')
      statusIcon = <Tooltip title="en lunch">{props.account.statusDevice === 'mobile'?<PhoneAndroidIcon aria-label="en lunch" style={{ color: orange[500] }}/>:<FiberManualRecordIcon aria-label="en lunch" style={{ color: orange[500] }}/>}</Tooltip>;
    else
      statusIcon = <FiberManualRecordIcon />;
    return statusIcon;
}
