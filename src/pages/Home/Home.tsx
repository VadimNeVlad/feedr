import React, { useState } from "react";
import { ArticlesList } from "../../components/ArticlesList/ArticlesList";
import { Button, Container, Stack } from "@mui/material";
import { useGetArticlesQuery } from "../../features/articles/articlesApi";
import { Layout } from "../../components/Layout/Layout";

export const Home: React.FC = () => {
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("Latest");
  const {
    data: articles,
    isLoading,
    isFetching,
  } = useGetArticlesQuery({ page, sortBy });

  const handleChange = () => {
    setPage((prev) => prev + 1);
  };

  const handleRefetch = (value: string) => {
    setPage(0);
    setSortBy(value);
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 11, pb: 3 }}>
        <Stack direction="row" spacing={2}>
          <Button onClick={() => handleRefetch("Latest")}>Latest</Button>
          <Button onClick={() => handleRefetch("Oldest")}>Oldest</Button>
          <Button onClick={() => handleRefetch("Top")}>Top</Button>
        </Stack>

        <ArticlesList
          articles={articles}
          isLoading={isLoading}
          isFetching={isFetching}
          handleChange={handleChange}
        />
      </Container>
    </Layout>
  );
};
