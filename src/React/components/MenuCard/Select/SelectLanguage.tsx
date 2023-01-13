import React, { Dispatch, SetStateAction } from "react";

import { Grid } from "@mui/material";

import {
  AudioSelection,
  MediaFetched,
  MediaDetails,
  LangSelection,
} from "../../../../types/Media";
import { Stack } from "@mui/system";

import SelectButton from "../../styled/SelectButton";

interface Props {
  selection: AudioSelection | null;
  setAudioSelected: (audio: string) => void;
  setMediaFetched: Dispatch<SetStateAction<MediaFetched>>;
  setMediaDetails: Dispatch<SetStateAction<MediaDetails>>;
}

export default function SelectLanguage({
  selection,
  setMediaFetched,
  setMediaDetails,
}: Props): JSX.Element {
  if (selection === null) return null;

  const handleClick = (langSelected: LangSelection) => {
    setMediaFetched((prevState: MediaFetched) => ({
      audio: langSelected.url as unknown as string,
      video: prevState.video,
      selected: true,
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
        <SelectButton
          onClick={() =>
            handleClick(selection[lang] as unknown as LangSelection)
          }
        >
          {lang}
        </SelectButton>
      </Grid>
    );
  }

  return (
    <>
      <Stack direction={"column"} width={"100%"} spacing={2}>
        <Grid
          container
          columns={4}
          justifyContent="center"
          alignItems="center"
        >
          {langBtns}
        </Grid>
      </Stack>
    </>
  );
}
