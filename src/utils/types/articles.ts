import { Tag } from "./tag";
import { User } from "./user";

export interface Article {
  id?: string;
  slug: string;
  title: string;
  body: string;
  tagList: Tag[];
  createdAt: Date;
  updatedAt: Date;
  favoritesCount: number;
  author: User;
  authorId: string;
  favorited: User[];
  commentsCount: number;
}

export interface ArticleData {
  title: string;
  body: string;
  tagList: Tag[];
}

export interface UpdateArticleData {
  slug: string;
  title: string;
  body: string;
}
