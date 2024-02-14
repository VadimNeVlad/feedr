import React, { useEffect } from "react";
import { ArticleItem } from "../ArticleItem/ArticleItem";
import { Box, LinearProgress } from "@mui/material";
import { ArticleListProps } from "../../utils/types/props";
import { ArticlesListSkeleton } from "../Skeletons/ArticlesListSkeleton/ArticlesListSkeleton";
import { NoResultMessage } from "../NoResultMessage/NoResultMessage";
import { useInView } from "react-intersection-observer";

export const ArticlesList: React.FC<ArticleListProps> = ({
  articles,
  articlesCount,
  isLoading,
  handleNextPage,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (
      inView &&
      articlesCount &&
      articles &&
      articles.length < articlesCount
    ) {
      handleNextPage?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      {isLoading && <ArticlesListSkeleton />}

      {!isLoading && articles && articlesCount && (
        <>
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleItem key={article.title} article={article} />
            ))
          ) : (
            <NoResultMessage msg="There are no articles yet" />
          )}

          {articles.length < articlesCount && (
            <Box ref={ref}>
              <LinearProgress />
            </Box>
          )}
        </>
      )}
    </>
  );
};
