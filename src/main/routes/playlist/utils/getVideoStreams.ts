export function getVideoStreams(parser: any) {
    const videoSelection: any = [];
  
    const videoManifest = parser.manifest.playlists;
  
    videoManifest.forEach((element: any) => {
      const { attributes, uri } = element;
      const { width, height } = attributes.RESOLUTION;
  
      videoSelection.push({
        resolution: `${width}x${height}`,
        "Average-Bandwidth": attributes["AVERAGE-BANDWIDTH"].slice(0, -2),
        audio: attributes.AUDIO,
        url: uri,
      });
    });
  
    sortVideoSelection(videoSelection);
  
    return videoSelection;
  }
  
  function sortVideoSelection(videoSelection: any) {
    videoSelection.sort((a: any, b: any) => {
      return parseInt(a["Average-Bandwidth"]) >= parseInt(b["Average-Bandwidth"])
        ? -1
        : 1;
    });
  }