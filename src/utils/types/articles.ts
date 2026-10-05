import { Tag } from "./tag";
import { UserSummary } from "./user";

export interface Article {
  id: string;
  slug: string;
  title: string;
  body: string;
  tagList: Tag[];
  createdAt: string | Date;
  updatedAt: string | Date;
  image: string;
  author: UserSummary;
  authorId: string;
  isFavorited: boolean;
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
  q?: string;
}

export interface ArticlesResponse {
  articles: Article[];
  _count: {
    articles: number;
  };
}
