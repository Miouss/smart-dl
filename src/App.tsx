import React, { useState } from "react";
import fetch, { Headers } from "cross-fetch";

import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";

export default function App() {
  const [data, setData] = useState(null);
  const [showUrl, setShowUrl] = useState(null);
  const [useSavedCredentials, setUseSavedCredentials] = useState(false);

  async function fetching(showUrl: string) {
    if (useSavedCredentials) {
      const header = new Headers({
        "Content-Type": "application/json",
      });

      const options = {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          showUrl,
        }),
      };

      const response = await fetch(
        "http://localhost:8000/stream/playlist",
        options
      );

      const mediaSelection = await response.json();

      const options2 = {
        method: "POST",
        headers: header,
        body: JSON.stringify({
          mediaSelection,
          showUrl,
        }),
      };

      const response2 = await fetch(
        "http://localhost:8000/stream/download",
        options2
      );

      setData(await response2.json());
    } else {
      alert("Tick use saved credentials please");
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetching(showUrl);
  };

  const chooseSaveLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.fileSystemAPI.openFileSystemDialog();
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack justifyContent={"center"} alignItems={"center"} spacing={5}>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <TextField
              id="standard-basic"
              label="Url link"
              variant="standard"
              onChange={(event) => setShowUrl(event.target.value)}
            />
            <button onClick={(e) => chooseSaveLocation(e)}>
              Choose Save Location
            </button>
          </Stack>
          <Stack
            direction={"row"}
            justifyContent={"space-evenly"}
            width={"100%"}
            height={"100%"}
          >
            <Stack direction={"row"}>
              <input
                type="checkbox"
                onClick={() => setUseSavedCredentials(!useSavedCredentials)}
              />
              <label> use saved credentials ?</label>
            </Stack>
            <Stack>
              <button type="submit">Submit</button>
            </Stack>
          </Stack>
        </Stack>
      </form>

      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
}
