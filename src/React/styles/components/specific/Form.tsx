import React from "react";

import { Stack, Input, Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import NearMeIcon from "@mui/icons-material/NearMe";
import {
  SubmitButtonColor,
  SubmitButtonIconColor,
} from "../../colors";

export const UrlInput = styled(Input)({});

UrlInput.defaultProps = {
  placeholder: "Url Link",
};

export const LoginOptionsStack = styled(Stack)({});

LoginOptionsStack.defaultProps = {
  direction: "column",
  width: "100%",
  height: "100%",
  spacing: 2,
};

export const CredentialsBox = styled(Stack)({ width: "100% !important", height: "100%" });

CredentialsBox.defaultProps = {
  direction: "column",
  spacing: 2,
};

export const UsernameInput = styled(Input)({});

UsernameInput.defaultProps = {
  id: "username",
  name: "username",
  placeholder: "Username",
};

export const PasswordInput = styled(Input)({
  "& .MuiInput-input": {
    width: "85%",
  }
});

PasswordInput.defaultProps = {
  fullWidth: true,
  id: "password",
  name: "password",
  placeholder: "Password",
};

export const PasswordBox = styled(Stack)({
  position: "relative",
});

PasswordBox.defaultProps = {
  direction: "row",
  width: "100%",
  gap: "12px",
};

export const ChooseSaveLocationButton = styled(Button)({
  background: "#4F4F4F",
  marginLeft: "24px",
  "&:hover": {
    background: "rgba(208, 2, 27, 1)",
  },
});

ChooseSaveLocationButton.defaultProps = {
  variant: "contained",
};

export const SubmitButton = styled(Button)(() => {
  SubmitButton.defaultProps = {
    type: "submit",
    variant: "contained",
  };
  return {
    marginLeft: "24px",
    backgroundColor: SubmitButtonColor.normal,
    "&:hover": {
      backgroundColor: SubmitButtonColor.hover,
    },
  };
});

export function SubmitButtonIcon({ submited }: { submited: boolean }) {
  return submited ? (
    <CircularProgress
      style={{
        color: SubmitButtonIconColor.active,
        width: "24px",
        height: "24px",
      }}
    />
  ) : (
    <NearMeIcon style={{ color: SubmitButtonIconColor.waiting }} />
  );
}
