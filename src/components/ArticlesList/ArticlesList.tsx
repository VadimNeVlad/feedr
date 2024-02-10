import React from "react";
import { ArticleItem } from "../ArticleItem/ArticleItem";
import { LinearProgress } from "@mui/material";
import { ArticleListProps } from "../../utils/types/props";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArticlesListSkeleton } from "../Skeletons/ArticlesListSkeleton/ArticlesListSkeleton";
import { NoResultMessage } from "../NoResultMessage/NoResultMessage";

export const ArticlesList: React.FC<ArticleListProps> = ({
  articles,
  articlesCount,
  isFetching,
  handleNextPage,
}) => {
  return (
    <>
      {isFetching && <ArticlesListSkeleton />}

      {!isFetching && articles && (
        <>
          <InfiniteScroll
            dataLength={articlesCount}
            next={handleNextPage!}
            hasMore={!!(articles.length % 10 === 0)}
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
        </>
      )}
    </>
  );
};
