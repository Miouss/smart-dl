import React, { Dispatch, SetStateAction, useEffect } from "react";

import { FormControlLabel, Switch } from "@mui/material";

import { alertMsgAccount } from "../../../utils/Alert/functions";

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
  const eventEmitter = () => window.fileSystemAPI.retrieveAccount();

  useEffect(() => {
    window.fileSystemAPI.onAccountRetrieved((_: unknown, username?: string) => {
      setAlertMsg((prevState) => alertMsgAccount(username, prevState?.trigger));
      username === "" ? setIsChecked(false) : setIsChecked(true);
    });
  }, []);

  return (
    <FormControlLabel
      id={"useSavedCred"}
      control={
        <Switch
          onChange={(e, checked) => {
            checked ? eventEmitter() : null;
            setIsChecked(checked as unknown as boolean);
          }}
          checked={checked}
        />
      }
      label={"Use Saved Credentials"}
    />
  );
}

export function SavedCredentialsSwitch({ setIsChecked, checked }: Props) {
  return (
    <FormControlLabel
      id={"saveCred"}
      control={
        <Switch
          onChange={(e, checked) => setIsChecked(checked as unknown as boolean)}
          checked={checked}
        />
      }
      label={"Save Credentials"}
    />
  );
}
