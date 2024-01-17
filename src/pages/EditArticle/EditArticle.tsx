import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import {
  useGetSingleArticleQuery,
  useUpdateArticleMutation,
} from "../../features/articles/articlesApi";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { UpdateArticleData } from "../../utils/types/articles";
import { Editor } from "../../components/Editor/Editor";
import LoadingButton from "@mui/lab/LoadingButton";

export const EditArticle: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const { slug } = useParams();
  const { data: article, isLoading } = useGetSingleArticleQuery(slug || "", {
    refetchOnMountOrArgChange: true,
  });
  const [updateArticle, { isSuccess, isLoading: updatePending }] =
    useUpdateArticleMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateArticleData>();

  const tags = article?.tagList.map((tag) => tag.name);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Article created successfully");

      const redirect = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(redirect);
    }
  }, [isSuccess, navigate]);

  const onSubmit = (data: UpdateArticleData) => {
    const updatedArticle = { ...data, body: content, slug: slug || "" };
    updateArticle(updatedArticle);
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

      {!isLoading && article && (
        <Container maxWidth="lg" sx={{ mt: 11, pb: 3 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
            Edit article
          </Typography>

          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="form-field" sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    error={!!errors.title}
                    label="Title"
                    variant="outlined"
                    type="text"
                    defaultValue={article?.title}
                    helperText={errors.title ? "Title is required" : null}
                    {...register("title")}
                  />
                </Box>

                <Box className="form-field">
                  <Editor
                    content={article?.body || ""}
                    setContent={setContent}
                    isEditable
                    showToolbar
                  />
                  <TextField
                    type="hidden"
                    sx={{ display: "none" }}
                    value={content}
                    {...register("body")}
                  />
                </Box>

                <Box className="form-field" sx={{ mt: 4, mb: 2 }}>
                  <TextField
                    fullWidth
                    disabled
                    value={tags}
                    label="Tags"
                    variant="outlined"
                    type="text"
                  />
                </Box>

                <LoadingButton
                  type="submit"
                  variant="contained"
                  disabled={!content}
                  loading={updatePending}
                >
                  Update article
                </LoadingButton>
              </form>
            </CardContent>
          </Card>
        </Container>
      )}

      <ToastContainer />
    </>
  );
};
