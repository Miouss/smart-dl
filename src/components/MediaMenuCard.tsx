import React, { useState, useEffect } from "react";
import fetch, { Headers } from "cross-fetch";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Box } from "@mui/material";

import { Media, MediaUrls } from "../types/Media";

import MediaMenuCardSelection from "./MediaMenuCardSelection";

export default function MediaMenuCard({ ...vod }: Media) {
  const [mediaDownloaded, setMediaDownloaded] = useState(false);

  const [fetchMedia, setFetchMedia] = useState<MediaUrls>({
    audio: undefined,
    video: undefined,
  });

  const [mediaSelected, setMediaSelected] = useState(false);

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
          <MediaMenuCardSelection
            setFetchMedia={setFetchMedia}
            setMediaSelected={setMediaSelected}
            setMediaDownloaded={setMediaDownloaded}
            handleDownload={handleDownload}
            vod={vod}
            mediaSelected={mediaSelected}
            mediaDownloaded={mediaDownloaded}
          />
        </CardActions>
      </Card>
    </>
  );
}

/*

      <Button
        variant={"contained"}
        style={{ textTransform: "none" }}
        onClick={handleDownload}
      >
        DOWNLOAD in {mediaDetails.lang.toUpperCase()} at{" "}
        {mediaDetails.resolution.split("x")[1]}p
      </Button>
      <Button variant={"contained"} onClick={resetSelection} sx={{
        backgroundColor: "rgba(208, 2, 27, 0.25)",

      }}>
        <UndoIcon sx={{color: "white"}} />
      </Button>

*/
