
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
