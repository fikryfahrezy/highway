"use client";

import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#f59e0b",
          dark: "#b45309",
          light: "#fcd34d",
          contrastText: "#ffffff",
        },
        secondary: {
          main: "#d97706",
          contrastText: "#ffffff",
        },
        background: {
          default: "#f5f5f5",
          paper: "#ffffff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#f59e0b",
          dark: "#b45309",
          light: "#fcd34d",
          contrastText: "#ffffff",
        },
        secondary: {
          main: "#d97706",
          contrastText: "#ffffff",
        },
        background: {
          default: "#121212",
          paper: "#1e1e1e",
        },
      },
    },
  },
  typography: {
    fontFamily: [
      "var(--font-geist-mono)",
      "var(--font-geist-sans)",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            textTransform: "none",
            minWidth: "auto",
            "&.Mui-selected": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              borderRadius: 4,
            },
          };
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: "none",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableRow-root": {
            backgroundColor: "var(--mui-palette-TableCell-border)",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            "&.Mui-selected": {
              backgroundColor: theme.palette.primary.light,
              "&:hover": {
                backgroundColor: theme.palette.primary.light,
              },
            },
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          };
        },
      },
    },
  },
});

export function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
