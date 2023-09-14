interface IActionsButton {
  slimMetadataToggleButtonRenderer: {
    isLike: boolean;
    likeStatus: string;
    likeStatusEntityKey: string;
  };
}
interface ITitle {
  simpleText: string;
  accessibility: {
    accessibilityData: {
      label: string;
    };
  };
}

interface IThumbnail {
  thumbnails: Array<{
    height: number;
    width: number;
    url: string;
  }>;
}

interface IThumbnailOverlayResumeRenderer {
  thumbnailOverlayResumePlaybackRenderer: {
    percentDurationWatched: number;
  };
}

interface IThumbnailOverlayTimeStatusRenderer {
  thumbnailOverlayTimeStatusRenderer: {
    style: string;
    text: {
      simpleText: string;
    };
  };
}

interface IThumbnailOverlayNowPlayingRenderer {
  thumbnailOverlayNowPlayingRenderer: {
    text: {
      runs: Array<unknown>;
    };
  };
}

export interface IPlayListItem {
  title: ITitle;
  playlistSetVideoId: string;
  videoId: string;
  trackingParams: string;

  playlistPanelVideoRenderer: {
    actionButtons: Array<IActionsButton>;
  };
  thumbnailOverlays: Array<
    IThumbnailOverlayResumeRenderer &
      IThumbnailOverlayTimeStatusRenderer &
      IThumbnailOverlayNowPlayingRenderer
  >;
  thumbnail: IThumbnail;
}

export type IPlayList = Array<{
  playlistPanelVideoRenderer: IPlayListItem;
}>;
