export type Notification = {
  id: string;
  type: NotificationType;
  message?: string;
  read: boolean;
  createdAt: string;
};

export type NotificationType = "LIKE" | "FOLLOW" | "REPLY" | "MENTION";

export type User = {
  name: string;
  email: string;
  password: string;
  id: string;
  bio: string | null;
  avatarURL: string | null;
  createdAt: string;
  updatedAt: string;
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
