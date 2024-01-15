import { Article } from "./articles";
import { User } from "./user";

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  articleId: string;
  author: User;
  article: Article;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentData {
  articleId: string;
  content: string;
}
