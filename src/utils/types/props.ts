import { BaseSyntheticEvent } from "react";
import { Article } from "./articles";

export interface AuthFormProps {
  title: string;
  text: string;
  isPending: boolean;
  onSubmit: (data: BaseSyntheticEvent) => void;
}

export interface ArticleItemProps {
  article: Article;
}
