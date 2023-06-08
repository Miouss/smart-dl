import { Button, ButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  CancelButtonColor,
  DownloadButtonColor,
  DownloadDisabledButtonColor,
  HomeButtonColor,
  RetryButtonColor,
} from "../../colors";

export const NavbarButtonGroup = styled(ButtonGroup)({
  gap: 20,
  justifyContent: "center",
  "& .MuiButtonGroup-grouped:not(:last-of-type)": {
    border: "none",
  },
});

NavbarButtonGroup.defaultProps = {
  fullWidth: true,
  disableFocusRipple: true,
  disableRipple: true,
  variant: "contained",
};

export const DownloadDisabledButton = styled(Button)({
  "&.Mui-disabled": {
    backgroundColor: DownloadDisabledButtonColor,
  },
});

DownloadDisabledButton.defaultProps = {
  disabled: true,
};

export const CancelButton = styledButtonSimple(
  CancelButtonColor.normal,
  CancelButtonColor.hover
);

export const DownloadButton = styledButtonSimple(
  DownloadButtonColor.normal,
  DownloadButtonColor.hover
);

export const HomeButton = styledButtonSimple(
  HomeButtonColor.normal,
  HomeButtonColor.hover
);

export const RetryButton = styledButtonSimple(
  RetryButtonColor.normal,
  RetryButtonColor.hover
);

function styledButtonSimple(normalColor: string, hoverColor: string) {
  return styled(Button)({
    backgroundColor: normalColor,
    "&:hover": {
      backgroundColor: hoverColor,
    },
  });
}
