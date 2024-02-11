import { Tag } from "./tag";
import { User } from "./user";

export interface Article {
  id: string;
  slug: string;
  title: string;
  body: string;
  tagList: Tag[];
  createdAt: Date;
  updatedAt: Date;
  image: string;
  author: User;
  authorId: string;
  favorited: User[];
  _count: {
    comments: number;
    favorited: number;
  };
}

export interface ArticleData {
  articles: Article[];
  _count: number;
}

export interface ArticlesParams {
  page?: number;
  sortBy?: string;
  tagName?: string;
  authorId?: string;
}

export interface ArticlesResponse {
  articles: Article[];
  _count: {
    articles: number;
  };
}
