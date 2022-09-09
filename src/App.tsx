import React, { useEffect, useState } from "react";
import fetch, { Headers } from "cross-fetch";

import TextField from "@mui/material/TextField";

export default function App() {
  const [data, setData] = useState(null);
  const [showUrl, setShowUrl] = useState(null);

  async function fetching(showUrl: string) {
    const Credentials = {
      id: "bigmiouss123@gmail.com",
      secret: "TheInFamous-2",
    };

    const header = new Headers({
      "Content-Type": "application/json",
    });

    const options = {
      method: "POST",
      headers: header,
      body: JSON.stringify({
        id: Credentials.id,
        secret: Credentials.secret,
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
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    fetching(showUrl)
  }

  const chooseSaveLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.fileSystemAPI.openFileSystemDialog()
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          onChange={(event) => setShowUrl(event.target.value)}
        />
        <button onClick={(e) => chooseSaveLocation(e)}>Choose Save Location</button>
        <button type="submit">Submit</button>
      </form>

      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  );
}
