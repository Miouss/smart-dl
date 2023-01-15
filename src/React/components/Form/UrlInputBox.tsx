import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  ChooseSaveLocationButton,
  StackCentered,
  SubmitButton,
  SubmitButtonIcon,
  UrlInput,
} from "./StyledComponents";

import FolderIcon from "@mui/icons-material/Folder";

import { AlertMsg } from "../../../types/AlertMsg";
import { alertMsgOutputPath } from "../../utils/alertMsg";

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

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    window.fileSystemAPI.retrieveOutputPath();
  };

  useEffect(() => {
    const onOutputPathAdded = window.fileSystemAPI.onOutputPathAdded(
      (_: unknown, outputPath: string) => {
        setAlertMsg((state) => alertMsgOutputPath(outputPath, state?.trigger));
      }
    );

    const onOutputPathRetrieved = window.fileSystemAPI.onOutputPathRetrieved(
      (_: unknown, outputPath?: string) => {
       setAlertMsg((state) => alertMsgOutputPath(outputPath, state?.trigger))
      }
    );

    return () => {
      onOutputPathAdded;
      onOutputPathRetrieved;
    }
  }, []);

  return (
    <StackCentered direction={"row"}>
      <UrlInput onChange={(event) => setShowUrl(event.target.value)} />
      <ChooseSaveLocationButton
        onClick={chooseSaveLocation}
        onContextMenu={handleContextMenu}
      >
        <FolderIcon />
      </ChooseSaveLocationButton>
      {withSubmit && (
        <SubmitButton>
          <SubmitButtonIcon submited={submited} />
        </SubmitButton>
      )}
    </StackCentered>
  );
}
