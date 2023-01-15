import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { VodTitleColor, VodDescriptionColor } from "../../utils/style/colors";


export const VodTitle = styled(Typography)<{
    component: React.ElementType;
  }>({
    color: VodTitleColor,
  });

VodTitle.defaultProps = {
    gutterBottom: true,
    variant: "h5",
    component: "div",
} 


export const VodDescription = styled(Typography)({
    color:VodDescriptionColor
});

VodDescription.defaultProps = {
    variant: "body2",
}