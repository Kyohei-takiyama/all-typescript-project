// https://mui.com/material-ui/customization/palette/#adding-new-colors
// https://mui.com/material-ui/customization/theming/#custom-variables
import type { iconSet } from "./iconSet/light";
import type custom from "./palette/light.json";

export declare module "@mui/material/styles" {
  interface TypeText {
    tertiary: string;
  }

  interface TypeText {
    tertiary: string;
  }

  interface Palette {
    custom: typeof custom;
  }

  interface PaletteOptions {
    custom: typeof custom;
  }

  interface Theme {
    iconSet: typeof iconSet;
  }

  interface ThemeOptions {
    iconSet: typeof iconSet;
  }
}
