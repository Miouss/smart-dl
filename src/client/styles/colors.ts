export const CardColor = rgb(51, 51, 51);
export const CardMediaBoxColor = rgb(189, 189, 189);

export const HomeButtonColor = rgbWithHover(79, 79, 79);
export const HomeButtonIconColor = rgb(255, 255, 255);
export const RetryButtonColor = rgbWithHover(208, 2, 27);
export const CancelButtonColor = rgbWithHover(208, 2, 27);
export const DownloadButtonColor = rgbWithHover(39, 184, 71);
export const DownloadDisabledButtonColor = rgb(255, 165, 0);
export const DownloadDisabledButtonIconColor = rgb(255, 255, 255);

export const SubmitButtonColor = rgbWithHover(46, 125, 50);
export const SubmitButtonIconColor = {
  active: rgb(255, 255, 255),
  waiting: rgb(255, 255, 255),
};

export const ChooseSaveLocationButtonColor = {
  normal: rgb(79, 79, 79),
  hover: rgb(208, 2, 27),
};
export const ChooseSaveLocationButtonIconColor = rgb(255, 255, 255);

export const PasswordBoxColor  = {
  borderBottom: rgb(208, 2, 27),
  boxShadow: rgba(208, 2, 27, 0.25),
}

export const TabsIndicatorColor = rgb(208, 2, 27);
export const TabPanelColor = rgb(242, 242, 242);
export const TabColor = rgb(242, 242, 242)
export const TabDisabledColor = rgb(128, 128, 128);

export const TaskLabelWaitingColor = rgb(255, 255, 255);
export const TaskLabelActiveColor = rgb(255, 165, 0);
export const TaskLabelDoneColor = rgb(0, 128, 0);

export const SelectButonColor = rgb(79, 79, 79);
export const SelectButonBgColor = rgb(208, 2, 27);

export const VodTitleColor = rgb(242, 242, 242);
export const VodDescriptionColor = rgb(242, 242, 242);

export const PasswordVisibilityIconColor = rgb(255, 255, 255);

export const MUIInputColor = {
  normal: rgb(255, 255, 255),
  placeholder: rgb(130, 130, 130),
  borderBottom: rgb(208, 2, 27),
  boxShadow: rgba(208, 2, 27, 0.25),
};

export const MUISwitchColor = {
  checked: rgb(0, 255, 0),
  unchecked: rgb(255, 255, 255),
  thumb: rgb(255, 255, 255),
};

export const MUIStepConnectorColor = {
  active: rgb(46, 125, 50),
  done: rgb(46, 125, 50),
  waiting: rgb(255, 255, 255),
};

export const MUIStepIconContainerColor = {
  bg: rgb(51, 51, 51),
  border: rgb(255, 255, 255),
  active: {
    border: rgb(46, 125, 50),
  },
  done: {
    bg: rgb(0, 128, 0),
    border: rgb(46, 125, 50),
  },
};

export const MUIStepLabelIconColor = rgb(255, 255, 255);

export const MUIStepLabelColor = {
  waiting: rgb(255, 255, 255),
  active: rgb(255, 255, 255),
  done: rgb(255, 255, 255),
};

export const MUIFormControlLabelColor = rgb(224, 224, 224);

// UTILS

function rgbWithHover(red: number, green: number, blue: number) {
  checkColors(red, green, blue);
  return {
    normal: `rgba(${red},${green},${blue}, 1)`,
    hover: `rgba(${red},${green},${blue}, 0.7)`,
  };
}

function rgb(red: number, green: number, blue: number) {
  checkColors(red, green, blue);
  return `rgba(${red},${green},${blue}, 1)`;
}

function rgba(red: number, green: number, blue: number, opacity: number) {
  checkColors(red, green, blue, opacity);
  return `rgba(${red},${green},${blue}, ${opacity})`;
}

function checkColors(
  red: number,
  green: number,
  blue: number,
  opacity?: number
) {
  if ((red | green | blue) < 0 || (red | green | blue) > 255)
    throw new Error("color value should be between 0 and 255");

  if (opacity < 0 || opacity > 1)
    throw new Error("opacity value should be between 0 and 1");
}
