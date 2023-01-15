import React, { useEffect, useState } from "react";
import fetch, { Headers } from "cross-fetch";

import MenuCard from "./components/MenuCard";

import customTheme from "./utils/style/theme";

import { Collapse, Stack, ThemeProvider } from "@mui/material";

import {
  StackCentered,
  CredentialsBox,
  PasswordBox,
  UsernameInput,
  PasswordInput,
  SubmitButton,
  LoginOptionsStack,
  SubmitButtonIcon,
} from "./components/Form/StyledComponents";

import UrlInputBox from "./components/Form/UrlInputBox";
import PasswordVisibilityIcon from "./components/Form/PasswordVisibilityIcon";
import TemporyAlert from "./components/Form/TemporyAlert";
import { SavedCredentialsSwitch, UseSavedCredentialsSwitch } from "./components/Form/CredentialsLabelSwitch";

import { AlertMsg } from "../types/AlertMsg";

interface Account {
  username: string;
  password: string;
}

export default function App() {
  const [data, setData] = useState(null);
  const [showUrl, setShowUrl] = useState<undefined | string>(undefined);
  const [account, setAccount] = useState<Account>({
    username: "",
    password: "",
  });
  const [saveCredentialsCheckState, setSaveCredentialsCheckState] = useState(false);
  const [useSavedCredentialsCheckState, setUseSavedCredentialsCheckState] = useState(false);
  const [alertMsg, setAlertMsg] = useState<undefined | AlertMsg>();
  const [backHome, setBackHome] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [submited, setSubmited] = useState(false);

  async function fetching(showUrl: string) {
    const header = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        showUrl,
        account,
        saveCredentialsCheckState,
        useSavedCredentialsCheckState,
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
    }
  };

  const handleCredentials = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAccount((account) => {
      return {
        username:
          e.target.id === "username" ? e.target.value : account.username,
        password:
          e.target.id === "password" ? e.target.value : account.password,
      };
    });
  };

  useEffect(
    function resetFields() {
      setData(null);
      setShowUrl(undefined);
      setAccount({
        username: "",
        password: "",
      });
      setSaveCredentialsCheckState(false);
      setUseSavedCredentialsCheckState(false);
      setAlertMsg(undefined);
      setShowPassword(false);
    },
    [backHome]
  );

  useEffect(
    function handleAlertBoxSpawnDelay() {
      if (alertMsg !== undefined) {
        const timer = setTimeout(() => {
          setAlertMsg(undefined);
        }, 3000);

        return () => clearTimeout(timer);
      }
    },
    [alertMsg]
  );

  useEffect(() => {
    if(saveCredentialsCheckState && !useSavedCredentialsCheckState && true){
      setSaveCredentialsCheckState(false);
    }
  }, [useSavedCredentialsCheckState])

  useEffect(() => {
    submited && fetching(showUrl);
  }, [submited]);

  const mainFrameStyle = {
    height: "100vh",
    width: "100vw",
  };

  if (data === null) {
    return (
      <>
        <ThemeProvider theme={customTheme} key="home">
          <StackCentered spacing={5} sx={mainFrameStyle} gap={"40px"}>
            <TemporyAlert alertMsg={alertMsg} />

            <form onSubmit={(e) => handleSubmit(e)}>
              <StackCentered spacing={5}>
                <UrlInputBox
                  setShowUrl={setShowUrl}
                  setAlertMsg={setAlertMsg}
                />
                <LoginOptionsStack>
                  <Collapse in={!useSavedCredentialsCheckState} orientation="vertical">
                    <CredentialsBox>
                      <UsernameInput onChange={(e) => handleCredentials(e)} />
                      <PasswordBox>
                        <PasswordInput
                          type={showPassword ? "text" : "password"}
                          onChange={(e) => handleCredentials(e)}
                        />
                        <PasswordVisibilityIcon
                          setShowPassword={setShowPassword}
                          visible={showPassword}
                        />
                      </PasswordBox>
                      <SavedCredentialsSwitch
                        setAlertMsg={setAlertMsg}
                        setCheckState={setSaveCredentialsCheckState}
                        checked={saveCredentialsCheckState && !useSavedCredentialsCheckState}
                        id="saveCred"
                        label="Save Credentials"
                      />
                    </CredentialsBox>
                  </Collapse>
                  <UseSavedCredentialsSwitch
                    setAlertMsg={setAlertMsg}
                    setCheckState={setUseSavedCredentialsCheckState}
                    id="useSavedCred"
                    label="Use Saved Credentials"
                    checked={useSavedCredentialsCheckState}
                  />
                </LoginOptionsStack>
                <SubmitButton>
                  <SubmitButtonIcon submited={submited} />
                </SubmitButton>
              </StackCentered>
            </form>
          </StackCentered>
        </ThemeProvider>
      </>
    );
  } else {
    return (
      <ThemeProvider theme={customTheme} key="menu">
        <Stack spacing={5} sx={mainFrameStyle}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <StackCentered marginTop={"2rem"} spacing={5}>
              <TemporyAlert alertMsg={alertMsg} />
              <UrlInputBox
                setShowUrl={setShowUrl}
                setAlertMsg={setAlertMsg}
                submited={submited}
                withSubmit={true}
              />
            </StackCentered>
          </form>
          <StackCentered width={"100%"}>
            <StackCentered width={"75%"} height={"100%"}>
              <MenuCard setBackHome={setBackHome} vod={data} />
            </StackCentered>
          </StackCentered>
        </Stack>
      </ThemeProvider>
    );
  }
}
