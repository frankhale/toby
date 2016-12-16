
export interface IVideoGroup {
  group: string;
  entries: IVideoEntry[];
}

export interface IVideoEntry {
  title: string;
  ytid: string;
  group?: string;
  isArchived?: boolean;
}

export interface ITobyVersionInfo {
  title: string,
  version: string
}

export interface ISearchResults {
  playVideo: (video: IVideoEntry, data: IVideoGroup[]) => void,
  title: string,
  ytid: string,
  group: string,
  thumbnail: string,
  isArchived: boolean  
}