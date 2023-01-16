import React, { Dispatch, SetStateAction } from "react";
import { styled } from "@mui/material/styles";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { PasswordVisibilityIconColor } from "../../../styles/colors";

interface Props {
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
}

export default function PasswordVisibilityIcon({
  setShowPassword,
  visible,
}: Props) {
  const Icon = visible
    ? styled(VisibilityIcon)({})
    : styled(VisibilityOffIcon)({});

  const VisibilityIconStyle = {
    color: PasswordVisibilityIconColor,
    cursor: "pointer",
    position: "absolute",
    right: "0",
  };

  return (
    <Icon
      onClick={() => setShowPassword((state) => !state)}
      sx={VisibilityIconStyle}
    />
  );
}
