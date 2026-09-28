import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArticleForm } from "../../components/ArticleForm/ArticleForm";
import { useCreateArticleMutation } from "../../features/articles/articlesApi";
import { articlePath } from "../../utils/helpers/routes";

export const AddArticle = () => {
  const [create] = useCreateArticleMutation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 10, pb: 3, minHeight: "100vh" }}>
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        Create new article
      </Typography>
      <ArticleForm
        save={(body) => create(body).unwrap()}
        onSaved={(article) => {
          toast.success("Article created successfully");
          navigate(articlePath(article));
        }}
      />
    </Container>
  );
};
