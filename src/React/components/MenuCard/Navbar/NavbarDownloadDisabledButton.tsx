import React from "react";

import { Button } from "@mui/material";

import FileDownloadOffIcon from "@mui/icons-material/FileDownloadOff";

export default function NavbarDownloadDisabledButton() {
  return (
    <Button
      disabled
      sx={{
        "&.Mui-disabled": {
          backgroundColor: "rgb(255, 165, 0)",
        },
      }}
    >
      <FileDownloadOffIcon
        sx={{
          color: "white",
        }}
      />
    </Button>
  );
}
