export function getAudioStreams(parser: any) {
  const audioSelection: any = {};

  const { AUDIO } = parser.manifest.mediaGroups;

  const audioQualities = Object.keys(AUDIO);

  audioQualities.forEach((audioQuality) => {
    audioSelection[audioQuality] = {};

    const params = Object.keys(AUDIO[audioQuality]);

    params.forEach((param) => {
      const { language, uri } = AUDIO[audioQuality][param];

      audioSelection[audioQuality][param] = {
        lang: language,
        url: uri,
      };
    });
  });

  return audioSelection;
}
