import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { Container, Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetTagArticlesQuery } from "../../features/tags/tagsApi";
import { ArticlesList } from "../../components/ArticlesList/ArticlesList";
import { SortingButtons } from "../../components/SortingButtons/SortingButtons";

export const Tag: React.FC = () => {
  const { tagName } = useParams();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);

  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "latest");
  const [customFetching, setCustomFetching] = useState(true);

  const { data, status } = useGetTagArticlesQuery({ tagName, page, sortBy });

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
    navigate(value === "latest" ? "" : `?sortBy=${value}`);
  };

  return (
    <Layout>
      {data && (
        <Container maxWidth="lg" sx={{ mt: 9, pb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
                {tagName}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2">
                {data._count.articles} Articles published{" "}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <SortingButtons
                value={sortBy}
                handleSortChange={handleSortChange}
              />
              <ArticlesList
                articles={data.articles}
                isLoading={customFetching}
                articlesCount={data._count.articles}
                handleNextPage={handleNextPage}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </Layout>
  );
};
