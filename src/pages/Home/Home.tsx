import React, { useEffect, useState } from "react";
import { ArticlesList } from "../../components/ArticlesList/ArticlesList";
import { Container, Grid } from "@mui/material";
import { useGetArticlesQuery } from "../../features/articles/articlesApi";
import { Layout } from "../../components/Layout/Layout";
import { SortingButtons } from "../../components/SortingButtons/SortingButtons";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);

  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "latest");
  const [customFetching, setCustomFetching] = useState(true);

  const { data: articles, status } = useGetArticlesQuery({ page, sortBy });

  useEffect(() => {
    if (status === "fulfilled") {
      setCustomFetching(false);
    }
    if (status === "pending" && page === 0) {
      setCustomFetching(true);
    }
  }, [status, page]);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handleSortChange = (value: string) => {
    setPage(0);
    setSortBy(value);
    navigate(value === "latest" ? "/" : `/?sortBy=${value}`);
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 9, pb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <h1>Hello</h1>
            <h2>hi</h2>
          </Grid>
          <Grid item xs={9}>
            <SortingButtons
              value={sortBy}
              handleSortChange={handleSortChange}
            />
            <ArticlesList
              articles={articles}
              articlesCount={articles?.length}
              isLoading={customFetching}
              handleNextPage={handleNextPage}
            />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
