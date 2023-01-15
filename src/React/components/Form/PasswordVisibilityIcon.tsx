import React, { Dispatch, SetStateAction } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import styled from "@emotion/styled";
import { PasswordVisibilityIconColor } from "../../utils/style/colors";

interface Props {
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
}

export default function PasswordVisibilityIcon({
  setShowPassword,
  visible,
}: Props) {
  const Icon = visible ? styled(VisibilityIcon)({}) : styled(VisibilityOffIcon)({});

  const VisibilityIconStyle = {
    color: PasswordVisibilityIconColor,
    cursor: "pointer",
  };
  
  return (
    <Icon onClick={() => setShowPassword((state) => !state)} sx={VisibilityIconStyle} />
  );
}
