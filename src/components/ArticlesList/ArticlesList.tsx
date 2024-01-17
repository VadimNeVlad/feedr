import React from "react";
import { ArticleItem } from "../ArticleItem/ArticleItem";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ArticleListProps } from "../../utils/types/props";

export const ArticlesList: React.FC<ArticleListProps> = ({
  articles,
  isLoading,
  isSuccess,
  isError,
}) => {
  return (
    <>
      {isLoading && (
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

      {!isLoading &&
        isSuccess &&
        articles &&
        (articles.length > 0 ? (
          articles.map((article) => (
            <ArticleItem article={article} key={article.id} />
          ))
        ) : (
          <div>No articles found</div>
        ))}

      {!isLoading && isError && (
        <Typography variant="h3" sx={{ textAlign: "center" }} fontWeight={700}>
          Something went wrong! Please try again later
        </Typography>
      )}
    </>
  );
};
