import React from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { Container, Grid, Typography } from "@mui/material";
import { ArticlesList } from "../../components/ArticlesList/ArticlesList";
import { useGetArticlesQuery } from "../../features/articles/articlesApi";
import { usePaginate } from "../../hooks/usePaginate";
import { NoResultMessage } from "../../components/NoResultMessage/NoResultMessage";

export const Search: React.FC = () => {
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search).get("q");

  const { page, sortBy, handleNextPage } = usePaginate();
  const { data, isLoading, isFetching } = useGetArticlesQuery(
    {
      page,
      sortBy,
      q: searchParam as string,
    },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 9, pb: 3, minHeight: "100vh" }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
          Search results for {searchParam}
        </Typography>
        {!isLoading && data?._count === 0 ? (
          <NoResultMessage msg="No results match that query" />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
              <ArticlesList
                articles={data?.articles}
                isLoading={isFetching}
                articlesCount={data?._count as number}
                handleNextPage={handleNextPage}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
};
