import React, { Dispatch, SetStateAction } from "react";

import { Button } from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

interface Props {
  setResetSelection: Dispatch<SetStateAction<boolean>>;
}

export default function NavbarRetryButton({ setResetSelection }: Props) {
  return (
    <Button
      onClick={() => setResetSelection((resetSelection) => !resetSelection)}
      sx={{
        background: "rgba(208, 2, 27, 1)",
        "&:hover": {
          background: "rgba(208, 2, 27, 0.7)",
        },
      }}
    >
      <RefreshIcon
        sx={{
          color: "white",
        }}
      />
    </Button>
  );
}
