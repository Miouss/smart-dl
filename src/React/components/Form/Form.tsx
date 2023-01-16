import React, { Dispatch, SetStateAction, useState } from "react";

import FormSearchBar from "./FormSearchBar";

import StackCentered from "../../styles/components/global/StackCentered";
import {
  SubmitButton,
  SubmitButtonIcon,
} from "../../styles/components/specific/Form";

import { AlertMsg } from "../../../types/AlertMsg";

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
  optionBody?: OptionBody;
  withSubmitButton?: boolean;
  children?: React.ReactNode;
}

export default function Form({
  setData,
  setAlertMsg,
  optionBody,
  withSubmitButton,
  children,
}: Props) {
  const [showUrl, setShowUrl] = useState<undefined | string>(undefined);
  const [submited, setSubmited] = useState(false);

  async function fetching(showUrl: string) {
    const header = new Headers({
      "Content-Type": "application/json",
    });
    console.log(JSON.stringify({
      showUrl,
      ...optionBody,
    }));

    const options = {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        showUrl,
        ...optionBody,
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
      setAlertMsg({
        severity: "error",
        message: message,
      });
    }

    setSubmited(false);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (showUrl === undefined || showUrl === "") {
      setAlertMsg({
        severity: "error",
        message: "No url link provided",
      });
    } else {
      setSubmited(true);
      fetching(showUrl);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <StackCentered spacing={5}>
        <FormSearchBar
          setShowUrl={setShowUrl}
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
