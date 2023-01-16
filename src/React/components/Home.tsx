import React, { Dispatch, SetStateAction, useState } from "react";

import HomeLogin from "./Home/HomeLogin";
import Form from "./Form/Form";

import StackCentered from "../styles/components/global/StackCentered";

import { AlertMsg } from "../../types/AlertMsg";

interface Account {
  username: string;
  password: string;
}

interface Props {
  setData: Dispatch<SetStateAction<unknown>>;
  setAlertMsg: Dispatch<SetStateAction<AlertMsg>>;
}

export default function Home({ setData, setAlertMsg }: Props) {
  const [account, setAccount] = useState<Account>({
    username: "",
    password: "",
  });
  const [saveCredentials, setSaveCredentials] = useState(false);
  const [useSavedCredentials, setUseSavedCredentials] = useState(false);

  return (
    <StackCentered spacing={5}>
      <Form
        setData={setData}
        setAlertMsg={setAlertMsg}
        optionBody={{
          account,
          saveCredentials,
          useSavedCredentials,
        }}
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
