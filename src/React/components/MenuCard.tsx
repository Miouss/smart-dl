import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import fetch, { Headers } from "cross-fetch";

import { Stack } from "@mui/system";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import { Box } from "@mui/material";
import { Media, MediaDetails, MediaFetched } from "../../types/Media";

import CardSelect from "./MenuCard/CardSelect";
import CardNavbar from "./MenuCard/CardNavbar";
import CardStepper from "./MenuCard/CardStepper";
import { VodDescription, VodTitle } from "./styled/Card";
import { CardColor, CardMediaBoxColor } from "../utils/style/colors";

interface Props {
  setBackHome: Dispatch<SetStateAction<boolean>>;
  vod: Media;
}

export default function MenuCard({ setBackHome, vod }: Props) {
  const [mediaDownloaded, setMediaDownloaded] = useState(false);

  const [mediaDetails, setMediaDetails] = useState<MediaDetails>({
    lang: undefined,
    resolution: undefined,
  });

  const [mediaFetched, setMediaFetched] = useState<undefined | MediaFetched>(
    undefined
  );

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
        videoUrl: vod.prefix + mediaFetched.video,
        audioUrl: vod.prefix + mediaFetched.audio,
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
    if (downloadStarted) {
      handleDownload();
    }
  }, [downloadStarted]);

  useEffect(() => {
    setMediaFetched({ video: undefined, audio: undefined });
    setDownloadStarted(false);
  }, [vod, resetSelection]);

  return (
      <Card sx={{ backgroundColor: CardColor, maxWidth:"760px"}}>
          <Box border={`2px solid ${CardMediaBoxColor}`} >
            <CardMedia
              component="img"
              image={vod.thumbnail}
              alt={`"${vod.title}"'s thumbnail`}
            />
          </Box>

          <CardContent>
            <VodTitle component={"div"}
            >
              {vod.title}
            </VodTitle>
            <VodDescription>
              {vod.description}
            </VodDescription>
          </CardContent>
          <CardActions>
            <Stack direction="column" width="100%" spacing={2}>
              {downloadStarted ? (
                <CardStepper />
              ) : (
                <CardSelect
                  setMediaFetched={setMediaFetched}
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
                setBackHome={setBackHome}
                downloadStarted={downloadStarted}
                mediaDetails={mediaDetails}
                mediaDownloaded={mediaDownloaded}
                mediaSelected={mediaFetched?.selected}
              />
            </Stack>
          </CardActions>
        
      </Card>
  );
}
