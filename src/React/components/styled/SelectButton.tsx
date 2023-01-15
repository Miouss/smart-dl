import { styled } from "@mui/material/styles";

import { Button } from "@mui/material";
import { SelectButonBgColor, SelectButonColor } from "../../utils/style/colors";

const SelectButton = styled(Button)(
  ({ lowercase }: { lowercase?: string }) => ({
    fontFamily: "Roboto Slab",
    fontWeight: "400",
    lineHeight: "21px",
    margin: 0,
    textTransform: lowercase ? "lowercase" : "uppercase",
    backgroundColor: SelectButonColor,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "2px",
    ":hover": {
      backgroundColor: SelectButonBgColor,
    },
  })
);

SelectButton.defaultProps = {
  variant: "contained",
};

export default SelectButton;
