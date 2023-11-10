// RtlApp.js
import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const RtlApp = ({ children }) => {
  const theme = createTheme({
    direction: "ltr", // Enable RTL support
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default RtlApp;
