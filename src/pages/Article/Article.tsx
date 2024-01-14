import React from "react";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { Header } from "../../components/Header/Header";
import { useGetSingleArticleQuery } from "../../features/articles/articlesApi";
import { ArticleContent } from "../../components/ArticleContent/ArticleContent";
import { useParams } from "react-router-dom";
import { ArticleReactions } from "../../components/ArticleReactions/ArticleReactions";
import { ArticleAuthor } from "../../components/ArticleAuthor/ArticleAuthor";

export const Article: React.FC = () => {
  const { slug } = useParams();
  const {
    data: article,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetSingleArticleQuery(slug || "");

  return (
    <>
      <Header />
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 96px)",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && isSuccess && article && (
        <Container maxWidth="lg" sx={{ mt: 11 }}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <ArticleReactions article={article} />
            </Grid>
            <Grid item xs={8}>
              <ArticleContent article={article} />
            </Grid>
            <Grid item xs={3}>
              <ArticleAuthor article={article} isFetching={isFetching} />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
