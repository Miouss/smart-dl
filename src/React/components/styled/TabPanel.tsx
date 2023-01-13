import { Box } from "@mui/material";
import React from "react";

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function TabPanel({ value, index, children, ...other }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      padding={value !== index ? 0 : "10px"}
      marginTop={"5px !important"}
      marginBottom={"5px !important"}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "inherit",
        color: "#F2F2F2",
        fontFamily: "Roboto Slab",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "18px",
      }}

      {...other}
    >
      {value === index && children}
    </Box>
  );
}
