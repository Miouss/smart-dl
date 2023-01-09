import React, { useEffect, useState } from "react";
import fetch, { Headers } from "cross-fetch";

import Input from "@mui/material/Input";
import { Stack, ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import MenuCard from "./components/MenuCard";
import {
  Alert,
  Button,
  Collapse,
  FormControlLabel,
  Switch,
} from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import NearMeIcon from "@mui/icons-material/NearMe";

interface Account {
  username: string;
  password: string;
}

export default function App() {
  const [data, setData] = useState(null);
  const [showUrl, setShowUrl] = useState(undefined);
  const [account, setAccount] = useState<Account>({
    username: "",
    password: "",
  });
  const [saveCredentials, setSaveCredentials] = useState(false);
  const [useSavedCredentials, setUseSavedCredentials] = useState(false);
  const [errorMsg, setErrorMsg] = useState<undefined | string>(undefined);
  const [backHome, setBackHome] = useState(false);

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
    console.log(showUrl);
    if(showUrl === undefined || showUrl === ""){
      setErrorMsg("No url link provided");
    }else{
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

  const style = {
    height: "100vh",
    width: "100vw",
  };

  const chooseSaveLocationStyle = {
    background: "#4F4F4F",
    marginLeft: "24px",
    "&:hover": {
      background: "rgba(208, 2, 27, 1)",
    },
  };

  const submitButtonStyle = {
    marginLeft: "24px",
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

  useEffect(() => {
      setData(null);
      setShowUrl(undefined);
      setAccount({
        username: "",
        password: "",
      });
      setSaveCredentials(false);
      setUseSavedCredentials(false);
  }, [backHome]);

  useEffect(() => {
    if(errorMsg !== undefined){
      setTimeout(() => {
        setErrorMsg(undefined);
      }, 5000);
    }
  }, [errorMsg])

  if (data === null) {
    return (
      <>
        <ThemeProvider theme={customTheme} key="">
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            spacing={5}
            sx={style}
          >
            <form onSubmit={(e) => handleSubmit(e)}>
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
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
                  <Input
                    placeholder="Url Link"
                    onChange={(event) => setShowUrl(event.target.value)}
                  />
                  <Button
                    variant="contained"
                    className="save-button"
                    onClick={(e) => chooseSaveLocation(e)}
                    sx={chooseSaveLocationStyle}
                  >
                    <FolderIcon style={{ color: "#fff" }} />
                  </Button>
                </Stack>
                <Stack
                  direction={"column"}
                  width={"100%"}
                  height={"100%"}
                  spacing={2}
                >
                  <Collapse in={!useSavedCredentials} orientation="vertical">
                    <Stack
                      direction={"column"}
                      width={"100%"}
                      height={"100%"}
                      spacing={2}
                    >
                      <Input
                        id="username"
                        name="username"
                        placeholder="Username"
                        onChange={(e) => handleCredentials(e)}
                      />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => handleCredentials(e)}
                      />

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
                    </Stack>
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
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={submitButtonStyle}
                >
                  <NearMeIcon style={{ color: "#fff" }} />
                </Button>
              </Stack>
            </form>
          </Stack>
        </ThemeProvider>
      </>
    );
  } else {
    return (
      <ThemeProvider theme={customTheme}>
        <Stack spacing={5} sx={style}>
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
                <Input
                  placeholder="Url Link"
                  onChange={(event) => setShowUrl(event.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={(e) => chooseSaveLocation(e)}
                  sx={chooseSaveLocationStyle}
                >
                  <FolderIcon style={{ color: "#fff" }} />
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={submitButtonStyle}
                >
                  <NearMeIcon style={{ color: "#fff" }} />
                </Button>
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
