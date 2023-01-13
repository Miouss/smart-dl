import React, { Dispatch, SetStateAction } from "react";

import NavbarButtonGroup from "./Navbar/NavbarButtonGroup";
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
    <NavbarButtonGroup>
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
    </NavbarButtonGroup>
  );
}
