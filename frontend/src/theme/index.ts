// https://mui.com/material-ui/customization/default-theme/

import { PaletteOptions, createTheme } from "@mui/material/styles";
// import { iconSet as iconSetDark } from "./iconSet/dark";
import { iconSet as iconSetLight } from "./iconSet/light";
// import customPaletteDark from "./palette/dark.json";
import customPaletteLight from "./palette/light.json";

// Get the "theme" query parameter from the URL. (default is light).
// const queryTheme = new URLSearchParams(window.location.search).get("theme");
// const colorTheme = queryTheme === "dark" ? "dark" : "light";

const paletteLight: PaletteOptions = {
  mode: "light",
  primary: { main: "#D1E5F9", dark: "#B7DAFD", contrastText: "#fff" },
  secondary: { main: "#494949" },
  success: {
    main: "#019E2D",
    dark: "#019229",
    light: "#00C838",
    contrastText: "#fff",
  }, // Green
  error: { main: "#DC1B3E", dark: "#9F0C26", contrastText: "#fff" }, // Red
  // This satisfies checks consistency with the one of dark.
  // custom: customPaletteLight satisfies typeof customPaletteDark,
  custom: customPaletteLight,
};

// const paletteDark: PaletteOptions = {
//   mode: "dark",
//   primary: { main: "#209CFF", contrastText: "#fff" },
//   secondary: { main: "#494949" },
//   success: { main: "#00C853", contrastText: "#fff" }, // Green
//   error: { main: "#D0312D", contrastText: "#fff" }, // Red
//   // This satisfies checks consistency with the one of light.
//   custom: customPaletteDark satisfies typeof customPaletteLight,
// };

export const theme = createTheme({
  // palette: colorTheme === "dark" ? paletteDark : paletteLight,
  palette: paletteLight,
  typography: {
    fontFamily: [
      "Lato",
      "Helvetica Neue",
      "Arial",
      "Helvetica",
      "sans-serif",
    ].join(","),
    button: {
      // Button labels are automatically capitalized by default.
      textTransform: "none",
    },
  },
  // This satisfies checks consistency between light and dark.
  // iconSet:
  //   colorTheme === "dark" ? (iconSetDark satisfies typeof iconSetLight) : (iconSetLight satisfies typeof iconSetDark),
  iconSet: iconSetLight,
});
