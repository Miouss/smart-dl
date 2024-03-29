import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import fetch, { Headers } from "cross-fetch";

import CardSelect from "./Card/CardSelect";
import CardNavbar from "./Card/CardNavbar";
import CardStepper from "./Card/CardStepper";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Stack,
} from "@mui/material";

import {
  VodDescription,
  VodTitle,
} from "../../styles/components/specific/Card";

import { CardColor, CardMediaBoxColor } from "../../styles/colors";

import type { Media, MediaDetails, MediaFetched } from "../../../types/Media";

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

  useDownloadHandler(downloadStarted, setMediaDownloaded, mediaFetched, vod);

  useMediaReset(setMediaFetched, setDownloadStarted, resetSelection, vod);

  return (
    <Card
      sx={{ backgroundColor: CardColor, maxWidth: "720px", boxShadow: "none" }}
    >
      <Box border={`2px solid ${CardMediaBoxColor}`}>
        <CardMedia
          component="img"
          image={vod.thumbnail}
          alt={`"${vod.title}"'s thumbnail`}
        />
      </Box>

      <CardContent>
        <VodTitle component={"div"}>{vod.title}</VodTitle>
        <VodDescription>{vod.description}</VodDescription>
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

function useDownloadHandler(
  downloadStarted: boolean,
  setMediaDownloaded: Dispatch<SetStateAction<boolean>>,
  mediaFetched: MediaFetched,
  vod: Media
) {
  console.log(vod);
  async function handleDownload() {
    const { video, audio } = mediaFetched;
    const { streams, title, domain } = vod;
    const { prefix } = streams;

    const header = new Headers({
      "Content-Type": "application/json",
    });

    const body = {
      videoUrl: prefix + video,
      audioUrl: prefix + audio,
      vodTitle: title,
      domain
    };

    console.log(body);

    const options = {
      method: "POST",
      headers: header,
      body: JSON.stringify(body),
    };

    const fetchUrl = `http://localhost:8000/media/${domain}`;

    const response = await fetch(fetchUrl, options);

    if (response.ok) setMediaDownloaded(true);
    else setMediaDownloaded(false);
  }

  useEffect(() => {
    if (downloadStarted) {
      handleDownload();
    }
  }, [downloadStarted]);
}

function useMediaReset(
  setMediaFetched: Dispatch<SetStateAction<MediaFetched>>,
  setDownloadStarted: Dispatch<SetStateAction<boolean>>,
  resetSelection: boolean,
  vod: Media
) {
  useEffect(() => {
    setMediaFetched({ video: undefined, audio: undefined });
    setDownloadStarted(false);
  }, [vod, resetSelection]);
}
