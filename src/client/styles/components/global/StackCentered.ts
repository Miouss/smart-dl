import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const StackCentered = styled(Stack)({});

StackCentered.defaultProps = {
  justifyContent: "center",
  alignItems: "center",
};

export default StackCentered;
