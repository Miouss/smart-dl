import { ButtonGroup } from "@mui/material";
import { styled } from "@mui/material/styles";

const NavbarButtonGroup = styled(ButtonGroup)({
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

export default NavbarButtonGroup;