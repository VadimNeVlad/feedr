import { useEffect, useMemo, useState } from "react";
import { Article } from "../utils/types/articles";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const useFavoriteArticle = (
  article: Article
): [boolean, (value: boolean) => void] => {
  const [isFavorite, setIsFavorite] = useState(false);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const exists = useMemo(
    () =>
      article.favorited.some((userItem) =>
        currentUser ? userItem.id === currentUser.id : null
      ),
    [article.favorited, currentUser]
  );

  useEffect(() => {
    setIsFavorite(exists);
  }, [exists]);

  return [isFavorite, setIsFavorite];
};
