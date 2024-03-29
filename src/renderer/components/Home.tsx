import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

import HomeLogin from "./Home/HomeLogin";
import Form from "./Form/Form";

import StackCentered from "../styles/components/global/StackCentered";

import type { AlertMsg } from "../../types/AlertMsg";
import type { Account, BodyOptions } from "../../types/Data";

interface Props {
  setData: Dispatch<SetStateAction<unknown>>;
  setBodyOptions: Dispatch<SetStateAction<BodyOptions>>;
  setAlertMsg: Dispatch<SetStateAction<AlertMsg>>;
  bodyOptions: BodyOptions;
}

export default function Home({
  setData,
  setBodyOptions,
  setAlertMsg,
  bodyOptions,
}: Props) {
  const [account, setAccount] = useState<Account>({
    username: "",
    password: "",
  });
  const [saveCredentials, setSaveCredentials] = useState(false);
  const [useSavedCredentials, setUseSavedCredentials] = useState(false);

  useBodySetter(account, saveCredentials, useSavedCredentials, setBodyOptions);

  return (
    <StackCentered spacing={5}>
      <Form
        setData={setData}
        setAlertMsg={setAlertMsg}
        bodyOptions={bodyOptions}
      >
        <HomeLogin
          setAlertMsg={setAlertMsg}
          setAccount={setAccount}
          setSaveCredentials={setSaveCredentials}
          setUseSavedCredentials={setUseSavedCredentials}
          useSavedCredentials={useSavedCredentials}
          saveCredentials={saveCredentials}
        />
      </Form>
    </StackCentered>
  );
}

function useBodySetter(
  account: Account,
  saveCredentials: boolean,
  useSavedCredentials: boolean,
  setBodyOptions: Dispatch<SetStateAction<BodyOptions>>
) {
  useEffect(() => {
    setBodyOptions({
      account,
      saveCredentials,
      useSavedCredentials,
    });
  }, [account, saveCredentials, useSavedCredentials]);
}
