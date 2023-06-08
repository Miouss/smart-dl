import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Collapse, Stack } from "@mui/material";

import {
  SavedCredentialsSwitch,
  UseSavedCredentialsSwitch,
} from "./LoginOptions/CredentialsLabelSwitch";
import PasswordVisibilityIcon from "./LoginOptions/PasswordVisibilityIcon";

import {
  PasswordInput,
  PasswordBox,
  CredentialsBox,
  UsernameInput,
} from "../../styles/components/specific/Form";

import { AlertMsg } from "../../../types/AlertMsg";

interface Account {
  username: string;
  password: string;
}

interface Props {
  setAlertMsg: Dispatch<SetStateAction<AlertMsg>>;
  setAccount: Dispatch<SetStateAction<Account>>;
  setSaveCredentials: Dispatch<SetStateAction<boolean>>;
  setUseSavedCredentials: Dispatch<SetStateAction<boolean>>;
  useSavedCredentials: boolean;
  saveCredentials: boolean;
}

export default function HomeLogin({
  setAlertMsg,
  setAccount,
  setSaveCredentials,
  setUseSavedCredentials,
  useSavedCredentials,
  saveCredentials,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleCredentials = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAccount((account) => ({
      username: e.target.id === "username" ? e.target.value : account.username,
      password: e.target.id === "password" ? e.target.value : account.password,
    }));
  };

  useEffect(() => {
    if (useSavedCredentials && saveCredentials) {
      setSaveCredentials(false);
    }
  }, [useSavedCredentials]);

  return (
    <Stack width={"100%"}>
      <Collapse in={!useSavedCredentials} orientation="vertical">
        <CredentialsBox>
          <UsernameInput onChange={(e) => handleCredentials(e)} />
          <PasswordBox>
            <PasswordInput
              type={showPassword ? "text" : "password"}
              onChange={(e) => handleCredentials(e)}
            />
            <PasswordVisibilityIcon
              setShowPassword={setShowPassword}
              visible={showPassword}
            />
          </PasswordBox>
          <SavedCredentialsSwitch
            setAlertMsg={setAlertMsg}
            setIsChecked={setSaveCredentials}
            checked={saveCredentials}
          />
        </CredentialsBox>
      </Collapse>
      <UseSavedCredentialsSwitch
        setAlertMsg={setAlertMsg}
        setIsChecked={setUseSavedCredentials}
        checked={useSavedCredentials}
      />
    </Stack>
  );
}
