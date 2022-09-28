import React from "react";

import { Stack } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Collapse, ListItemButton, ListItemText } from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { Media } from "../types/Media";

import MediaSelectionCardResolutionDropDown from "./MediaSelectionCardResolutionDropDown";
import MediaSelectionCardLanguageDropDown from "./MediaSelectionCardLanguageDropDown";

export default function MediaSelectionCard({ ...vod }: Media) {
  const [audioSelected, setAudioSelected] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          src={vod.thumbnail}
          alt={`"${vod.title}"'s thumbnail`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {vod.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {vod.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Stack direction={"column"} width={"100%"} spacing={2}>
            <ListItemButton onClick={handleClick}>
              <ListItemText style={{ textTransform: "none" }}>
                Choose Quality and Language
              </ListItemText>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {audioSelected === null ? (
                <MediaSelectionCardResolutionDropDown
                  selection={vod.VideoSelection}
                  setAudioSelected={setAudioSelected}
                />
              ) : (
                <MediaSelectionCardLanguageDropDown
                  selection={vod.AudioSelection[audioSelected]}
                  setAudioSelected={setAudioSelected}
                />
              )}
            </Collapse>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}
