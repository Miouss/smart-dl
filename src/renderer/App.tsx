import React, { useEffect, useState } from "react";

import Home from "./components/Home";
import Menu from "./components/Menu";

import { TemporyAlert } from "./utils/Alert";

import { Stack } from "@mui/material";

import StackCentered from "./styles/components/global/StackCentered";

import type { AlertMsg } from "../types/AlertMsg";
import type { BodyOptions } from "../types/Data";

export default function App() {
  const handleFetch = async () => {
    const url = "https://www.disneyplus.com/en-gb/video/91a4dcf4-c450-4d21-85be-30463637f38c";

    const header = {
      "Content-Type": "application/json",
    };

    const options = {
      method: "POST",
      headers: header,
      body: JSON.stringify({ url }),
    };

    try {
      const response = await fetch("http://localhost:8000/test", options);

      const data = await response.json();

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={handleFetch} style={{
    border: "1px solid black !important",
  }}>fetch</button>;

  /*   const [data, setData] = useState(null);
  const [bodyOptions, setBodyOptions] = useState<BodyOptions>();
  const [alertMsg, setAlertMsg] = useState<undefined | AlertMsg>();

  useAlertBoxDelay(alertMsg, setAlertMsg);

  return data === null ? (
    <StackCentered spacing={5}>
      <TemporyAlert alertMsg={alertMsg} />
      <Home
        setData={setData}
        setAlertMsg={setAlertMsg}
        setBodyOptions={setBodyOptions}
        bodyOptions={bodyOptions}
      />
    </StackCentered>
  ) : (
    <Stack spacing={5}>
      <StackCentered marginTop={"2rem"}>
        <TemporyAlert alertMsg={alertMsg} />
      </StackCentered>
      <Menu
        setData={setData}
        setAlertMsg={setAlertMsg}
        data={data}
        bodyOptions={bodyOptions}
      />
      ;
    </Stack>
  ); */
}

function useAlertBoxDelay(
  alertMsg: undefined | AlertMsg,
  setAlertMsg: React.Dispatch<React.SetStateAction<undefined | AlertMsg>>
) {
  useEffect(() => {
    if (alertMsg !== undefined) {
      const timer = setTimeout(() => {
        setAlertMsg(undefined);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alertMsg]);
}
