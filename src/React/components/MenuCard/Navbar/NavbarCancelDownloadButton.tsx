import React from "react";

import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";
import { Stack } from "@mui/system";

export default function NavbarCancelDownloadButton() {
  return (
    <Button
      sx={{
        background: "rgba(213, 162, 0, 1)",
        "&:hover": {
          background: "rgba(213, 162, 0, 0.8)",
        },
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CloseIcon />
      </Stack>
    </Button>
  );
}
