import React, { Dispatch, SetStateAction } from "react";

import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { HomeButtonColor, HomeButtonIconColor } from "../../../utils/style/colors";

export default function NavbarHomeButton({setBackHome}: {setBackHome : Dispatch<SetStateAction<boolean>>}) {
  return (
    <Button
      onClick={() => (setBackHome((backHome) => (!backHome)))}
      sx={{
        backgroundColor: `${HomeButtonColor.normal}`,
        "&:hover": {
          background: `${HomeButtonColor.hover}`,
        },
      }}
    >
      <HomeIcon
        sx={{
          color: `${HomeButtonIconColor}`,
        }}
      />
    </Button>
  );
}
