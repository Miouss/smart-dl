import React, { Dispatch, SetStateAction, useEffect } from "react";

import StackCentered from "../../styles/components/global/StackCentered";
import {
  ChooseSaveLocationButton,
  SubmitButton,
  SubmitButtonIcon,
  UrlInput,
} from "../../styles/components/specific/Form";

import FolderIcon from "@mui/icons-material/Folder";

import { alertMsgOutputPath } from "../../utils/Alert/functions";

import { AlertMsg } from "../../../types/AlertMsg";

interface Props {
  setShowUrl: Dispatch<SetStateAction<string>>;
  setAlertMsg: Dispatch<SetStateAction<AlertMsg>>;
  submited?: boolean;
  withSubmitButton?: boolean;
}

export default function FormSearchBar({
  setShowUrl,
  setAlertMsg,
  submited,
  withSubmitButton,
}: Props) {
  const api = window.fileSystemAPI;

  const chooseSaveLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    api.openFileSystemDialog.fire();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    api.retrieveOutputPath.fire();
  };

  useEffect(() => {
    api.onOutputPathAdded.do(
      (outputPath: string) => {
        setAlertMsg((state) => alertMsgOutputPath(outputPath, state?.trigger));
      }
    );

    api.onOutputPathRetrieved.do(
      (outputPath?: string) => {
        setAlertMsg((state) => alertMsgOutputPath(outputPath, state?.trigger));
      }
    );

    return () => {
      api.onOutputPathAdded.removeAllListeners();
      api.onOutputPathRetrieved.removeAllListeners();
    };
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
      {withSubmitButton && (
        <SubmitButton>
          <SubmitButtonIcon submited={submited} />
        </SubmitButton>
      )}
    </StackCentered>
  );
}
