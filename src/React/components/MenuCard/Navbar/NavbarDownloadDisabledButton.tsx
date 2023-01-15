import React from "react";

import { Button } from "@mui/material";

import FileDownloadOffIcon from "@mui/icons-material/FileDownloadOff";
import { DownloadDisabledButtonColor, DownloadDisabledButtonIconColor } from "../../../utils/style/colors";

export default function NavbarDownloadDisabledButton() {
  return (
    <Button
      disabled
      sx={{
        "&.Mui-disabled": {
          backgroundColor: `${DownloadDisabledButtonColor}`,
        },
      }}
    >
      <FileDownloadOffIcon
        sx={{
          color: `${DownloadDisabledButtonIconColor}`,
        }}
      />
    </Button>
  );
}
