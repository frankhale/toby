
declare namespace search {
  export interface YouTubeSearchOptions {
    fields?: string;
    channelId?: string;
    channelType?: string;
    eventType?: string;
    forContentOwner?: boolean;
    forDeveloper?: boolean;
    forMine?: boolean;
    location?: string;
    locationRadius?: string;
    maxResults?: number;
    onBehalfOfContentOwner?: string;
    order?: string;
    part?: string;
    pageToken?: string;
    publishedAfter?: string;
    publishedBefore?: string;
    regionCode?: string;
    relatedToVideoId?: string;
    relevanceLanguage?: string;
    safeSearch?: string;
    topicId?: string;
    type?: string;
    videoCaption?: string;
    videoCategoryId?: string;
    videoDefinition?: string;
    videoDimension?: string;
    videoDuration?: string;
    videoEmbeddable?: string;
    videoLicense?: string;
    videoSyndicated?: string;
    videoType?: string;
    key?: string;
  }

  export interface YouTubeSearchResults {
    id: string;
    link: string;
    kind: string;
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: string;
  }

  export interface YouTubeSearchPageResults {
    totalResults: number;
    resultsPerPage: number;
    nextPageToken: string;
    prevPageToken: string;
  }
}

declare function search(
  term: string,
  opts: search.YouTubeSearchOptions,
  cb: (err: Error, result?: search.YouTubeSearchResults[], pageInfo?: search.YouTubeSearchPageResults) => void
): (err: Error, result?: search.YouTubeSearchResults[], pageInfo?: search.YouTubeSearchPageResults) => void;

export = search;
