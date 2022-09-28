import React from "react";
import MediaSelectionCard from "./MediaSelectionCard";

import { Media } from "../types/Media";

export default function MediaSelection({ ...data }: Media) {
  const numberOfCards = Object.keys(data).length;

  if (numberOfCards === 0) return null;

  return (
    <>
      <MediaSelectionCard {...data} />
    </>
  );
}
