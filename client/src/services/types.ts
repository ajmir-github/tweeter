export type Notification = {
  id: string;
  type: NotificationType;
  message?: string;
  read: boolean;
  createdAt: string;
};

export type NotificationType = "LIKE" | "FOLLOW" | "REPLY" | "MENTION";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

export type Tweet = {
  id: string;
  content: string;
  images: string[];
  videos?: string;
  hashtags: string[];
  createdAt: string;
  updatedAt: string;
};
