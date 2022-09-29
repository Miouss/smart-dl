import React, {useState} from "react";
import fetch, { Headers } from "cross-fetch";

import { Stack } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { Button } from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";

import { Media, MediaUrls, MediaDetails } from "../types/Media";

import MediaMenuCardSelection from "./MediaMenuCardSelection";
import MediaMenuCardDownload from "./MediaMenuCardDownload";

export default function MediaMenuCard({ ...vod }: Media) {
  const [mediaDownloaded, setMediaDownloaded] = useState(false);

  const [fetchMedia, setFetchMedia] = useState<MediaUrls>({
    audio: undefined,
    video: undefined,
  });
  const [mediaDetails, setMediaDetails] = useState<MediaDetails>({
    lang: undefined,
    resolution: undefined,
  });

  const [mediaSelected, setMediaSelected] = useState(false);


  const resetSelection = () => {
    setFetchMedia({
      audio: undefined,
      video: undefined,
    });

    setMediaSelected(false);
    setMediaDownloaded(false);
  };

  async function handleDownload() {
    setMediaDownloaded(true);
    // const header = new Headers({
    //   "Content-Type": "application/json",
    // });

    // const options = {
    //   method: "POST",
    //   headers: header,
    //   body: JSON.stringify({
    //     videoUrl: vod.prefix + fetchMedia.video,
    //     audioUrl: vod.prefix + fetchMedia.audio,
    //     vodTitle: vod.title,
    //   }),
    // };

    // const response = await fetch(
    //   "http://localhost:8000/stream/download",
    //   options
    // );

    // if (response.ok) setMediaDownloaded(true);
    // else setMediaDownloaded(false);
  }

  React.useEffect(() => {
    if (fetchMedia.audio !== undefined && fetchMedia.video !== undefined) {
      setMediaSelected(true);
    }
  }, [fetchMedia]);

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
          {mediaSelected ? (
            <MediaMenuCardDownload mediaDetails={mediaDetails} handleDownload={handleDownload} resetSelection={resetSelection} />
          ) : (
            <MediaMenuCardSelection setFetchMedia={setFetchMedia} setMediaDetails={setMediaDetails} vod={vod}/>
          )}
        </CardActions>
      </Card>
    </>
  );
}
