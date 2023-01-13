import React, { Dispatch, SetStateAction } from "react";

import NavbarButtonGroup from "./Navbar/NavbarButtonGroup";
import NavbarCancelButton from "./Navbar/NavbarCancelButton";

import { MediaDetails } from "../../../types/Media";
import NavbarDownloadButtonGroup from "./Navbar/NavbarDownloadButtonGroup";

interface Props {
  setResetSelection: Dispatch<SetStateAction<boolean>>;
  setDownloadStarted: Dispatch<SetStateAction<boolean>>;
  setBackHome: Dispatch<SetStateAction<boolean>>;
  downloadStarted: boolean;
  mediaDetails: MediaDetails;
  mediaDownloaded: boolean;
  mediaSelected: boolean;
}

export default function MediaMenuCardNavBar({
  setResetSelection,
  setDownloadStarted,
  setBackHome,
  downloadStarted,
  mediaDetails,
  mediaDownloaded,
  mediaSelected,
}: Props) {
  const downloading = downloadStarted && !mediaDownloaded;

  return (
    <NavbarButtonGroup>
      {downloading ? (
        <NavbarCancelButton />
      ) : (
        <NavbarDownloadButtonGroup
          setResetSelection={setResetSelection}
          setDownloadStarted={setDownloadStarted}
          setBackHome={setBackHome}
          downloadStarted={downloadStarted}
          mediaDownloaded={mediaDownloaded}
          downloadButtonLabel={`${mediaDetails.resolution?.split("x")[1]}p ${mediaDetails.lang?.toUpperCase()}`}
          mediaSelected={mediaSelected}
        />
      )}
    </NavbarButtonGroup>
  );
}
