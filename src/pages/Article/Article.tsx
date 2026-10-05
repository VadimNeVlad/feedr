import { useRef } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import {
  useDeleteArticleMutation,
  useGetSingleArticleQuery,
} from "../../features/articles/articlesApi";
import { useGetUserByIdQuery } from "../../features/users/usersApi";
import { RootState } from "../../app/store";
import { ArticleContent } from "../../components/ArticleContent/ArticleContent";
import { ArticleReactions } from "../../components/ArticleReactions/ArticleReactions";
import { ArticleAuthor } from "../../components/ArticleAuthor/ArticleAuthor";
import { CommentsSection } from "../../components/CommentsSection/CommentsSection";
import { Modal } from "../../components/Modal/Modal";
import { ArticleActions } from "../../components/ArticleActions/ArticleActions";
import { ArticleSkeleton } from "../../components/Skeletons/ArticleSkeleton/ArticleSkeleton";
import { QueryError } from "../../components/QueryError/QueryError";
import { useToggle } from "../../hooks/useToggle";
import { apiErrorMessage } from "../../utils/helpers/apiError";

export const Article = () => {
  const commentsRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, toggleOpen] = useToggle();
  const user = useSelector((state: RootState) => state.auth.user);
  const query = useGetSingleArticleQuery(id ?? skipToken);
  const article = query.currentData;
  const authorQuery = useGetUserByIdQuery(article?.authorId ?? skipToken);
  const [deleteArticle, { isLoading: isDeleting }] =
    useDeleteArticleMutation();

  const handleDelete = async () => {
    if (!article || isDeleting) return;

    try {
      await deleteArticle(article.id).unwrap();
    } catch (error) {
      toast.error(apiErrorMessage(error));
      return;
    }

    toast.success("Article deleted successfully");
    navigate("/");
  };

  if (query.isLoading) return <ArticleSkeleton />;

  const actions = article && user?.id === article.authorId && (
    <ArticleActions
      articleId={article.id}
      isDeleting={isDeleting}
      onDelete={toggleOpen}
    />
  );

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: { xs: 9, sm: 11 }, pb: 6, minHeight: "100vh" }}
    >
      {query.error && <QueryError error={query.error} retry={query.refetch} />}
      {article && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={1}>
            <ArticleReactions
              article={article}
              onCommentsClick={() =>
                commentsRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            />
          </Grid>
          <Grid item xs={12} sm={11} md={8}>
            <ArticleContent article={article} />
            <Box sx={{ display: { md: "none" }, mb: 2 }}>{actions}</Box>
            <Box ref={commentsRef}>
              <CommentsSection
                key={article.id}
                id={article.id}
                count={article._count.comments}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            {authorQuery.error && (
              <QueryError
                error={authorQuery.error}
                retry={authorQuery.refetch}
              />
            )}
            {authorQuery.currentData && (
              <ArticleAuthor author={authorQuery.currentData} />
            )}
            <Box sx={{ display: { xs: "none", md: "block" } }}>{actions}</Box>
          </Grid>
        </Grid>
      )}
      <Modal
        title="Delete article"
        open={open}
        onClose={toggleOpen}
        isPending={isDeleting}
        onConfirm={handleDelete}
      >
        Are you sure you want to delete this article?
      </Modal>
    </Container>
  );
};
