import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

import SelectLanguage from "./Select/SelectLanguage";
import SelectResolution from "./Select/SelectResolution";

import { Stack } from "@mui/system";
import { Tab, Tabs } from "@mui/material";

import { MediaUrls, MediaDetails } from "../../../types/Media";
import TabPanel from "../styled/TabPanel";
import { TabColor, TabsColor, TabsIndicatorColor } from "../../utils/style/colors";

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
    setMediaFetched((mediaFetched) => ({ ...mediaFetched, selected: false }));
    setMediaDetails({
      lang: undefined,
      resolution: undefined,
    });
    setDownloadStarted(false);
    setMediaDownloaded(false);
  }, [vod, resetSelection]);

  const styleTab = {
    "&.Mui-selected": { color: `${TabColor}` },
  };

  const styleTabs = {
    fontFamily: "Roboto Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "18px",
    color: `${TabsColor}`,
    ".MuiTabs-indicator": {
      backgroundColor: `${TabsIndicatorColor}`,
    },
  }

  return (
    <Stack direction="column" width="100%" spacing={2}>
      <Stack
        direction="row"
        justifyContent="center"
        spacing="51px"
      >
        <Tabs
          value={tabIndex}
          onChange={() => handleTabChange}
          aria-label="basic tabs example"
          sx={styleTabs}
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
          setMediaFetched={setMediaFetched}
          setMediaDetails={setMediaDetails}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <SelectLanguage
          selection={vod.AudioSelection[audioSelected]}
          setAudioSelected={setAudioSelected}
          setMediaFetched={setMediaFetched}
          setMediaDetails={setMediaDetails}
        />
      </TabPanel>
    </Stack>
  );
}
