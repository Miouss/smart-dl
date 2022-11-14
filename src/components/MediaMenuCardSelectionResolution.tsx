import React from "react";

import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

import { VideoSelection, MediaUrls, MediaDetails } from "../types/Media";

interface Props {
  selection: VideoSelection[];
  setAudioSelected: (audio: string) => void;
  setFetchMedia: (mediaUrls: MediaUrls) => void;
  setMediaDetails: (mediaDetails : MediaDetails) => void; 
}

export default function MediaMenuCardSelectionResolution({
  selection,
  setAudioSelected,
  setFetchMedia,
  setMediaDetails
}: Props) {
  const handleClick = (audioQuality: string, videoResolutionUrl: string, videoResolution: string) => {
    setAudioSelected(audioQuality);
    setMediaDetails({
      lang: undefined,
      resolution: videoResolution
    })
    setFetchMedia({
      audio: undefined,
      video: videoResolutionUrl,
    });
  };
  const resolutionsButtons: React.ReactElement[] = [];

  selection.forEach((param, i) => {
    resolutionsButtons.push(
      <Grid item key={`resBut${i}`}>
        <Button
          style={{ textTransform: "none" }}
          variant={"contained"}
          onClick={() => handleClick(param.audio, param.url, param.resolution)}
        >
          {param.resolution} <br /> ({param["Average-Bandwidth"]} kbps)
        </Button>
      </Grid>
    );
  });

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      columns={4}
      spacing={2}
    >
      {resolutionsButtons}
    </Grid>
  );
}
