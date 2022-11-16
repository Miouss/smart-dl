import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

import MediaMenuCardSelectionLanguage from "./MediaMenuCardSelectionLanguage";
import MediaMenuCardSelectionResolution from "./MediaMenuCardSelectionResolution";

import { Stack } from "@mui/system";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileDownloadOffIcon from "@mui/icons-material/FileDownloadOff";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

import { MediaUrls, MediaDetails } from "../types/Media";
import TabPanel from "./styled/TabPanel";

interface Props {
  setFetchMedia: Dispatch<SetStateAction<MediaUrls>>;
  setMediaSelected: Dispatch<SetStateAction<boolean>>;
  setMediaDownloaded:  Dispatch<SetStateAction<boolean>>;
  handleDownload: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  vod: any;
  mediaSelected: boolean;
  mediaDownloaded: boolean;
}

export default function MediaMenuCardSelection({
  setFetchMedia,
  setMediaSelected,
  setMediaDownloaded,
  handleDownload,
  vod,
  mediaSelected,
  mediaDownloaded,
}: Props) {
  const [audioSelected, setAudioSelected] = useState(undefined);

  const [mediaDetails, setMediaDetails] = useState<MediaDetails>({
    lang: undefined,
    resolution: undefined,
  });

  const [downloadStarted, setDownloadStarted] = useState(false);

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

  const resetSelection = () => {
    handleTabChange(0);
    setAudioSelected(undefined);
    setMediaSelected(false);
    setMediaDetails({
      lang: undefined,
      resolution: undefined,
    });
    setDownloadStarted(false);
    setMediaDownloaded(false);
  };

  useEffect(() => {
    if (audioSelected === undefined) {
      handleTabChange(0);
    } else {
      handleTabChange(1);
    }
  }, [audioSelected]);

  useEffect(() => {
    if(downloadStarted){
      handleDownload();
    }
  }, [downloadStarted]);

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
        <MediaMenuCardSelectionResolution
          selection={vod.VideoSelection}
          setAudioSelected={setAudioSelected}
          setFetchMedia={setFetchMedia}
          setMediaDetails={setMediaDetails}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <MediaMenuCardSelectionLanguage
          selection={vod.AudioSelection[audioSelected]}
          setAudioSelected={setAudioSelected}
          setFetchMedia={setFetchMedia}
          setMediaDetails={setMediaDetails}
        />
      </TabPanel>

      <ButtonGroup
        fullWidth
        disableFocusRipple
        disableRipple
        variant="contained"
        sx={{
          gap: "20px",
          justifyContent: "center",
          "& .MuiButtonGroup-grouped:not(:last-of-type)": {
            border: "none",
          },
        }}
      >
        <Button
          sx={{
            background: "rgba(79, 79, 79, 1)",
            "&:hover": {
              background: "rgba(79, 79, 79, 0.7)",
            },
          }}
        >
          <HomeIcon
            sx={{
              color: "white",
            }}
          />
        </Button>
        <Button
          onClick={resetSelection}
          sx={{
            background: "rgba(208, 2, 27, 1)",
            "&:hover": {
              background: "rgba(208, 2, 27, 0.7)",
            },
          }}
        >
          <RefreshIcon
            sx={{
              color: "white",
            }}
          />
        </Button>
        {mediaSelected ? (
          <Button
            onClick={() => setDownloadStarted(true)}
            sx={{
              background: "rgba(39, 184, 71, 1)",
              "&:hover": {
                background: "rgba(39, 184, 71, 0.7)",
              },
            }}
          >
            <Stack
              direction={"row"}
              justifyContent={"center"}
              sx={{ gap: "12px", textTransform: "none" }}
            >
              {mediaDownloaded ? (
                <FileDownloadDoneIcon />
              ) : downloadStarted ? (
                <CircularProgress />
              ) : (
                <FileDownloadIcon
                  sx={{
                    color: "white",
                    fontFamily: "Roboto Slab",
                    fontWeight: "400",
                    lineHeight: "21px",
                  }}
                />
              )}
              {mediaDetails.resolution.split("x")[1]}p{" "}
              {mediaDetails.lang.toUpperCase()}
            </Stack>
          </Button>
        ) : (
          <Button
            disabled
            sx={{
              "&.Mui-disabled": {
                backgroundColor: "rgb(255, 165, 0)",
              },
            }}
          >
            <FileDownloadOffIcon
              sx={{
                color: "white",
              }}
            />
          </Button>
        )}
      </ButtonGroup>
    </Stack>
  );
}

/*
  const [audioSelected, setAudioSelected] = useState(null);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

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
  */
