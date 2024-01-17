import React, { useRef } from "react";
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
import { useGetUserByIdQuery } from "../../features/users/usersApi";

export const Article: React.FC = () => {
  const ref = useRef<null | HTMLDivElement>(null);
  const { slug } = useParams();
  const {
    data: article,
    isLoading,
    isSuccess,
  } = useGetSingleArticleQuery(slug || "");
  const { data: comments, isFetching: isFetchingComments } =
    useGetCommentsQuery(article?.id ?? skipToken);
  const { data: author, isFetching: isFetchingAuthor } = useGetUserByIdQuery(
    article?.authorId ?? skipToken
  );

  const handleScroll = () => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
  };

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

      {!isLoading && isSuccess && article && comments && author && (
        <Container maxWidth="lg" sx={{ mt: 11, pb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <ArticleReactions article={article} handleScroll={handleScroll} />
            </Grid>
            <Grid item xs={8}>
              <ArticleContent article={article} />
              <Box ref={ref}>
                <CommentForm
                  articleId={article.id!}
                  isFetching={isFetchingComments}
                />
              </Box>
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </Grid>
            <Grid item xs={3}>
              <ArticleAuthor
                author={author}
                slug={slug || ""}
                isFetching={isFetchingAuthor}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
