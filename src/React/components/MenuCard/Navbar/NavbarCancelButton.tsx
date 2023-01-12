import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";

export default function NavbarCancelButton() {
  return (
    <Button
      onClick={() => {
        window.downloadAPI.sendCancelButtonPressed();
      }}
      sx={{
        background: "rgba(208, 2, 27, 1)",
        "&:hover": {
          background: "rgba(208, 2, 27, 0.7)",
        },
      }}
    >
      <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
        <CloseIcon />
      </Stack>
    </Button>
  );
}
