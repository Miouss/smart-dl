import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  MouseEvent,
  forwardRef,
  Ref,
} from "react";

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

const api = window.fileSystemAPI;

const FormSearchBar = forwardRef(
  (
    { setAlertMsg, submited, withSubmitButton }: Props,
    refUrlInput: Ref<HTMLInputElement>
  ) => {
    const [saveLocation, setSaveLocation] = useState<string>();

    const alertMsg = () =>
      saveLocation
        ? setAlertMsg(infoAlert(`Your save location is ${saveLocation}`))
        : setAlertMsg(warningAlert("You didn't choose a save location yet"));

    const chooseSaveLocation = async (e: MouseEvent) => {
      e.preventDefault();
      const saveLocationChosen = await api.chooseSaveLocationDialog();

      if (saveLocationChosen) {
        setAlertMsg(infoAlert(`Your save location is ${saveLocationChosen}`));
        setSaveLocation(saveLocationChosen);
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      alertMsg();
    };

    const handlePaste = async (e: MouseEvent<HTMLInputElement>) => {
      e.preventDefault();
      const text = await navigator.clipboard.readText();
      (e.target as HTMLInputElement).value = text;
    };

    useSavedLocation(setSaveLocation);

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

function useSavedLocation(
  setSaveLocation: Dispatch<SetStateAction<string | undefined>>
) {
  useEffect(() => {
    const getSaveLocation = async () => {
      const saveLocationStored = await api.getSaveLocation();
      setSaveLocation(saveLocationStored);
    };

    getSaveLocation();
  }, []);
}

export default FormSearchBar;
