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
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
  articles: Article[];
  favorites: Article[];
  following: Follow[];
  followers: Follow[];
}
