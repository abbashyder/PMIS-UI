import { forwardRef, ReactElement, ElementType } from 'react';
import { Icon, IconifyIcon } from '@iconify/react';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';

interface IconifyProps {
  icon: IconifyIcon | string;
  width?: number;
  sx?: SxProps;
  [key: string]: any;
}

const Iconify = forwardRef<SVGSVGElement, IconifyProps>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon as ElementType}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

Iconify.displayName = 'Iconify';

export default Iconify;
