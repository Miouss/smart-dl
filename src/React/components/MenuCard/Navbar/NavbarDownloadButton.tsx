import React, { Dispatch, SetStateAction } from "react";

import { Button, Stack } from "@mui/material";

import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';

interface Props {
  setDownloadStarted: Dispatch<SetStateAction<boolean>>;
  downloadStarted: boolean;
  mediaDownloaded: boolean;
  children: string;
}

export default function NavbarDownloadButton({
  setDownloadStarted,
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
        <SimCardDownloadOutlinedIcon />
        {children}
      </Stack>
    </Button>
  );
}
