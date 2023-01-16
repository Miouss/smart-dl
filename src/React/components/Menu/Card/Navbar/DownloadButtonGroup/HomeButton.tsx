import React, { Dispatch, SetStateAction } from "react";

import HomeIcon from "@mui/icons-material/Home";

import { HomeButton } from "../../../../../styles/components/specific/Navbar";

import { HomeButtonIconColor } from "../../../../../styles/colors";

interface Props {
  setBackHome: Dispatch<SetStateAction<boolean>>;
}

export default function NavbarHomeButton({ setBackHome }: Props) {
  return (
    <HomeButton onClick={() => setBackHome((prevState) => !prevState)}>
      <HomeIcon
        sx={{
          color: `${HomeButtonIconColor}`,
        }}
      />
    </HomeButton>
  );
}
