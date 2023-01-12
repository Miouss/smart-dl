import React, { Dispatch, SetStateAction } from "react";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { VisibilityIconStyle } from "../styled/AppStyle";
import styled from "@emotion/styled";

interface Props {
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
}

export default function PasswordVisibilityIcon({
  setShowPassword,
  visible,
}: Props) {
  const Icon = visible ? styled(VisibilityIcon)({}) : styled(VisibilityOffIcon)({});

  return (
    <Icon onClick={() => setShowPassword((state) => !state)} sx={VisibilityIconStyle} />
  );
}
