import { Container, Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { ArticleForm } from "../../components/ArticleForm/ArticleForm";
import { QueryError } from "../../components/QueryError/QueryError";
import {
  useGetSingleArticleQuery,
  useUpdateArticleMutation,
} from "../../features/articles/articlesApi";
import { articlePath } from "../../utils/helpers/routes";

export const EditArticle = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const user = useSelector((s: RootState) => s.auth.user);
  const query = useGetSingleArticleQuery(id);
  const [update] = useUpdateArticleMutation();

  return (
    <Container maxWidth="lg" sx={{ mt: 10, pb: 3, minHeight: "100vh" }}>
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        Edit article
      </Typography>
      {query.isLoading && <CircularProgress />}
      {query.isError && (
        <QueryError error={query.error} retry={query.refetch} />
      )}
      {query.currentData &&
        (query.currentData.authorId === user?.id ? (
          <ArticleForm
            key={id}
            article={query.currentData}
            save={(body) => update({ id, body }).unwrap()}
            onSaved={(article) => {
              toast.success("Article updated successfully");
              navigate(articlePath(article));
            }}
          />
        ) : (
          <QueryError error={{ status: 403 }} />
        ))}
    </Container>
  );
};
