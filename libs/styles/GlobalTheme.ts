"use client";
import { createTheme } from "@mui/material";

export const GlobalTheme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#112D4E",
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});
