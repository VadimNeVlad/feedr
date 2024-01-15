import React from "react";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { Header } from "../../components/Header/Header";
import { useGetSingleArticleQuery } from "../../features/articles/articlesApi";
import { ArticleContent } from "../../components/ArticleContent/ArticleContent";
import { useParams } from "react-router-dom";
import { ArticleReactions } from "../../components/ArticleReactions/ArticleReactions";
import { ArticleAuthor } from "../../components/ArticleAuthor/ArticleAuthor";
import { CommentForm } from "../../components/CommentForm/CommentForm";
import { CommentItem } from "../../components/CommentItem/CommentItem";
import { useGetCommentsQuery } from "../../features/comments/commentsApi";
import { skipToken } from "@reduxjs/toolkit/query";

export const Article: React.FC = () => {
  const { slug } = useParams();
  const {
    data: article,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetSingleArticleQuery(slug || "");
  const { data: comments } = useGetCommentsQuery(article?.id ?? skipToken);

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

      {!isLoading && isSuccess && article && comments && (
        <Container maxWidth="lg" sx={{ mt: 11, pb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <ArticleReactions article={article} />
            </Grid>
            <Grid item xs={8}>
              <ArticleContent article={article} />
              <CommentForm articleId={article.id!} />
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
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
