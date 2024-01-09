import { Tag } from "./tag";
import { User } from "./user";

export interface Article {
  id?: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: Tag[];
  createdAt: Date;
  updatedAt: Date;
  favoritesCount: number;
  author: User;
  authorId: string;
  favorited: User[];
}
