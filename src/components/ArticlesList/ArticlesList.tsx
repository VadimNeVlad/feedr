import React, { useEffect } from "react";
import { useGetArticlesQuery } from "../../features/articles/articlesApi";
import { ArticleItem } from "../ArticleItem/ArticleItem";
import { ToastContainer, toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Typography } from "@mui/material";

export const Articles: React.FC = () => {
  const { data: articles, isLoading, isSuccess, error } = useGetArticlesQuery();

  useEffect(() => {
    if (error) {
      const err = (error as FetchBaseQueryError).data as Error;
      toast.error(err?.message);
    }
  }, [error]);

  return (
    <>
      {isLoading && <div>Loading...</div>}

      {!isLoading &&
        isSuccess &&
        (articles.length > 0 ? (
          articles.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))
        ) : (
          <div>No articles found</div>
        ))}

      {!isLoading && error && (
        <Typography variant="h3" sx={{ textAlign: "center" }} fontWeight={700}>
          Something went wrong! Please try again later
        </Typography>
      )}

      <ToastContainer />
    </>
  );
};
