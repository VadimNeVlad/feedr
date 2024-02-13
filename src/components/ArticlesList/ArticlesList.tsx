import React from "react";
import { ArticleItem } from "../ArticleItem/ArticleItem";
import { Box, LinearProgress } from "@mui/material";
import { ArticleListProps } from "../../utils/types/props";
import InfiniteScroll from "react-infinite-scroll-component";
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
  return (
    <>
      {isLoading && <ArticlesListSkeleton />}

      {!isLoading && articles && articlesCount && (
        <>
          <InfiniteScroll
            dataLength={articlesCount}
            onScroll={
              inView && articles.length < articlesCount
                ? handleNextPage
                : undefined
            }
            next={handleNextPage!}
            hasMore={articles.length < articlesCount}
            loader={<LinearProgress />}
          >
            {articles.length > 0 ? (
              articles.map((article) => (
                <ArticleItem key={article.id} article={article} />
              ))
            ) : (
              <NoResultMessage msg="There are no articles yet" />
            )}
          </InfiniteScroll>
          <Box ref={ref}></Box>
        </>
      )}
    </>
  );
};
