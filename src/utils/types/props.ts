import { BaseSyntheticEvent } from "react";
import { Article } from "./articles";
import { Editor } from "@tiptap/react";
import { Comment } from "./comment";
import { User } from "./user";
import { Follow } from "./follow";
import { Control } from "react-hook-form";

export interface LayoutProps {
  children: React.ReactNode;
}

export interface AuthFormProps {
  title: string;
  text: string;
  isPending: boolean;
  onSubmit: (data: BaseSyntheticEvent) => void;
}

export interface ArticleListProps {
  articles: Article[] | undefined;
  isLoading?: boolean;
  articlesCount?: number;
  handleNextPage?: () => void;
}

export interface ArticleItemProps {
  article: Article;
}

export interface UserDropdownProps {
  id: string;
  userName: string;
  avatar?: string;
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

export interface ArticleAuthorProps {
  author: User;
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
  handlePreview: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearPreview: () => void;
}

export interface ProfileContentProps {
  user: User;
}

export interface ProfileCountInfoProps {
  commentsCount: number;
  articlesCount: number;
}

export interface AvatarPreviewProps {
  userName: string;
  userId: string;
  avatar?: string;
}

export interface FollowingListProps {
  followType: Follow[] | undefined;
  listType: "followers" | "followings";
  id?: string;
  size?: "sm" | "lg";
  isLoading?: boolean;
}

export interface FollowingItemProps {
  followTypeUser: User;
  size?: "sm" | "lg";
  setFollowingCount: (count: React.SetStateAction<number | undefined>) => void;
}

export interface TagsAutocompleteProps {
  control: Control<any>;
  defaultValues?: string[];
  disabled?: boolean;
  setTags?: (tags: React.SetStateAction<string>) => void;
}

export interface SortingButtonsProps {
  value: string;
  handleSortChange: (value: string) => void;
}

export interface ArticleActionsProps {
  articleId: string;
  deleteArticleSuccess: boolean;
  isDeleting: boolean;
  setOpen: () => void;
}
