import React, { Dispatch, SetStateAction } from "react";
import {
  ChooseSaveLocationButton,
  StackCentered,
  SubmitButton,
  UrlInput,
} from "./StyledComponents";

import FolderIcon from "@mui/icons-material/Folder";

interface Props {
  setShowUrl: Dispatch<SetStateAction<string>>;
  submit?: boolean;
}

export default function UrlInputBox({ setShowUrl, submit }: Props) {
  const chooseSaveLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.fileSystemAPI.openFileSystemDialog();
  };

  return (
    <StackCentered direction={"row"}>
      <UrlInput onChange={(event) => setShowUrl(event.target.value)} />
      <ChooseSaveLocationButton onClick={(e) => chooseSaveLocation(e)}>
        <FolderIcon style={{ color: "#fff" }} />
      </ChooseSaveLocationButton>
      {submit && <SubmitButton />}
    </StackCentered>
  );
}
