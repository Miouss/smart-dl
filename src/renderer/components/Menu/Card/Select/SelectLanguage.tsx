import React, { Dispatch, SetStateAction } from "react";

import { Grid } from "@mui/material";

import SelectButton from "../../../../styles/components/global/SelectButton";

import {
  AudioSelection,
  MediaFetched,
  MediaDetails,
  LangSelection,
} from "../../../../../types/Media";

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

  const langs = Object.keys(selection);

  langs.forEach((lang) => {
    const langSelected = selection[lang] as unknown as LangSelection;

    langBtns.push(
      <Grid item key={`${lang} Btn`}>
        <SelectButton onClick={() => handleClick(langSelected)}>
          {lang}
        </SelectButton>
      </Grid>
    );
  });

  return <Grid container>{langBtns}</Grid>;
}
