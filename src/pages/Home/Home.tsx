import React from "react";
import { ArticlesList } from "../../components/ArticlesList/ArticlesList";
import { Box, Container, Grid } from "@mui/material";
import { useGetArticlesQuery } from "../../features/articles/articlesApi";
import { Layout } from "../../components/Layout/Layout";
import { SortingButtons } from "../../components/SortingButtons/SortingButtons";
import { usePaginate } from "../../hooks/usePaginate";
import { NavSidebar } from "../../components/NavSidebar/NavSidebar";
import { Welcome } from "../../components/Welcome/Welcome";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

export const Home: React.FC = () => {
  const { page, sortBy, handleNextPage, handleSortChange } = usePaginate();
  const { data: articles, isLoading } = useGetArticlesQuery({ page, sortBy });

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Layout>
      <Container
        maxWidth="lg"
        sx={{ mt: { xs: 7, md: 9 }, pb: 3, minHeight: "100vh" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              {!user && <Welcome />}
              <NavSidebar />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <SortingButtons
              value={sortBy}
              handleSortChange={handleSortChange}
            />
            <ArticlesList
              articles={articles?.articles}
              isLoading={isLoading}
              articlesCount={articles?._count as number}
              handleNextPage={handleNextPage}
            />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
