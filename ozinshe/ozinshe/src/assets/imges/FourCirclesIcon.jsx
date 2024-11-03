import React from 'react';
import { SvgIcon } from '@mui/material';

function FourCirclesIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
    </SvgIcon>
  );
}

export default FourCirclesIcon;
