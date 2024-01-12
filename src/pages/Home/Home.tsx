import React, { useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { ArticlesList } from "../../components/ArticlesList/ArticlesList";
import { Container } from "@mui/material";
import { useGetArticlesQuery } from "../../features/articles/articlesApi";
import { ToastContainer, toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const Home: React.FC = () => {
  const { data: articles, isLoading, isSuccess, error } = useGetArticlesQuery();

  useEffect(() => {
    if (error) {
      const err = (error as FetchBaseQueryError).data as Error;
      toast.error(err?.message);
    }
  }, [error]);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 12 }}>
        <ArticlesList
          articles={articles}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={!!error}
        />
        <ToastContainer />
      </Container>
    </>
  );
};
