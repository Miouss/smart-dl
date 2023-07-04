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
  const [domainsSaved, setDomainsSaved] = useState<string>("");

  const alertMsg = () =>
    domainsSaved
      ? setAlertMsg(
          infoAlert(
            `The accounts saved for providers : ${domainsSaved} are available to use`
          )
        )
      : setAlertMsg(warningAlert("No account saved yet"));

  const getSavedCredentials = async () => {
    const domainsWithUsernameSaved = await api.getSavedCredentials();
    const hasUsernameSaved = domainsWithUsernameSaved.length > 0;

    if (hasUsernameSaved) {
      setIsChecked(true);
      setDomainsSaved(domainsWithUsernameSaved.join(", ").toLocaleUpperCase());
    } else {
      alertMsg();
    }
  };

  useEffect(() => {
    checked && alertMsg();
  }, [domainsSaved, checked]);

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
