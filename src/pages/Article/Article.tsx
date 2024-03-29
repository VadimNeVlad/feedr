import React, { useRef } from "react";
import { Box, Container, Grid } from "@mui/material";
import {
  useDeleteArticleMutation,
  useGetSingleArticleQuery,
} from "../../features/articles/articlesApi";
import { ArticleContent } from "../../components/ArticleContent/ArticleContent";
import { useParams } from "react-router-dom";
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
import { ArticleActions } from "../../components/ArticleActions/ArticleActions";
import { ArticleSkeleton } from "../../components/Skeletons/ArticleSkeleton/ArticleSkeleton";

export const Article: React.FC = () => {
  const ref = useRef<null | HTMLDivElement>(null);
  const { id } = useParams();

  const [open, setOpen] = useToggle();
  const user = useSelector((state: RootState) => state.auth.user);

  const { data: article, isLoading: articlesIsLoading } =
    useGetSingleArticleQuery(id as string);

  const {
    data: comments,
    isLoading: commentsIsLoading,
    isFetching: commentsIsFetching,
  } = useGetCommentsQuery(article?.id ?? skipToken);

  const { data: author, isLoading: authorIsLoading } = useGetUserByIdQuery(
    article?.authorId ?? skipToken
  );

  const [
    deleteArticle,
    { isLoading: isDeleting, isSuccess: deleteArticleSuccess, error },
  ] = useDeleteArticleMutation();

  const data = article && comments && author;
  const isLoading = articlesIsLoading || commentsIsLoading || authorIsLoading;

  useDelayedRedirect(
    deleteArticleSuccess,
    error,
    "Article deleted successfully"
  );

  const handleScroll = () => {
    if (ref.current) ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const deleteArticleHandler = () => {
    if (article) {
      deleteArticle(article.id);
      setOpen();
    }
  };

  return (
    <Layout>
      {isLoading && <ArticleSkeleton />}

      {!isLoading && data && (
        <Container
          maxWidth="lg"
          sx={{ mt: { xs: 9, sm: 11 }, pb: 6, minHeight: "100vh" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <ArticleReactions article={article} handleScroll={handleScroll} />
            </Grid>
            <Grid item xs={12} sm={11} md={8}>
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
                <ArticleActions
                  articleId={id as string}
                  setOpen={setOpen}
                  isDeleting={isDeleting}
                  deleteArticleSuccess={deleteArticleSuccess}
                />
              )}
            </Grid>
          </Grid>

          <Modal
            title="Delete Article"
            open={open}
            handleClose={setOpen}
            deleteAction={deleteArticleHandler}
          >
            Are you sure you want to delete this article?
          </Modal>
        </Container>
      )}
    </Layout>
  );
};
