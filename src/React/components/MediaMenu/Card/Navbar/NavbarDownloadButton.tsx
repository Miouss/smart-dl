import React, { Dispatch, SetStateAction } from "react";

import { Button, Stack, CircularProgress } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

interface Props {
  setDownloadStarted: Dispatch<SetStateAction<boolean>>;
  downloadStarted: boolean;
  mediaDownloaded: boolean;
  children: string;
}

export default function NavbarDownloadButton({
  setDownloadStarted,
  downloadStarted,
  mediaDownloaded,
  children
}: Props){
  return (
    <Button
      onClick={() => setDownloadStarted(true)}
      sx={{
        background: "rgba(39, 184, 71, 1)",
        "&:hover": {
          background: "rgba(39, 184, 71, 0.7)",
        },
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ gap: "12px", textTransform: "none" }}
      >
        <FileDownloadIcon />
        {children}
      </Stack>
    </Button>
  );
}
