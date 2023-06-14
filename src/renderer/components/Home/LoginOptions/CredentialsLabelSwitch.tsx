import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { FormControlLabel, Switch } from "@mui/material";

import { infoAlert, warningAlert } from "../../../utils/Alert";

import { AlertMsg } from "../../../../types/AlertMsg";

interface Props {
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  checked: boolean;
  setAlertMsg?: Dispatch<SetStateAction<AlertMsg>>;
}

export function UseSavedCredentialsSwitch({
  setIsChecked,
  checked,
  setAlertMsg,
}: Props) {
  const api = window.fileSystemAPI;
  const [username, setUsername] = useState<string>("");

  const alertMsg = () =>
    username
      ? setAlertMsg(infoAlert(`The account '${username}' will be use`))
      : setAlertMsg(warningAlert("No account saved yet"));

  const getSavedCredentials = async () => {
    const username = await api.getSavedCredentials();
    const isUsernameSaved = username !== "";

    if (isUsernameSaved) {
      setIsChecked(true);
      setUsername(username);
    } else {
      alertMsg();
    }
  };

  useEffect(() => {
    checked && alertMsg();
  }, [username, checked]);

  return (
    <FormControlLabel
      id={"useSavedCred"}
      control={
        <Switch
          onChange={(_, checked) => {
            checked ? getSavedCredentials() : setIsChecked(checked);
          }}
        />
      }
      label={"Use Saved Credentials"}
      checked={checked}
    />
  );
}

export function SavedCredentialsSwitch({
  setAlertMsg,
  setIsChecked,
  checked,
}: Props) {
  useEffect(() => {
    checked && setAlertMsg(infoAlert("The credentials provided will be saved"));
  }, [checked]);

  return (
    <FormControlLabel
      id={"saveCred"}
      control={
        <Switch onChange={() => setIsChecked((prevState) => !prevState)} />
      }
      label={"Save Credentials"}
      checked={checked}
    />
  );
}
