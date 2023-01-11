import React, { useState, Dispatch, SetStateAction } from "react";

import { ButtonGroup } from "@mui/material";

import NavbarHomeButton from "./Navbar/NavbarHomeButton";
import NavbarRetryButton from "./Navbar/NavbarRetryButton";
import NavbarDownloadButton from "./Navbar/NavbarDownloadButton";
import NavbarCancelButton from "./Navbar/NavbarCancelButton";
import NavbarDownloadDisabledButton from "./Navbar/NavbarDownloadDisabledButton";

import { MediaDetails } from "../../../types/Media";

interface Props {
  setResetSelection: Dispatch<SetStateAction<boolean>>;
  setDownloadStarted: Dispatch<SetStateAction<boolean>>;
  setBackHome: Dispatch<SetStateAction<boolean>>;
  mediaSelected: boolean;
  downloadStarted: boolean;
  mediaDetails: MediaDetails;
  mediaDownloaded: boolean;
}

export default function MediaMenuCardNavBar({
  setResetSelection,
  setDownloadStarted,
  setBackHome,
  mediaSelected,
  downloadStarted,
  mediaDetails,
  mediaDownloaded,
}: Props) {
  const mediaLabel = mediaSelected
    ? `${mediaDetails.resolution.split("x")[1]}p
    ${mediaDetails.lang.toUpperCase()}`
    : "";

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
      {downloadStarted && !mediaDownloaded ? (
        <NavbarCancelButton />
      ) : (
        <>
          <NavbarHomeButton setBackHome={setBackHome} />
          <NavbarRetryButton setResetSelection={setResetSelection} />

          {mediaSelected && !mediaDownloaded ? (
            <NavbarDownloadButton
              setDownloadStarted={setDownloadStarted}
              downloadStarted={downloadStarted}
              mediaDownloaded={mediaDownloaded}
            >
              {mediaLabel}
            </NavbarDownloadButton>
          ) : (
            <NavbarDownloadDisabledButton />
          )}
        </>
      )}
    </ButtonGroup>
  );
}
