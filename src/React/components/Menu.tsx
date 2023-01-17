import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import Form from "./Form/Form";
import MenuCard from "./Menu/MenuCard";

import StackCentered from "../styles/components/global/StackCentered";

import { Stack } from "@mui/material";

import { AlertMsg } from "../../types/AlertMsg";

interface Props {
  setData: Dispatch<SetStateAction<unknown>>;
  setAlertMsg: Dispatch<SetStateAction<AlertMsg>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function Menu({ setData, setAlertMsg, data }: Props) {
  const [backHome, setBackHome] = useState(false);

  useEffect(
    function resetFields() {
        if(backHome){
            setData(null);
        }
    },
    [backHome]
  );

  return (
    <Stack spacing={5}>
      <Form setData={setData} setAlertMsg={setAlertMsg} withSubmitButton />
      <StackCentered>
        <MenuCard setBackHome={setBackHome} vod={data} />
      </StackCentered>
    </Stack>
  );
}