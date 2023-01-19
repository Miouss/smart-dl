import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

import HomeLogin from "./Home/HomeLogin";
import Form from "./Form/Form";

import StackCentered from "../styles/components/global/StackCentered";

import { AlertMsg } from "../../types/AlertMsg";
import { Account, BodyOptions } from "../../types/Data";

interface Props {
  setData: Dispatch<SetStateAction<unknown>>;
  setBodyOptions: Dispatch<SetStateAction<BodyOptions>>;
  setAlertMsg: Dispatch<SetStateAction<AlertMsg>>;
  bodyOptions: BodyOptions;
}

export default function Home({ setData, setBodyOptions, setAlertMsg, bodyOptions }: Props) {
  const [account, setAccount] = useState<Account>({
    username: "",
    password: "",
  });
  const [saveCredentials, setSaveCredentials] = useState(false);
  const [useSavedCredentials, setUseSavedCredentials] = useState(false);

  useEffect(() => {
    setBodyOptions({
      account,
      saveCredentials,
      useSavedCredentials
    })
  }, [account, saveCredentials, useSavedCredentials]);

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
