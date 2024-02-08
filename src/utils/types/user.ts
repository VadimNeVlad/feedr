import { Article } from "./articles";
import { Follow } from "./follow";

export interface User {
  id: string;
  email: string;
  name: string;
  bio?: string;
  image?: string;
  location?: string;
  websiteUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  articles: Article[];
  favorites: Article[];
  following: Follow[];
  followers: Follow[];
  _count: {
    articles: number;
    comments: number;
  };
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
