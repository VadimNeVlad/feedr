import React from "react";
import { ArticleItem } from "../ArticleItem/ArticleItem";
import { Box, LinearProgress } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ArticleListProps } from "../../utils/types/props";
import InfiniteScroll from "react-infinite-scroll-component";

export const ArticlesList: React.FC<ArticleListProps> = ({
  articles,
  isLoading,
  isFetching,
  handleChange,
}) => {
  return (
    <>
      {(isLoading || isFetching) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 112px)",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && articles && (
        <InfiniteScroll
          dataLength={articles.length}
          next={handleChange!}
          hasMore={articles.length === 10}
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
