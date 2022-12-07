import React, { Dispatch, SetStateAction } from "react";

import { Stack } from "@mui/system";

import { Button, ButtonGroup, CircularProgress } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import RefreshIcon from "@mui/icons-material/Refresh";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileDownloadOffIcon from "@mui/icons-material/FileDownloadOff";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";

import { MediaDetails } from "../types/Media";

interface Props {
  setResetSelection: Dispatch<SetStateAction<boolean>>;
  setDownloadStarted: Dispatch<SetStateAction<boolean>>;
  mediaSelected: boolean;
  downloadStarted: boolean;
  mediaDetails: MediaDetails;
  mediaDownloaded: boolean;
}

export default function MediaMenuCardNavBar({
  setResetSelection,
  setDownloadStarted,
  mediaSelected,
  downloadStarted,
  mediaDetails,
  mediaDownloaded,
}: Props) {
  return (
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
        onClick={() => setResetSelection((resetSelection) => !resetSelection)}
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
            {downloadStarted ? (
              mediaDownloaded ? (
                <FileDownloadDoneIcon />
              ) : (
                <CircularProgress />
              )
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
  );
}
