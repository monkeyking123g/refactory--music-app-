import { createTheme } from "@mui/material/styles";

/// MAIN COLORS
export const colors = {
  primary: "rgba(36, 37, 42, 1)",
  secondary: "rgba(0, 136, 169, 1)",
  secondaryBlue: "#0077ff",
  text: "#edf0f1",
};
// THEME SETTING
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgba(0, 136, 169, 1)",
      // main: "#fff",
    },
    secondary: {
      main: "rgba(36, 37, 42, 1)",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'Sofia Sans', sans-serif",
    },
  },
});
