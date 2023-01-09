import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

import SelectLanguage from "./Select/SelectLanguage";
import SelectResolution from "./Select/SelectResolution";

import { Stack } from "@mui/system";
import {
  Tab,
  Tabs,
} from "@mui/material";

import { MediaUrls, MediaDetails } from "../../../../types/Media";
import TabPanel from "../../styled/TabPanel";

interface Props {
  setFetchMedia: Dispatch<SetStateAction<MediaUrls>>;
  setMediaSelected: Dispatch<SetStateAction<boolean>>;
  setMediaDownloaded:  Dispatch<SetStateAction<boolean>>;
  setDownloadStarted:  Dispatch<SetStateAction<boolean>>;
  setMediaDetails: Dispatch<SetStateAction<MediaDetails>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vod: any;
  resetSelection: boolean;
}

export default function MediaMenuCardSelection({
  setFetchMedia,
  setMediaSelected,
  setMediaDownloaded,
  setDownloadStarted,
  setMediaDetails,
  vod,
  resetSelection
}: Props) {
  const [audioSelected, setAudioSelected] = useState(undefined);

  const [tabIndex, setTabIndex] = useState(0);

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleTabChange = (newValue: number) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    if (audioSelected === undefined) {
      handleTabChange(0);
    } else {
      handleTabChange(1);
    }
  }, [audioSelected]);

  useEffect(() => {
      handleTabChange(0);
      setAudioSelected(undefined);
      setMediaSelected(false);
      setMediaDetails({
        lang: undefined,
        resolution: undefined,
      });
      setDownloadStarted(false);
      setMediaDownloaded(false);
  }, [resetSelection]);

  const styleTab = {
    "&.Mui-selected": { color: "#F2F2F2" },
  };

  return (
    <Stack direction="column" width="100%" spacing={2}>
      <Stack
        direction="row"
        justifyContent="center"
        spacing="51px"
        color="#F2F2F2"
      >
        <Tabs
          value={tabIndex}
          onChange={() => handleTabChange}
          aria-label="basic tabs example"
          sx={{
            fontFamily: "Roboto Slab",
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "18px",
            color: "#F2F2F2",
            ".MuiTabs-indicator": {
              backgroundColor: "rgba(208, 2, 27, 1)",
            },
          }}
        >
          <Tab label="Quality" {...a11yProps(0)} sx={styleTab} />
          <Tab
            label="Language"
            {...a11yProps(1)}
            disabled={audioSelected === undefined ? true : false}
            sx={styleTab}
          />
        </Tabs>
      </Stack>
      <TabPanel value={tabIndex} index={0}>
        <SelectResolution
          selection={vod.VideoSelection}
          setAudioSelected={setAudioSelected}
          setFetchMedia={setFetchMedia}
          setMediaDetails={setMediaDetails}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <SelectLanguage
          selection={vod.AudioSelection[audioSelected]}
          setAudioSelected={setAudioSelected}
          setFetchMedia={setFetchMedia}
          setMediaDetails={setMediaDetails}
        />
      </TabPanel>
    </Stack>
  );
}