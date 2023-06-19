interface Streams {
  video: Array<VideoSelection>;
  audio: Record<string, AudioSelection>;
  prefix: string;
}

interface Media {
  streams: Streams;
  AudioSelection: Record<string, AudioSelection>;
  thumbnail?: string;
  title?: string;
  description?: string;
  domain?: string;
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

interface MediaUrls {
  audio?: string;
  video?: string;
}

interface MediaFetched {
  audio?: string;
  video?: string;
  selected?: boolean;
}

interface MediaDetails {
  lang?: string;
  resolution?: string;
}

export {
  Media,
  VideoSelection,
  AudioSelection,
  LangSelection,
  MediaUrls,
  MediaDetails,
  MediaFetched,
};
