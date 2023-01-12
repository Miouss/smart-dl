import React, { Dispatch, SetStateAction } from "react";
import { FormControlLabel, Switch } from "@mui/material";


interface Props {
  control: Dispatch<SetStateAction<boolean>>;
  id: string;
  label: string;
  checked?: boolean
}

export default function CredentialsLabelSwitch({control, id, label, checked} : Props){
    return <FormControlLabel
    id={id}
    control={
      <Switch
        color="primary"
        onChange={() =>
          control((state) => !state)
        }
        checked={checked}
      />
    }
    label={label}
  />
}