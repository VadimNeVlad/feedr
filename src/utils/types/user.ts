import { Article } from "./articles";
import { Follow } from "./follow";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  bio: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  articles: Article[];
  favorites: Article[];
  following: Follow[];
  followers: Follow[];
}
