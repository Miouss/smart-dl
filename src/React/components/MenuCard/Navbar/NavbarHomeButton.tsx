import React, { Dispatch, SetStateAction } from "react";

import { Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";


export default function NavbarHomeButton({setBackHome}: {setBackHome : Dispatch<SetStateAction<boolean>>}) {
  return (
    <Button
      onClick={() => (setBackHome((backHome) => (!backHome)))}
      sx={{
        background: "rgba(79, 79, 79, 1)",
        "&:hover": {
          background: "rgba(79, 79, 79, 0.7)",
        },
      }}
    >
      <HomeIcon
        sx={{
          color: "white",
        }}
      />
    </Button>
  );
}
