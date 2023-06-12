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

  const changeCredentials = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    setAccount((account) => ({
      username: id === "username" ? value : account.username,
      password: id === "password" ? value : account.password,
    }));
  };

  usePreventSavingCredentialsConflict(
    saveCredentials,
    useSavedCredentials,
    setSaveCredentials
  );

  return (
    <Stack width={"100%"}>
      <Collapse in={!useSavedCredentials} orientation="vertical">
        <CredentialsBox>
          <UsernameInput onChange={changeCredentials} />
          <PasswordBox>
            <PasswordInput
              type={showPassword ? "text" : "password"}
              onChange={changeCredentials}
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

function usePreventSavingCredentialsConflict(
  saveCredentials: boolean,
  useSavedCredentials: boolean,
  setSaveCredentials: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    if (useSavedCredentials && saveCredentials) {
      setSaveCredentials(false);
    }
  }, [useSavedCredentials]);
}
