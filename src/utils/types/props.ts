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
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  handleChange: () => void;
}

export interface ArticleItemProps {
  article: Article;
}

export interface UserDropdownProps {
  id: string;
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
  uid: string;
}

export interface ArticleReactionsProps {
  article: Article;
  handleScroll: () => void;
}

export interface ArticleAuthorProps {
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

export interface ModalProps {
  open: boolean;
  title: string;
  isDeleting?: boolean;
  children: React.ReactNode;
  handleClose: () => void;
  deleteAction?: () => void;
}

export interface ImagePreviewProps {
  preview: string;
  fileRef: React.RefObject<HTMLInputElement>;
  handlePreview: (e: React.ChangeEvent) => void;
  handleClearPreview: () => void;
}

export interface ProfileContentProps {
  user: User;
}
