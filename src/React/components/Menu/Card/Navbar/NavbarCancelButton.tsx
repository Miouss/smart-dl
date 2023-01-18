import React from "react";

import CloseIcon from "@mui/icons-material/Close";

import { CancelButton } from "../../../../styles/components/specific/Navbar";

export default function NavbarCancelButton() {
  return (
    <CancelButton onClick={() => window.mediaAPI.sendCancelButtonClicked.fire()}>
      <CloseIcon />
    </CancelButton>
  );
}
