import React from "react";

import { StepIconProps } from "@mui/material/StepIcon";
import { StyledStepIconContainer } from "../components/styled/Stepper";


export function customizedStepIcon(
  icons: { [index: string]: React.ReactElement },
  props: StepIconProps
) {
  const { active, completed, className } = props;
  
  return (
    <StyledStepIconContainer
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </StyledStepIconContainer>
  );
}
