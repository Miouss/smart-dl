import { createTheme } from "@mui/material/styles";
import {
  MUIInputColor,
  MUISwitchColor,
  MUIFormControlLabelColor,
  MUIStepLabelIconColor,
  MUIStepLabelColor,
  TabsIndicatorColor,
  TabColor,
  TabDisabledColor,
  MUIStepConnectorColor,
} from "./colors";
import {
  StepLabelProps,
  StepConnectorProps,
  TabProps,
} from "@mui/material";

const textStyle = {
  fontFamily: "Roboto Slab",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "1rem",
};

const MuiStepLabel = {
  styleOverrides: {
    iconContainer: {
      color: MUIStepLabelIconColor,
    },
    label: ({
      ownerState,
    }: {
      ownerState: StepLabelProps & Record<string, unknown>;
    }) => ({
      ...textStyle,
      color: `${
        ownerState.completed
          ? MUIStepLabelColor.done
          : ownerState.active
          ? MUIStepLabelColor.active
          : MUIStepLabelColor.waiting
      } !important`,
    }),
  },
};

const MuiStepConnector = {
  styleOverrides: {
    alternativeLabel: {
      top: 24,
    },
    line: ({
      ownerState,
    }: {
      ownerState: StepConnectorProps & Record<string, unknown>;
    }) => ({
      backgroundColor: ownerState.completed
        ? MUIStepConnectorColor.done
        : ownerState.active
        ? MUIStepConnectorColor.active
        : MUIStepConnectorColor.waiting,
      height: 3,
      border: 0,
      borderRadius: 1,
    }),
  },
};

const MuiInput = {
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
};

const MuiSwitch = {
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
};

const MuiFormControlLabel = {
  styleOverrides: {
    root: {
      margin: 0,
    },
    label: {
      ...textStyle,
      color: `${MUIFormControlLabelColor}`,
    },
  },
};

const MuiTabs = {
  styleOverrides: {
    flexContainer: {
      gap: "10px",
    },
    indicator: {
      backgroundColor: TabsIndicatorColor,
    },
  },
};

const MuiTab = {
  styleOverrides: {
    root: ({ ownerState }: { ownerState: TabProps }) => ({
      ...textStyle,
      color: `${ownerState.disabled ? TabDisabledColor : TabColor} !important`,
      margin: 0,
      padding: 0,
    }),
  },
};

const MuiGrid = {
  styleOverrides: {
    container: {
      maxWidth: "600px",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      columnGap: "30px",
      rowGap: "10px",
    },
  },
};

const MuiAlert = {
  styleOverrides: {
    root: {
      width: "fit-content",
      height: "fit-content",
    },
  },
};

const customTheme = createTheme({
  components: {
    MuiInput,
    MuiSwitch,
    MuiFormControlLabel,
    MuiStepLabel,
    MuiStepConnector,
    MuiTabs,
    MuiTab,
    MuiGrid,
    MuiAlert,
  },
});

export default customTheme;
