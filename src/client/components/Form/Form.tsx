import React, { Dispatch, SetStateAction, useState, useRef } from "react";

import FormSearchBar from "./FormSearchBar";

import StackCentered from "../../styles/components/global/StackCentered";
import {
  SubmitButton,
  SubmitButtonIcon,
} from "../../styles/components/specific/Form";

import { AlertMsg } from "../../../types/AlertMsg";
import { errorAlert } from "../../utils/Alert";
import { createHeader } from "../../../utils/createHeader";

interface Account {
  username: string;
  password: string;
}
interface OptionBody {
  account: Account;
  saveCredentials: boolean;
  useSavedCredentials: boolean;
}

interface Props {
  setData: Dispatch<SetStateAction<unknown>>;
  setAlertMsg: Dispatch<SetStateAction<AlertMsg>>;
  bodyOptions: OptionBody;
  withSubmitButton?: boolean;
  children?: React.ReactNode;
}

export default function Form({
  setData,
  setAlertMsg,
  bodyOptions,
  withSubmitButton,
  children,
}: Props) {
  const api = window.fileSystemAPI;

  const [submited, setSubmited] = useState(false);

  const refUrlInput = useRef<HTMLInputElement | null>(null);

  async function fetching(url: string) {
    const header = createHeader({
      contentType: true,
    });

    const options = {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        url,
        ...bodyOptions,
      }),
    };

    const response = await fetch(
      "http://localhost:8000/stream/playlist",
      options
    );

    if (response.ok) {
      const mediaSelection = await response.json();
      setData(mediaSelection);
      setAlertMsg(undefined);
    } else {
      const message = await response.text();
      setAlertMsg(errorAlert(message));
    }

    setSubmited(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const urlProvided = refUrlInput.current.value;

    const { account, useSavedCredentials } = bodyOptions;

    const isUsingNewCredentials = account.username && account.password;

    const hasProvidedCredentials = isUsingNewCredentials || useSavedCredentials;
    const hasProvidedSaveLocation = await api.getSaveLocation();

    if (!urlProvided) return setAlertMsg(errorAlert("No url provided"));

    if (!hasProvidedCredentials)
      return setAlertMsg(errorAlert("Please provide a username and password"));

    if (!hasProvidedSaveLocation)
      return setAlertMsg(
        errorAlert("Please choose a save location to proceed")
      );

    setSubmited(true);
    fetching(urlProvided);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <StackCentered spacing={5}>
        <FormSearchBar
          ref={refUrlInput}
          setAlertMsg={setAlertMsg}
          submited={submited}
          withSubmitButton={withSubmitButton ?? false}
        />
        {children}

        {!withSubmitButton && (
          <SubmitButton>
            <SubmitButtonIcon submited={submited} />
          </SubmitButton>
        )}
      </StackCentered>
    </form>
  );
}
