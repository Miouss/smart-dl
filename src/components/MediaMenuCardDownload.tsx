import React from "react";

import { Stack } from "@mui/system";
import { Button } from "@mui/material";

import { MediaDetails } from "../types/Media";

interface Props {
  mediaDetails: MediaDetails;
  handleDownload: () => void;
  resetSelection: () => void;
}

export default function MediaMenuCardDownload({
  mediaDetails,
  handleDownload,
  resetSelection,
}: Props) {
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Button
        variant={"contained"}
        style={{ textTransform: "none" }}
        onClick={handleDownload}
      >
        DOWNLOAD in {mediaDetails.lang.toUpperCase()} at{" "}
        {mediaDetails.resolution.split("x")[1]}p
      </Button>
      <Button variant={"contained"} onClick={resetSelection}>
        Return to selection
      </Button>
    </Stack>
  );
}
