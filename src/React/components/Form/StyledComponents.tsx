import React from "react";

import { Stack, Input, Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import NearMeIcon from "@mui/icons-material/NearMe";

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

export const CredentialsBox = styled(Stack)({});

CredentialsBox.defaultProps = {
  direction: "column",
  width: "100%",
  height: "100%",
  spacing: 2,
};

export const UsernameInput = styled(Input)({});

UsernameInput.defaultProps = {
  id: "username",
  name: "username",
  placeholder: "Username",
};

export const PasswordInput = styled(Input)({
  borderBottom: "none",
  boxShadow: "none",
});

PasswordInput.defaultProps = {
  fullWidth: true,
  id: "password",
  name: "password",
  placeholder: "Password",
};

export const PasswordBox = styled(Stack)({
  position: "relative",
  borderBottom: "1px solid rgba(208, 2, 27, 1)",
  boxShadow: "0px 1px 1px rgba(208, 2, 27, 0.25)",
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
    color: "success",
  };
  return {
    marginLeft: "24px",
  };
});

export function SubmitButtonIcon({ submited }: { submited: boolean }) {
  return submited ? (
    <CircularProgress style={{ color: "#fff", width: "24px", height: "24px"  }} />
  ) : (
    <NearMeIcon style={{ color: "#fff" }} />
  );
}

export const StackCentered = styled(Stack)({});
StackCentered.defaultProps = {
  justifyContent: "center",
  alignItems: "center",
};
