import React, { useEffect, useState } from "react";
import { ArticlesList } from "../../components/ArticlesList/ArticlesList";
import { Container, Grid } from "@mui/material";
import { useGetArticlesQuery } from "../../features/articles/articlesApi";
import { Layout } from "../../components/Layout/Layout";
import { SortingButtons } from "../../components/SortingButtons/SortingButtons";
import { usePaginate } from "../../utils/types/usePaginate";

export const Home: React.FC = () => {
  const [customFetching, setCustomFetching] = useState(true);

  const { page, sortBy, handleNextPage, handleSortChange } = usePaginate();

  const { data: articles, status } = useGetArticlesQuery({ page, sortBy });

  useEffect(() => {
    if (status === "fulfilled") setCustomFetching(false);
    if (status === "pending" && page === 0) setCustomFetching(true);
  }, [status, page]);

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
              articlesCount={articles?.length as number}
              isFetching={customFetching}
              handleNextPage={handleNextPage}
            />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
