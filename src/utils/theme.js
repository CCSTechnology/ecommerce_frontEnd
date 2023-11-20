import { createContext, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
const tokens = {
  grey: {
    100: "#141414",
    200: "#292929",
    300: "#3d3d3d",
    400: "#525252",
    500: "#666666",
    600: "#858585",
    700: "#a3a3a3",
    800: "#c2c2c2",
    900: "#e0e0e0",
  },
  primary: {
    100: "#040509",
    200: "#080b12",
    300: "#0c101b",
    400 : "#951e76",
    // 400: "rgba(0, 178, 7, 1)", // manually changed
    500: "#141b2d",
    600: "#1F2A40",
    700: "#727681",
    800: "#a1a4ab",
    900: "#d0d1d5",
  },
  greenAccent: {
    100: "#0f2922",
    200: "#1e5245",
    300: "#2e7c67",
    400: "#3da58a",
    500: "#4cceac",
    600: "#70d8bd",
    700: "#94e2cd",
    800: "#b7ebde",
    900: "#dbf5ee",
  },
  redAccent: {
    100: "#2c100f",
    200: "#58201e",
    300: "#832f2c",
    400: "#af3f3b",
    500: "#db4f4a",
    600: "#e2726e",
    700: "#e99592",
    800: "#f1b9b7",
    900: "#f8dcdb",
  },
  blueAccent: {
    100: "#151632",
    200: "#2a2d64",
    300: "#3e4396",
    400: "#535ac8",
    500: "#6870fa",
    600: "#868dfb",
    700: "#a4a9fc",
    800: "#c3c6fd",
    900: "#e1e2fe",
  },
}

const shadows = ["10px 10px 13px -8px rgba(149,30,118,0.42),10px 10px 13px -8px rgba(149,30,118,0.42),10px 10px 13px -8px rgba(149,30,118,0.42)",
  "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
  "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
  "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
  "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
  "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
  "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
  "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
  "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
  "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
  "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
  "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
  "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
  "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
  "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
  "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
  "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
  "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
  "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
  "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
  "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
  "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
  "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
  "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
  "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)"]




export const theme = createTheme({
  shadows,
  palette: {
    success : {
      main : "#00b207",
      light : "#4caf50",
      dark : "#1b5e20",
      contrastText : "#fff"
    },

    primary: {
      ...tokens.primary,
      main: tokens.primary[400],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.greenAccent[500],
    },
    neutral: {
      dark: tokens.grey[700],
      main: tokens.grey[500],
      light: tokens.grey[100],
    },
    background: {
      default: "#rgba(255, 255, 255, 1)",
    }
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontSize: 12,

    h1: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
})



