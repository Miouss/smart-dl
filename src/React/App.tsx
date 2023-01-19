import React, { useEffect, useState } from "react";

import Home from "./components/Home";
import Menu from "./components/Menu";

import { TemporyAlert } from "./utils/Alert";

import { Stack } from "@mui/material";

import StackCentered from "./styles/components/global/StackCentered";

import type { AlertMsg } from "../types/AlertMsg";
import type { BodyOptions } from "../types/Data";

export default function App() {
  const [data, setData] = useState(null);
  const [bodyOptions, setBodyOptions] = useState<BodyOptions>();
  const [alertMsg, setAlertMsg] = useState<undefined | AlertMsg>();

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

  if (data === null) {
    return (
      <StackCentered spacing={5}>
        <TemporyAlert alertMsg={alertMsg} />
        <Home setData={setData} setAlertMsg={setAlertMsg} setBodyOptions={setBodyOptions} bodyOptions={bodyOptions} />
      </StackCentered>
    );
  } else {
    return (
      <Stack spacing={5}>
        <StackCentered marginTop={"2rem"}>
          <TemporyAlert alertMsg={alertMsg} />
        </StackCentered>
        <Menu setData={setData} setAlertMsg={setAlertMsg} data={data} bodyOptions={bodyOptions} />;
      </Stack>
    );
  }
}
