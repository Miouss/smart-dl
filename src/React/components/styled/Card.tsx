import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";


export const VodTitle = styled(Typography)<{
    component: React.ElementType;
  }>({});

VodTitle.defaultProps = {
    gutterBottom: true,
    variant: "h5",
    component: "div",
    color: "#F2F2F2",
} 


export const VodDescription = styled(Typography)({
    color:"#E0E0E0"
});

VodDescription.defaultProps = {
    variant: "body2",
    color:"#E0E0E0",
}