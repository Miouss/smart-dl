import React, { Dispatch, SetStateAction } from "react";

import NavbarCancelButton from "./Navbar/NavbarCancelButton";
import NavbarDownloadButtonGroup from "./Navbar/NavbarDownloadButtonGroup";

import { NavbarButtonGroup } from "../../../styles/components/specific/Navbar";

import { MediaDetails } from "../../../../types/Media";

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
          downloadButtonLabel={`${
            mediaDetails.resolution?.split("x")[1]
          }p ${mediaDetails.lang?.toUpperCase()}`}
          mediaSelected={mediaSelected}
        />
      )}
    </NavbarButtonGroup>
  );
}
