import React, { Dispatch, SetStateAction } from "react";

import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

import {
  AudioSelection,
  MediaUrls,
  MediaDetails,
  LangSelection,
} from "../types/Media";
import { Stack } from "@mui/system";

interface Props {
  selection: AudioSelection | null;
  setAudioSelected: (audio: string) => void;
  setFetchMedia: Dispatch<SetStateAction<MediaUrls>>;
  setMediaDetails: Dispatch<SetStateAction<MediaDetails>>;
}

export default function MediaMenuCardSelectionLanguage({
  selection,
  setAudioSelected,
  setFetchMedia,
  setMediaDetails,
}: Props): JSX.Element {
  console.log(selection);

  if (selection === null) return null;

  const backToResolutionMenu = () => {
    setAudioSelected(null);
  };

  const handleClick = (langSelected: LangSelection) => {
    setFetchMedia((prevState: MediaUrls) => ({
      audio: langSelected.url as unknown as string,
      video: prevState.video,
    }));

    setMediaDetails((prevState: MediaDetails) => ({
      lang: langSelected.lang as unknown as string,
      resolution: prevState.resolution,
    }));
  };
  const langBtns: React.ReactElement[] = [];

  for (const lang in selection) {
    langBtns.push(
      <Grid item key={`${lang} Btn`}>
        <Button
          variant={"contained"}
          onClick={() =>
            handleClick(selection[lang] as unknown as LangSelection)
          }
        >
          {lang}
        </Button>
      </Grid>
    );
  }

  return (
    <>
      <Stack direction={"column"} width={"100%"} spacing={2}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          columns={4}
          spacing={2}
        >
          {langBtns}
        </Grid>
        <Button variant={"contained"} onClick={backToResolutionMenu}>
          Back to resolutions menu
        </Button>
      </Stack>
    </>
  );
}