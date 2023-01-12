import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  components: {
    MuiInput: {
      defaultProps: {
        disableUnderline: true,
      },
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(208, 2, 27, 1)",
          boxShadow: "0px 1px 1px rgba(208, 2, 27, 0.25)",
        },
        input: {
          color: "white",
          "&::placeholder": {
            color: "#828282",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          "& .MuiSwitch-switchBase": {
            "&+ .MuiSwitch-track": {
              backgroundColor: "red",
              opacity: 1,
            },
            "&.Mui-checked": {
              "+ .MuiSwitch-track": {
                backgroundColor: "green",
                opacity: 1,
              },
              "& .MuiSwitch-thumb": {
                color: "white",
              },
            },
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          "& .MuiFormControlLabel-label": {
            color: "#E0E0E0",
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "18px",
            lineHeight: "21px",
          },
        },
      },
    },
  },
});

export const mainFrameStyle = {
  height: "100vh",
  width: "100vw",
};

export const VisibilityIconStyle = {
  color: "white",
  cursor: "pointer",
};

export const ReservedBoxStyle = {height: "48px" };
export const AlertStyle = { width: "fit-content", height: "fit-content" };
