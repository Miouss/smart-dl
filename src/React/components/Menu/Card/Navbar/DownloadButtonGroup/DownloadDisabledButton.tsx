import React from "react";

import FileDownloadOffIcon from "@mui/icons-material/FileDownloadOff";

import { DownloadDisabledButton } from "../../../../../styles/components/specific/Navbar";

import { DownloadDisabledButtonIconColor } from "../../../../../styles/colors";

export default function NavbarDownloadDisabledButton() {
  return (
    <DownloadDisabledButton>
      <FileDownloadOffIcon
        sx={{
          color: `${DownloadDisabledButtonIconColor}`,
        }}
      />
    </DownloadDisabledButton>
  );
}
