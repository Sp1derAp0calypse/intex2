export interface ContentRecommend {
  ifYouLiked: string;
  recommendations: {
    title: string;
    posterUrl: string;
  }[];
}
