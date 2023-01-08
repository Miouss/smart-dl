import React, { useState, useEffect } from "react";
import fetch, { Headers } from "cross-fetch";

import { Stack } from "@mui/system";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Box } from "@mui/material";
import { Media, MediaDetails, MediaUrls } from "../../../types/Media";

import CardSelect from "./Card/CardSelect";
import CardNavbar from "./Card/CardNavbar";
import CardStepper from "./Card/CardStepper";

export default function MediaMenuCard({ ...vod }: Media) {
  const [mediaDownloaded, setMediaDownloaded] = useState(false);

  const [mediaDetails, setMediaDetails] = useState<MediaDetails>({
    lang: undefined,
    resolution: undefined,
  });

  const [fetchMedia, setFetchMedia] = useState<MediaUrls>({
    audio: undefined,
    video: undefined,
  });

  const [mediaSelected, setMediaSelected] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [resetSelection, setResetSelection] = useState(false);

  async function handleDownload() {
    const header = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        videoUrl: vod.prefix + fetchMedia.video,
        audioUrl: vod.prefix + fetchMedia.audio,
        vodTitle: vod.title,
      }),
    };

    const response = await fetch(
      "http://localhost:8000/stream/download",
      options
    );

    if (response.ok) setMediaDownloaded(true);
    else setMediaDownloaded(false);
  }

  useEffect(() => {
    if (fetchMedia.audio !== undefined && fetchMedia.video !== undefined) {
      setMediaSelected(true);
    }
  }, [fetchMedia]);

  useEffect(() => {
    if (downloadStarted) {
      handleDownload();
    }
  }, [downloadStarted]);

  return (
    <>
      <Card sx={{ background: "inherit", boxShadow: "none" }}>
        <Box
          sx={{
            border: "2px solid #BDBDBD",
          }}
        >
          <CardMedia
            component="img"
            src={vod.thumbnail}
            alt={`"${vod.title}"'s thumbnail`}
          />
        </Box>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="#F2F2F2">
            {vod.title}
          </Typography>
          <Typography variant="body2" color="#E0E0E0">
            {vod.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Stack direction="column" width="100%" spacing={2}>
            {downloadStarted ? (
              <CardStepper />
            ) : (
              <CardSelect
                setFetchMedia={setFetchMedia}
                setMediaSelected={setMediaSelected}
                setMediaDownloaded={setMediaDownloaded}
                setDownloadStarted={setDownloadStarted}
                setMediaDetails={setMediaDetails}
                vod={vod}
                resetSelection={resetSelection}
              />
            )}

            <CardNavbar
              setResetSelection={setResetSelection}
              setDownloadStarted={setDownloadStarted}
              mediaSelected={mediaSelected}
              downloadStarted={downloadStarted}
              mediaDetails={mediaDetails}
              mediaDownloaded={mediaDownloaded}
            />
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}
