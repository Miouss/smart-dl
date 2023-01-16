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
        setAlertMsg((state) => alertMsgOutputPath(outputPath, state?.trigger));
      }
    );

    return () => {
      onOutputPathAdded;
      onOutputPathRetrieved;
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
