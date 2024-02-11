import { useMemo, useState } from "react";
import { Article } from "../utils/types/articles";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const useFavoriteArticle = (
  article: Article
): [boolean, (value: boolean) => void] => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const isCurrentUserFavorited = useMemo(
    () =>
      article.favorited.some((userItem) =>
        currentUser ? userItem.id === currentUser.id : null
      ),
    [article.favorited, currentUser]
  );

  const [isFavorite, setIsFavorite] = useState(isCurrentUserFavorited);

  return [isFavorite, setIsFavorite];
};
