import {
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} from "../features/articles/articlesApi";
import { Article } from "../utils/types/articles";
import { useMutationAction } from "./useMutationAction";

export const useFavoriteArticle = (
  article: Article,
): [isFavorite: boolean, toggle: () => Promise<void>, isPending: boolean] => {
  const [favorite, favoriting] = useFavoriteArticleMutation();
  const [unfavorite, unfavoriting] = useUnfavoriteArticleMutation();
  const isFavorite = article.isFavorited ?? false;

  const toggle = useMutationAction(() =>
    (isFavorite ? unfavorite(article.id) : favorite(article.id)).unwrap()
  );

  return [isFavorite, toggle, favoriting.isLoading || unfavoriting.isLoading];
};
