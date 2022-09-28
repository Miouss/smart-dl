import React from "react";

import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

import { VideoSelection } from "../types/Media";

interface Props {
  selection: VideoSelection[];
  setAudioSelected: (audio: string) => void;
}

export default function MediaSelectionCardResolutionDropDown({
  selection,
  setAudioSelected,
}: Props) {
  const resolutionsButtons: React.ReactElement[] = [];

  selection.forEach((param, i) => {
    resolutionsButtons.push(
      <Grid item key={`resBut${i}`}>
        <Button
          style={{ textTransform: "none" }}
          variant={"contained"}
          onClick={() => setAudioSelected(param.audio)}
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
