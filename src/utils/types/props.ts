import { BaseSyntheticEvent } from "react";
import { Article } from "./articles";
import { Editor } from "@tiptap/react";

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
  setContent: (content: string) => void;
}
