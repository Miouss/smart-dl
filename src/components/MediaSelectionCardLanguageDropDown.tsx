import React from "react";

import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

import { AudioSelection } from "../types/Media";
import { Stack } from "@mui/system";

interface Props {
  selection: AudioSelection | null;
  setAudioSelected: (audio: string) => void;
}

export default function MediaSelectionCardLanguageDropDown({
  selection,
  setAudioSelected,
}: Props) {
  console.log(selection);

  if (selection === null) return null;

  const backToResolutionMenu = () => {
    setAudioSelected(null);
  };

  const handleClick = (url: string) => {
    console.log(url);
  };
  const langBtns: React.ReactElement[] = [];

  for (const lang in selection) {
    langBtns.push(
      <Grid item key={`${lang} Btn`}>
        <Button
          variant={"contained"}
          onClick={() => handleClick(selection[lang].url as unknown as string)}
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
