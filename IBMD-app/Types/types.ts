export type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

export type MovieShow = {
  id: string;
  title: string;
  year?: string;
  image: string;
}
export type CastMember = {
  id: string;
  name: string;
  image: string;
}

export type MovieItem = {
  id: string;
  title: string;
  image: string;
  isSelected?: boolean;
  backgroundColor?: string;
}

export type MovieItem1 = {
  id: string;
  title: string;
  image: string;
}

export type ReviewItem = {
  id: string;
  userName: string;
  userImage: string;
  review: string;
  rating: string;
}

export type NotificationItem = {
  id: string;
  title: string;
  timeAgo: string;
  image: string;
  iconType: 'video' | 'image' | 'file' | 'clock' | 'heart';
}

export type ReviewItem1 = {
  id: string;
  userName: string;
  userImage: string;
  review: string;
  rating: string;
}