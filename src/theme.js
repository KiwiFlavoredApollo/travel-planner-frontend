import {createTheme} from "@mui/material";

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollbarGutter: "stable",
        },
      },
    },
  },
});
