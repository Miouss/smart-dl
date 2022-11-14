import React, { useState, Dispatch, SetStateAction } from "react";

import MediaMenuCardSelectionLanguage from "./MediaMenuCardSelectionLanguage";
import MediaMenuCardSelectionResolution from "./MediaMenuCardSelectionResolution";

import { Stack } from "@mui/system";
import { Collapse, ListItemButton, ListItemText } from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { MediaUrls, MediaDetails } from "../types/Media";

interface Props {
  setFetchMedia: Dispatch<SetStateAction<MediaUrls>>;
  setMediaDetails: Dispatch<SetStateAction<MediaDetails>>;
  vod: any;
}

export default function MediaMenuCardSelection({
  setFetchMedia,
  setMediaDetails,
  vod,
}: Props) {
  const [audioSelected, setAudioSelected] = useState(null);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Stack direction={"column"} width={"100%"} spacing={2}>
      <ListItemButton onClick={handleClick}>
        <ListItemText style={{ textTransform: "none" }}>
          Choose Quality and Language
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {audioSelected === null ? (
          <MediaMenuCardSelectionResolution
            selection={vod.VideoSelection}
            setAudioSelected={setAudioSelected}
            setFetchMedia={setFetchMedia}
            setMediaDetails={setMediaDetails}
          />
        ) : (
          <MediaMenuCardSelectionLanguage
            selection={vod.AudioSelection[audioSelected]}
            setAudioSelected={setAudioSelected}
            setFetchMedia={setFetchMedia}
            setMediaDetails={setMediaDetails}
          />
        )}
      </Collapse>
    </Stack>
  );
}
