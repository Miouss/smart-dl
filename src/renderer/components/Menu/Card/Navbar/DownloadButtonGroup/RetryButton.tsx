import React, { Dispatch, SetStateAction } from "react";

import RefreshIcon from "@mui/icons-material/Refresh";

import { RetryButton } from "../../../../../styles/components/specific/Navbar";

interface Props {
  setResetSelection: Dispatch<SetStateAction<boolean>>;
}

export default function NavbarRetryButton({ setResetSelection }: Props) {
  return (
    <RetryButton onClick={() => setResetSelection((prevState) => !prevState)}>
      <RefreshIcon />
    </RetryButton>
  );
}
