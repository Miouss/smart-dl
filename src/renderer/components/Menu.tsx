import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import Form from "./Form/Form";
import MenuCard from "./Menu/MenuCard";

import StackCentered from "../styles/components/global/StackCentered";

import { Stack } from "@mui/material";

import type { AlertMsg } from "../../types/AlertMsg";
import type { BodyOptions } from "../../types//Data";

interface Props {
  setData: Dispatch<SetStateAction<unknown>>;
  setAlertMsg: Dispatch<SetStateAction<AlertMsg>>;
  bodyOptions: BodyOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function Menu({
  setData,
  setAlertMsg,
  data,
  bodyOptions,
}: Props) {
  const [backHome, setBackHome] = useState(false);

  useReturnHome(backHome, setData);

  return (
    <Stack spacing={5}>
      <Form
        setData={setData}
        setAlertMsg={setAlertMsg}
        bodyOptions={bodyOptions}
        withSubmitButton
      />
      <StackCentered>
        <MenuCard setBackHome={setBackHome} vod={data} />
      </StackCentered>
    </Stack>
  );
}

function useReturnHome(
  backHome: boolean,
  setData: Dispatch<SetStateAction<unknown>>
) {
  useEffect(() => {
    if (backHome) {
      setData(null);
    }
  }, [backHome]);
}
