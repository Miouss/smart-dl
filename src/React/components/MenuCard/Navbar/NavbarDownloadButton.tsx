import React, { Dispatch, SetStateAction } from "react";

import { Button, Stack } from "@mui/material";

import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import { DownloadButtonColor } from "../../../utils/style/colors";

interface Props {
  setDownloadStarted: Dispatch<SetStateAction<boolean>>;
  downloadStarted: boolean;
  mediaDownloaded: boolean;
  children: string;
}

export default function NavbarDownloadButton({
  setDownloadStarted,
  children,
}: Props) {
  return (
    <Button
      onClick={() => setDownloadStarted(true)}
      sx={{
        backgroundColor: `${DownloadButtonColor.normal}`,
        "&:hover": {
          backgroundColor: `${DownloadButtonColor.hover}`,
        },
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ gap: "12px", textTransform: "none" }}
      >
        <SimCardDownloadOutlinedIcon />
        {children}
      </Stack>
    </Button>
  );
}
