import { createTheme } from "@mui/material/styles";
import { MUIInputColor, MUISwitchColor, MUIFormControlLabelColor } from "./colors";

const customTheme = createTheme({
    components: {
      MuiInput: {
        defaultProps: {
          disableUnderline: true,
        },
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${MUIInputColor.borderBottom}`,
            boxShadow: `0px 1px 1px ${MUIInputColor.boxShadow}`,
          },
          input: {
            color: `${MUIInputColor.normal}`,
            "&::placeholder": {
              color: `${MUIInputColor.placeholder}`,
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            "& .MuiSwitch-switchBase": {
              "&+ .MuiSwitch-track": {
                backgroundColor: `${MUISwitchColor.unchecked}`,
              },
              "&.Mui-checked": {
                "+ .MuiSwitch-track": {
                  backgroundColor: `${MUISwitchColor.checked}`,
                },
                "& .MuiSwitch-thumb": {
                  color: `${MUISwitchColor.thumb}`,
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
              color: `${MUIFormControlLabelColor }`,
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

  export default customTheme;