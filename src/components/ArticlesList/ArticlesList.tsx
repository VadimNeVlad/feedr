import React from "react";
import { ArticleItem } from "../ArticleItem/ArticleItem";
import { LinearProgress } from "@mui/material";
import { ArticleListProps } from "../../utils/types/props";
import InfiniteScroll from "react-infinite-scroll-component";
import { ArticlesListSkeleton } from "../Skeletons/ArticlesListSkeleton/ArticlesListSkeleton";

export const ArticlesList: React.FC<ArticleListProps> = ({
  articles,
  articlesCount,
  isLoading,
  handleNextPage,
}) => {
  return (
    <>
      {isLoading && <ArticlesListSkeleton />}

      {!isLoading && articles && (
        <InfiniteScroll
          dataLength={articlesCount || articles.length}
          next={handleNextPage!}
          hasMore={articlesCount === 10}
          loader={<LinearProgress />}
        >
          {articles.length > 0 ? (
            articles.map((article) => (
              <ArticleItem key={article.id} article={article} />
            ))
          ) : (
            <div>No articles yet</div>
          )}
        </InfiniteScroll>
      )}
    </>
  );
};
