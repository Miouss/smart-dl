import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";

import { CancelButtonColor } from "../../../utils/style/colors";

export default function NavbarCancelButton() {
  return (
    <Button
      onClick={() => {
        window.downloadAPI.sendCancelButtonPressed();
      }}
      sx={{
        backgroundColor: `${CancelButtonColor.normal}`,
        "&:hover": {
          backgroundColor: `${CancelButtonColor.hover}`,
        },
      }}
    >
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <CloseIcon />
      </Stack>
    </Button>
  );
}
