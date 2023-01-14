import React, { Dispatch, SetStateAction, useEffect } from "react";
import { FormControlLabel, Switch } from "@mui/material";
import { AlertMsg } from "../../../types/AlertMsg";
import { alertMsgAccount } from "../../utils/alertMsg";

interface Props {
  setCheckState: Dispatch<SetStateAction<boolean>>;
  id: string;
  label: string;
  checked: boolean;
}

interface GeneralProps extends Props {
  eventEmitter?: () => void;
}

interface SpecificProps extends Props {
  setAlertMsg: Dispatch<SetStateAction<AlertMsg>>;
}

export function UseSavedCredentialsSwitch({
  setAlertMsg,
  setCheckState,
  id,
  label,
  checked
}: SpecificProps) {
  const eventEmitter = () => window.fileSystemAPI.retrieveAccount();

  useEffect(() => {
    window.fileSystemAPI.onAccountRetrieved((_: unknown, username?: string) => {
      setAlertMsg((state) => alertMsgAccount(username, state?.trigger));
      username === ""
        ? setCheckState(false)
        : setCheckState(true);
    });
  }, []);

  return (
    <CredentialsLabelSwitch
      id={id}
      label={label}
      checked={checked}
      eventEmitter={eventEmitter}
      setCheckState={setCheckState}
    />
  );
}

export function SavedCredentialsSwitch({ setCheckState, id, label, checked }: SpecificProps) {

  return (
    <CredentialsLabelSwitch
      id={id}
      label={label}
      checked={checked}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      eventEmitter={() => {}}
      setCheckState={setCheckState}
    />
  );
}

function CredentialsLabelSwitch({
  id,
  label,
  checked,
  eventEmitter,
  setCheckState,
}: GeneralProps) {
  return (
    <FormControlLabel
      id={id}
      control={
        <Switch
          color="primary"
          onChange={() => {
            setCheckState((state) => {
              state ? null : eventEmitter();
              return !state;
            });
          }}
          checked={checked}
        />
      }
      label={label}
    />
  );
}
