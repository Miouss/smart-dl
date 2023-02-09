import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import StackCentered from "../../styles/components/global/StackCentered";
import {
  ChooseSaveLocationButton,
  SubmitButton,
  SubmitButtonIcon,
  UrlInput,
} from "../../styles/components/specific/Form";

import FolderIcon from "@mui/icons-material/Folder";

import { warningAlert, infoAlert } from "../../utils/Alert";

import { AlertMsg } from "../../../types/AlertMsg";

interface Props {
  setAlertMsg: Dispatch<SetStateAction<AlertMsg>>;
  submited?: boolean;
  withSubmitButton?: boolean;
}

const FormSearchBar = React.forwardRef(
  (
    { setAlertMsg, submited, withSubmitButton }: Props,
    refUrlInput: React.Ref<HTMLInputElement>
  ) => {
    const api = window.fileSystemAPI;

    const [saveLocation, setSaveLocation] = useState<string>();

    const alertMsg = () =>
      saveLocation
        ? setAlertMsg(infoAlert(`Your save location is ${saveLocation}`))
        : setAlertMsg(warningAlert("You didn't choose a save location yet"));

    const chooseSaveLocation = async (e: React.MouseEvent) => {
      e.preventDefault();
      const saveLocationChosen = await api.chooseSaveLocationDialog();

      if (saveLocationChosen) {
        setAlertMsg(infoAlert(`Your save location is ${saveLocationChosen}`));
        setSaveLocation(saveLocationChosen);
      }
    };

    const getSaveLocation = async () => {
      const saveLocationStored = await api.getSaveLocation();
      setSaveLocation(saveLocationStored);
    };

    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      alertMsg();
    };

    useEffect(() => {
      getSaveLocation();
    }, []);

    const handlePaste = async (e: React.MouseEvent<HTMLInputElement>) => {
      e.preventDefault();
      const text = await navigator.clipboard.readText();
      (e.target as HTMLInputElement).value = text;
    };

    return (
      <StackCentered direction={"row"}>
        <UrlInput inputRef={refUrlInput} onContextMenu={handlePaste} />
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
);

export default FormSearchBar;
