import React, { Dispatch, SetStateAction, useState } from "react";

import { Button } from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

interface Props {
  setResetSelection: Dispatch<SetStateAction<boolean>>;
  downloadStarted: boolean;
}

export default function NavbarRetryButton({
  setResetSelection,
  downloadStarted,
}: Props) {
  const [donwnloadFullyEnded, setDownloadFullyEnded] = useState(false);

  window.downloadAPI.onDownloadFullyStarts(() => {
    setDownloadFullyEnded(false);
  })

  window.downloadAPI.onDownloadFullyEnds(() => {
    setDownloadFullyEnded(true);
  });

  return (
    <Button
      onClick={() => setResetSelection((resetSelection) => !resetSelection)}
      disabled={downloadStarted && !donwnloadFullyEnded}
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
