import { Box } from "@mui/material";
import React from "react";
import { TabPanelColor } from "../../utils/style/colors";

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function TabPanel({ value, index, children, ...other }: Props) {
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "inherit",
    color: `${TabPanelColor}`,
    fontFamily: "Roboto Slab",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "18px",
    padding: value !== index ? 0 : "10px",
    marginTop: "5px !important",
    marginBottom: "5px !important",
  };

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={style}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}
