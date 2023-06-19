import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

import SelectLanguage from "./Select/SelectLanguage";
import SelectResolution from "./Select/SelectResolution";

import { Tab, Tabs, Stack } from "@mui/material";

import { TabPanel } from "../../../styles/components/specific/Select";

import type { MediaUrls, MediaDetails } from "../../../../types/Media";

export type AudioSelected = string | undefined;

interface Props {
  setMediaFetched: Dispatch<SetStateAction<MediaUrls>>;
  setMediaDownloaded: Dispatch<SetStateAction<boolean>>;
  setDownloadStarted: Dispatch<SetStateAction<boolean>>;
  setMediaDetails: Dispatch<SetStateAction<MediaDetails>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vod: any;
  resetSelection: boolean;
}

export default function MediaMenuCardSelection({
  setMediaFetched,
  setMediaDownloaded,
  setDownloadStarted,
  setMediaDetails,
  vod,
  resetSelection,
}: Props) {
  const [audioSelected, setAudioSelected] = useState<AudioSelected>(undefined);

  const [tabIndex, setTabIndex] = useState(0);

  const addTabProps = (index: number) => ({
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  });

  const handleTabChange = (newValue: number) => {
    setTabIndex(newValue);
  };

  useTabChange(audioSelected, handleTabChange);
  useResetSelection(
    vod,
    resetSelection,
    setMediaFetched,
    setMediaDownloaded,
    setDownloadStarted,
    setMediaDetails,
    setAudioSelected,
    handleTabChange
  );

  return (
    <Stack direction="column" width="100%" spacing={2}>
      <Stack direction="row" justifyContent="center" spacing="51px">
        <Tabs
          value={tabIndex}
          onChange={() => handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Quality" {...addTabProps(0)} />
          <Tab
            label="Language"
            {...addTabProps(1)}
            disabled={audioSelected === undefined ? true : false}
          />
        </Tabs>
      </Stack>
      <TabPanel value={tabIndex} index={0}>
        <SelectResolution
          selection={vod.streams.video}
          setAudioSelected={setAudioSelected}
          setMediaFetched={setMediaFetched}
          setMediaDetails={setMediaDetails}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <SelectLanguage
          selection={vod.streams.audio[audioSelected]}
          setAudioSelected={setAudioSelected}
          setMediaFetched={setMediaFetched}
          setMediaDetails={setMediaDetails}
        />
      </TabPanel>
    </Stack>
  );
}

function useTabChange(
  audioSelected: AudioSelected,
  handleTabChange: (newValue: number) => void
) {
  useEffect(() => {
    if (audioSelected === undefined) {
      handleTabChange(0);
    } else {
      handleTabChange(1);
    }
  }, [audioSelected]);
}

function useResetSelection(
  vod: any,
  resetSelection: boolean,
  setMediaFetched: Dispatch<SetStateAction<MediaUrls>>,
  setMediaDownloaded: Dispatch<SetStateAction<boolean>>,
  setDownloadStarted: Dispatch<SetStateAction<boolean>>,
  setMediaDetails: Dispatch<SetStateAction<MediaDetails>>,
  setAudioSelected: Dispatch<SetStateAction<AudioSelected>>,
  handleTabChange: (newValue: number) => void
) {
  useEffect(() => {
    handleTabChange(0);
    setAudioSelected(undefined);
    setMediaFetched((mediaFetched) => ({ ...mediaFetched, selected: false }));
    setMediaDetails({
      lang: undefined,
      resolution: undefined,
    });
    setDownloadStarted(false);
    setMediaDownloaded(false);
  }, [vod, resetSelection]);
}
