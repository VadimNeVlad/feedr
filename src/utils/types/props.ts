import { BaseSyntheticEvent } from "react";
import { Article } from "./articles";
import { Editor } from "@tiptap/react";
import { Comment } from "./comment";
import { User } from "./user";

export interface AuthFormProps {
  title: string;
  text: string;
  isPending: boolean;
  onSubmit: (data: BaseSyntheticEvent) => void;
}

export interface ArticleListProps {
  articles: Article[] | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface ArticleItemProps {
  article: Article;
}

export interface UserDropdownProps {
  userName: string;
}

export interface EditorToolbarProps {
  editor: Editor;
}

export interface EditorProps {
  content: string;
  showToolbar: boolean;
  isEditable: boolean;
  setContent?: (content: string) => void;
}

export interface ArticleContentProps {
  article: Article;
}

export interface ArticleReactionsProps {
  article: Article;
  handleScroll: () => void;
}

export interface ArticleUserProps {
  author: User;
  isFetching: boolean;
}

export interface CommentItemProps {
  comment: Comment;
}

export interface CommentFormProps {
  articleId: string;
  isFetching: boolean;
}
