import React from "react";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { green } from '@material-ui/core/colors';

export default function UserAccountStatus(props) {
    let statusIcon;
    if (props.account.status === 'online')
      statusIcon = <FiberManualRecordIcon style={{ color: green[500] }} />;
    else
      statusIcon = <FiberManualRecordIcon />;
    return statusIcon;
}
