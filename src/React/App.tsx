import React, { useEffect, useState } from "react";
import fetch, { Headers } from "cross-fetch";

import MenuCard from "./components/MenuCard";

import { createTheme } from "@mui/material/styles";

import { Collapse, Stack, ThemeProvider } from "@mui/material";

import {
  StackCentered,
  CredentialsBox,
  PasswordBox,
  UsernameInput,
  PasswordInput,
  SubmitButton,
  LoginOptionsStack,
} from "./components/Form/StyledComponents";

import UrlInputBox from "./components/Form/UrlInputBox";
import PasswordVisibilityIcon from "./components/Form/PasswordVisibilityIcon";
import TemporyAlert from "./components/Form/TemporyAlert";
import CredentialsLabelSwitch from "./components/Form/CredentialsLabelSwitch";

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
  const [saveCredentials, setSaveCredentials] = useState(false);
  const [useSavedCredentials, setUseSavedCredentials] = useState(false);
  const [alertMsg, setAlertMsg] = useState<undefined | AlertMsg>();
  const [backHome, setBackHome] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

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
        saveCredentials,
        useSavedCredentials,
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
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (showUrl === undefined || showUrl === "") {
      setAlertMsg({
        severity: "error",
        message: "No url link provided",
      });
    } else {
      fetching(showUrl);
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
      setSaveCredentials(false);
      setUseSavedCredentials(false);
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
        }, 5000);

        return () => clearTimeout(timer);
      }
    },
    [alertMsg]
  );

  useEffect(
    function handleCredentialsSavingConflict() {
      if ((useSavedCredentials === saveCredentials) === true) {
        setSaveCredentials(false);
      }
    },
    [useSavedCredentials]
  );

  const mainFrameStyle = {
    height: "100vh",
    width: "100vw",
  };

  const customTheme = createTheme({
    components: {
      MuiInput: {
        defaultProps: {
          disableUnderline: true,
        },
        styleOverrides: {
          root: {
            borderBottom: "1px solid rgba(208, 2, 27, 1)",
            boxShadow: "0px 1px 1px rgba(208, 2, 27, 0.25)",
          },
          input: {
            color: "white",
            "&::placeholder": {
              color: "#828282",
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            "& .MuiSwitch-switchBase": {
              "&+ .MuiSwitch-track": {
                backgroundColor: "red",
                opacity: 1,
              },
              "&.Mui-checked": {
                "+ .MuiSwitch-track": {
                  backgroundColor: "green",
                  opacity: 1,
                },
                "& .MuiSwitch-thumb": {
                  color: "white",
                },
              },
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            "& .MuiFormControlLabel-label": {
              color: "#E0E0E0",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "18px",
              lineHeight: "21px",
            },
          },
        },
      },
    },
  });

  if (data === null) {
    return (
      <>
        <ThemeProvider theme={customTheme} key="home">
          <StackCentered spacing={5} sx={mainFrameStyle}>
            <TemporyAlert alertMsg={alertMsg} />

            <form onSubmit={(e) => handleSubmit(e)}>
              <StackCentered spacing={5}>
                <UrlInputBox setShowUrl={setShowUrl} />
                <LoginOptionsStack>
                  <Collapse in={!useSavedCredentials} orientation="vertical">
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
                      <CredentialsLabelSwitch
                        id="saveCred"
                        label="Save Credentials"
                        control={setSaveCredentials}
                        checked={!useSavedCredentials && saveCredentials}
                      />
                    </CredentialsBox>
                  </Collapse>
                  <CredentialsLabelSwitch
                    id="useSavedCred"
                    label="Use Saved Credentials"
                    control={setUseSavedCredentials}
                  />
                </LoginOptionsStack>
                <SubmitButton />
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
            <StackCentered marginTop={"3rem"} spacing={5}>
              <TemporyAlert alertMsg={alertMsg} />
              <UrlInputBox setShowUrl={setShowUrl} submit />
            </StackCentered>
          </form>
          <StackCentered width={"100%"}>
            <StackCentered width={"720px"}>
              <MenuCard setBackHome={setBackHome} vod={data} />
            </StackCentered>
          </StackCentered>
        </Stack>
      </ThemeProvider>
    );
  }
}
