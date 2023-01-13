import React, { Dispatch, SetStateAction } from "react";
import {
  ChooseSaveLocationButton,
  StackCentered,
  SubmitButton,
  SubmitButtonIcon,
  UrlInput,
} from "./StyledComponents";

import FolderIcon from "@mui/icons-material/Folder";

import { AlertMsg } from "../../../types/AlertMsg";

interface Props {
  setShowUrl: Dispatch<SetStateAction<string>>;
  setAlertMsg: Dispatch<SetStateAction<AlertMsg>>;
  submited?: boolean;
  withSubmit?: boolean;
}

export default function UrlInputBox({
  setShowUrl,
  setAlertMsg,
  submited,
  withSubmit,
}: Props) {
  const chooseSaveLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    window.fileSystemAPI.openFileSystemDialog();
  };

  return (
    <StackCentered direction={"row"}>
      <UrlInput onChange={(event) => setShowUrl(event.target.value)} />
      <ChooseSaveLocationButton
        onClick={(e) => chooseSaveLocation(e)}
        onContextMenu={() =>
          setAlertMsg({
            severity: "info",
            message: "Your save location is : 'C:/Users/Miouss/Desktop/'",
          })
        }
      >
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
