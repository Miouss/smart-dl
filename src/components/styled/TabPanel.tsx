import { Box } from "@mui/material";
import React from "react";

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function TabPanel({ value, index, children, ...other }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Panel = (props: any) => (
    <Box
      sx={{
        background: "inherit",
        color: "#F2F2F2",
        padding: "10px"
      }}
    >
      {props.children}
    </Box>
  );

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Panel>{children}</Panel>}
    </div>
  );
}
