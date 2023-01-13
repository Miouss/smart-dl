import { styled } from "@mui/material/styles";

import { Button } from "@mui/material";

const SelectButton = styled(Button)(
  ({ lowercase }: { lowercase?: string }) => ({
    fontFamily: "Roboto Slab",
    fontWeight: "400",
    lineHeight: "21px",
    margin: 0,
    color: "#FFFFFF",
    textTransform: lowercase ? "lowercase" : "uppercase",
    backgroundColor: "#4F4F4F",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "2px",
    ":hover": {
      backgroundColor: "rgba(208, 2, 27, 1)",
    },
  })
);

SelectButton.defaultProps = {
  variant: "contained",
};

export default SelectButton;
