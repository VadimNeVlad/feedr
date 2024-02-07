import React, { useRef } from "react";
import { Box, Button, CircularProgress, Container, Grid } from "@mui/material";
import {
  useDeleteArticleMutation,
  useGetSingleArticleQuery,
} from "../../features/articles/articlesApi";
import { ArticleContent } from "../../components/ArticleContent/ArticleContent";
import { Link, useParams } from "react-router-dom";
import { ArticleReactions } from "../../components/ArticleReactions/ArticleReactions";
import { ArticleAuthor } from "../../components/ArticleAuthor/ArticleAuthor";
import { CommentForm } from "../../components/CommentForm/CommentForm";
import { CommentItem } from "../../components/CommentItem/CommentItem";
import { useGetCommentsQuery } from "../../features/comments/commentsApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetUserByIdQuery } from "../../features/users/usersApi";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Modal } from "../../components/Modal/Modal";
import { useToggle } from "../../hooks/useToggle";
import { Layout } from "../../components/Layout/Layout";
import { useDelayedRedirect } from "../../hooks/useDelayedRedirect";

export const Article: React.FC = () => {
  const ref = useRef<null | HTMLDivElement>(null);
  const { id } = useParams();

  const [open, setOpen] = useToggle();
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: article, isFetching: articlesIsFetching } =
    useGetSingleArticleQuery(id || "", { refetchOnMountOrArgChange: true });
  const { data: comments, isFetching: commentsIsFetching } =
    useGetCommentsQuery(article?.id ?? skipToken);
  const { data: author, isFetching: authorIsFetching } = useGetUserByIdQuery(
    article?.authorId ?? skipToken
  );
  const [
    deleteArticle,
    { isLoading: isDeleting, isSuccess: deleteSuccess, error },
  ] = useDeleteArticleMutation();

  const data = article && comments && author;
  const isLoading =
    articlesIsFetching || commentsIsFetching || authorIsFetching;

  useDelayedRedirect(deleteSuccess, error, "Article deleted successfully");

  const handleScroll = () => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && data && (
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
                  isFetching={commentsIsFetching}
                />
              </Box>
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </Grid>
            <Grid item xs={3}>
              <ArticleAuthor author={author} />

              {user?.id === author.id && (
                <>
                  <Link to={`/edit-article/${id}`}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{ mt: 2 }}
                      disabled={deleteSuccess}
                    >
                      Edit Article
                    </Button>
                  </Link>

                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    sx={{ mt: 1 }}
                    disabled={deleteSuccess}
                    onClick={setOpen}
                  >
                    Delete Article
                  </Button>
                </>
              )}
            </Grid>
          </Grid>

          <Modal
            title="Delete Article"
            open={open}
            isDeleting={isDeleting}
            handleClose={setOpen}
            deleteAction={() => deleteArticle(article.id)}
          >
            Are you sure you want to delete this article?
          </Modal>
        </Container>
      )}
    </Layout>
  );
};
