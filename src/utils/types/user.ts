export interface User {
  id: string;
  email?: string;
  name: string;
  bio?: string;
  image?: string;
  location?: string;
  websiteUrl?: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  isFollowing?: boolean;
  _count: {
    articles: number;
    comments: number;
    followers?: number;
    following?: number;
  };
}
export type UserSummary = Pick<
  User,
  "id" | "name" | "image" | "bio" | "createdAt"
>;
export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
