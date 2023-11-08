import { createTheme, ThemeOptions } from '@mui/material/styles';
import { palette as createPalette } from '@/components/theme/custom/palette';
import { shadows as createShadows } from '@/components/theme/custom/shadows';
import { overrides as createOverrides } from '@/components/theme/custom/overrides';
import { customShadows as createCustomShadows } from '@/components/theme/custom/custom-shadows';
import { typography as createTypography } from '@/components/theme/custom/typography';


// Ensure that the function returns a ThemeOptions object, not a Theme object
export default function customTheme(): ThemeOptions {
  // Call the functions to get the respective theme parts
  const palette = createPalette();
  const shadows = createShadows();
  const customShadows = createCustomShadows();
  const typography = createTypography();

  // Create a base theme to pass to the overrides function
  const baseTheme = createTheme({
    palette,
    typography,
    shadows,
    customShadows,
    shape: { borderRadius: 8 },
  });

  // Now create the final theme with overrides using the base theme
  const theme = createTheme(baseTheme, {
    components: createOverrides(baseTheme), // Pass the base theme to the overrides function
  });

  return theme;
}
