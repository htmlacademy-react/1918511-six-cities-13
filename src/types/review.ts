export type IReview = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
}

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};
