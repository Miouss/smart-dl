import React, { Dispatch, SetStateAction } from "react";

import { Button } from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

import { RetryButtonColor } from "../../../utils/style/colors";

interface Props {
  setResetSelection: Dispatch<SetStateAction<boolean>>;
}

export default function NavbarRetryButton({ setResetSelection }: Props) {
  return (
    <Button
      onClick={() => setResetSelection((resetSelection) => !resetSelection)}
      sx={{
        backgroundColor: `${RetryButtonColor.normal}`,
        "&:hover": {
          backgroundColor: `${RetryButtonColor.hover}`,
        },
      }}
    >
      <RefreshIcon />
    </Button>
  );
}
