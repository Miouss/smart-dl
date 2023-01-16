import React, { Dispatch, SetStateAction } from "react";

import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";

import StackCentered from "../../../../../styles/components/global/StackCentered";
import { DownloadButton } from "../../../../../styles/components/specific/Navbar";

interface Props {
  setDownloadStarted: Dispatch<SetStateAction<boolean>>;
  downloadStarted: boolean;
  mediaDownloaded: boolean;
  children: string;
}

export default function NavbarDownloadButton({
  setDownloadStarted,
  children,
}: Props) {
  return (
    <DownloadButton onClick={() => setDownloadStarted(true)}>
      <StackCentered direction={"row"} gap={"12px"} textTransform={"none"}>
        <SimCardDownloadOutlinedIcon />
        {children}
      </StackCentered>
    </DownloadButton>
  );
}
