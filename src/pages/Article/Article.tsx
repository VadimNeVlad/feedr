import React, { useEffect, useRef } from "react";
import { Box, Button, CircularProgress, Container, Grid } from "@mui/material";
import { Header } from "../../components/Header/Header";
import {
  useDeleteArticleMutation,
  useGetSingleArticleQuery,
} from "../../features/articles/articlesApi";
import { ArticleContent } from "../../components/ArticleContent/ArticleContent";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { ToastContainer, toast } from "react-toastify";
import { useToggle } from "../../hooks/useToggle";

export const Article: React.FC = () => {
  const ref = useRef<null | HTMLDivElement>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useToggle();
  const user = useSelector((state: RootState) => state.auth.user);
  const {
    data: article,
    isLoading,
    isSuccess,
  } = useGetSingleArticleQuery(id || "");
  const { data: comments, isFetching: isFetchingComments } =
    useGetCommentsQuery(article?.id ?? skipToken);
  const { data: author, isFetching: isFetchingAuthor } = useGetUserByIdQuery(
    article?.authorId ?? skipToken
  );
  const [deleteArticle, { isLoading: isDeleting, isSuccess: deleteSuccess }] =
    useDeleteArticleMutation();

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Article deleted successfully");
      setOpen();

      const redirect = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(redirect);
    }
  }, [deleteSuccess, navigate, setOpen]);

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
              <ArticleAuthor author={author} isFetching={isFetchingAuthor} />

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

          <ToastContainer />
        </Container>
      )}
    </>
  );
};
