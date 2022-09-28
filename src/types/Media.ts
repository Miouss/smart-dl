interface Media {
  VideoSelection: Array<VideoSelection>;
  AudioSelection: Record<string, AudioSelection>;
  prefix: string;
  thumbnail?: string;
  title?: string;
  description?: string;
}

interface VideoSelection {
  resolution: string;
  "Average-Bandwidth": string;
  audio: string;
  url: string;
}

interface AudioSelection {
  [key: string]: Record<string, LangSelection>;
}

interface LangSelection {
  [key: string]: {
    lang: string;
    url: string;
  };
}

export { Media, VideoSelection, AudioSelection, LangSelection };
