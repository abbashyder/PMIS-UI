// theme.d.ts or a similar file
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: CustomShadows;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows?: CustomShadows;
  }
}
