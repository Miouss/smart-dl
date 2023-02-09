import React from "react";

import {
  Stack,
  Stepper,
  Step,
  StepConnector,
  StepLabel,
  StepIconProps,
} from "@mui/material";

import { StyledStepIconContainer } from "../../../../../styles/components/specific/Stepper";

interface Props {
  visible: boolean;
  steps: string[];
  icons: { [index: string]: React.ReactElement };
  activeStep: number;
  tasks: React.ReactNode;
}

export default function StepperCustom({
  visible,
  steps,
  icons,
  activeStep,
  tasks,
}: Props) {
  return (
    <>
      <Stepper
        activeStep={activeStep}
        connector={<StepConnector />}
        alternativeLabel
        style={{ display: visible ? "flex" : "none " }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={(props) => customizedStepIcon(icons, props)}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Stack
        direction={"column"}
        marginTop={"1rem"}
        marginBottom={"1rem"}
        style={{ display: visible ? "flex" : "none " }}
      >
        {tasks}
      </Stack>
    </>
  );
}

function customizedStepIcon(
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
