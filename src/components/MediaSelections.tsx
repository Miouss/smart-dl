import React from "react";

interface Props {
  mediaChoices: MediaChoices;
}

interface MediaChoices {
  VideoSelection: Array<VideoSelection>;
  AudioSelection: Array<any>;
  prefix: string;
  vodTitle?: string;
}

interface VideoSelection {
  resolution: string;
  "Average-Bandwidth": string;
  audio: string;
  url: string;
}

export default function MediaSelection(mediaChoices: Props): any {
  if (mediaChoices === null) {
    return null;
  }

  return (
    <div>
      <pre>{JSON.stringify(mediaChoices, null, 2)}</pre>
    </div>
  );
}
