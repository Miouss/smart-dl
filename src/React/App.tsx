import React, { useEffect, useState } from "react";
import fetch, { Headers } from "cross-fetch";

import { Stack, ThemeProvider } from "@mui/system";
import MenuCard from "./components/MenuCard";
import { Alert, Box, Collapse, FormControlLabel, Switch } from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import NearMeIcon from "@mui/icons-material/NearMe";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import {
  UrlInput,
  CredentialsBox,
  PasswordBox,
  UsernameInput,
  PasswordInput,
  SubmitButton,
  ChooseSaveLocationButton,
} from "./components/Form/Form";

import {
  customTheme,
  mainFrameStyle,
  VisibilityIconStyle,
} from "./components/styled/AppStyle";

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
  const [errorMsg, setErrorMsg] = useState<undefined | string>(undefined);
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
    } else {
      const message = await response.text();
      setErrorMsg(message);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (showUrl === undefined || showUrl === "") {
      setErrorMsg("No url link provided");
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

  const chooseSaveLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.fileSystemAPI.openFileSystemDialog();
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
    },
    [backHome]
  );

  useEffect(
    function handleAlertBoxSpawnDelay() {
      if (errorMsg !== undefined) {
        const timer = setTimeout(() => {
          setErrorMsg(undefined);
        }, 5000);

        return () => clearTimeout(timer);
      }
    },
    [errorMsg]
  );

  if (data === null) {
    return (
      <>
        <ThemeProvider theme={customTheme} key="">
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            spacing={5}
            sx={mainFrameStyle}
          >
            {errorMsg === undefined ? (
              <Box sx={{ height: "48px" }}></Box>
            ) : (
              <Alert
                severity="error"
                sx={{ width: "fit-content", height: "fit-content" }}
              >
                {errorMsg}
              </Alert>
            )}

            <form onSubmit={(e) => handleSubmit(e)}>
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                spacing={5}
              >
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <UrlInput
                    onChange={(event) => setShowUrl(event.target.value)}
                  />
                  <ChooseSaveLocationButton
                    onClick={(e) => chooseSaveLocation(e)}
                  >
                    <FolderIcon style={{ color: "#fff" }} />
                  </ChooseSaveLocationButton>
                </Stack>
                <Stack
                  direction={"column"}
                  width={"100%"}
                  height={"100%"}
                  spacing={2}
                >
                  <Collapse in={!useSavedCredentials} orientation="vertical">
                    <CredentialsBox>
                      <UsernameInput onChange={(e) => handleCredentials(e)} />
                      <PasswordBox>
                        <PasswordInput
                          type={showPassword ? "text" : "password"}
                          onChange={(e) => handleCredentials(e)}
                        />

                        {showPassword ? (
                          <VisibilityIcon
                            onClick={() => setShowPassword(false)}
                            sx={VisibilityIconStyle}
                          />
                        ) : (
                          <VisibilityOffIcon
                            onClick={() => setShowPassword(true)}
                            sx={VisibilityIconStyle}
                          />
                        )}
                      </PasswordBox>

                      <FormControlLabel
                        id="saveCred"
                        control={
                          <Switch
                            color="primary"
                            onChange={() =>
                              setSaveCredentials(!saveCredentials)
                            }
                          />
                        }
                        label="Save Credentials"
                      />
                    </CredentialsBox>
                  </Collapse>
                  <FormControlLabel
                    id="useSavedCred"
                    control={
                      <Switch
                        color="primary"
                        onChange={() =>
                          setUseSavedCredentials(!useSavedCredentials)
                        }
                      />
                    }
                    label="Use Saved Credentials"
                  />
                </Stack>
                <SubmitButton>
                  <NearMeIcon style={{ color: "#fff" }} />
                </SubmitButton>
              </Stack>
            </form>
          </Stack>
        </ThemeProvider>
      </>
    );
  } else {
    return (
      <ThemeProvider theme={customTheme}>
        <Stack spacing={5} sx={mainFrameStyle}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              sx={{
                marginTop: "5rem",
              }}
              spacing={5}
            >
              {errorMsg !== undefined && (
                <Alert severity="error">{errorMsg}</Alert>
              )}
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <UrlInput
                  onChange={(event) => setShowUrl(event.target.value)}
                />
                <ChooseSaveLocationButton
                  onClick={(e) => chooseSaveLocation(e)}
                >
                  <FolderIcon style={{ color: "#fff" }} />
                </ChooseSaveLocationButton>
                <SubmitButton>
                  <NearMeIcon style={{ color: "#fff" }} />
                </SubmitButton>
              </Stack>
            </Stack>
          </form>
          <Stack width={"100%"} justifyContent={"center"} alignItems={"center"}>
            <Stack
              width={"720px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <MenuCard setBackHome={setBackHome} vod={data} />
            </Stack>
          </Stack>
        </Stack>
      </ThemeProvider>
    );
  }
}
