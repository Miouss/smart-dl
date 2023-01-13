import React, { Dispatch, SetStateAction } from "react";
import {
  ChooseSaveLocationButton,
  StackCentered,
  SubmitButton,
  SubmitButtonIcon,
  UrlInput,
} from "./StyledComponents";

import FolderIcon from "@mui/icons-material/Folder";

interface Props {
  setShowUrl: Dispatch<SetStateAction<string>>;
  submited?: boolean;
  withSubmit?: boolean;
}

export default function UrlInputBox({ setShowUrl, submited, withSubmit }: Props) {
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
      {withSubmit && (
        <SubmitButton>
          <SubmitButtonIcon submited={submited} />
        </SubmitButton>
      )}
    </StackCentered>
  );
}
