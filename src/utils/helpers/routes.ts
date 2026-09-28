import { Article } from "../types/articles";

export const articlePath = ({ id, slug }: Pick<Article, "id" | "slug">) =>
  `/articles/${encodeURIComponent(id)}/${encodeURIComponent(slug)}`;

export const userPath = (id: string) => `/user/${encodeURIComponent(id)}`;

export const tagPath = (name: string) => `/tag/${encodeURIComponent(name)}`;
