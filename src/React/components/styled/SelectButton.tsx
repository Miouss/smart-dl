import React from "react";

import { Button } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SelectButton(props: any) {
  return (
    <Button
      sx={{
        fontFamily: 'Roboto Slab',
        fontWeight: "400",
        lineHeight: "21px",
        color: "#FFFFFF",
        backgroundColor: "#4F4F4F",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "2px",
        "&:hover": {
          backgroundColor: "rgba(208, 2, 27, 1)",
        }
      }}

      {...props}
    >
      {props.children}
    </Button>
  );
}
