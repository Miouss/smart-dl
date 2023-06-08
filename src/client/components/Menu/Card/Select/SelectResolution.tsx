import React from "react";

import { Grid } from "@mui/material";

import SelectButton from "../../../../styles/components/global/SelectButton";

import {
  VideoSelection,
  MediaFetched,
  MediaDetails,
} from "../../../../../types/Media";

interface Props {
  selection: VideoSelection[];
  setAudioSelected: (audio: string) => void;
  setMediaFetched: (mediaUrls: MediaFetched) => void;
  setMediaDetails: (mediaDetails: MediaDetails) => void;
}

export default function SelectResolution({
  selection,
  setAudioSelected,
  setMediaFetched,
  setMediaDetails,
}: Props) {
  const handleClick = (
    audioQuality: string,
    videoResolutionUrl: string,
    videoResolution: string
  ) => {
    setAudioSelected(audioQuality);
    setMediaDetails({
      lang: undefined,
      resolution: videoResolution,
    });
    setMediaFetched({
      audio: undefined,
      video: videoResolutionUrl,
    });
  };
  const resolutionsButtons: React.ReactElement[] = [];

  selection.forEach((param, i) => {
    resolutionsButtons.push(
      <Grid item key={`resBut${i}`}>
        <SelectButton
          onClick={() => handleClick(param.audio, param.url, param.resolution)}
          lowercase={"true"}
        >
          {param.resolution} <br /> ({param["Average-Bandwidth"]} kbps)
        </SelectButton>
      </Grid>
    );
  });

  return <Grid container>{resolutionsButtons}</Grid>;
}
