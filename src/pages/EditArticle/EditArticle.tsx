import React, { useEffect, useRef, useState } from "react";
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
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UpdateArticleData } from "../../utils/types/articles";
import { Editor } from "../../components/Editor/Editor";
import LoadingButton from "@mui/lab/LoadingButton";
import { IMAGE_URL } from "../../utils/constants/constants";
import { ImagePreview } from "../../components/ImagePreview/ImagePreview";
import { useDelayedRedirect } from "../../hooks/useDelayedRedirect";
import { useImagePreview } from "../../hooks/useImagePreview";
import { Layout } from "../../components/Layout/Layout";

export const EditArticle: React.FC = () => {
  const { id } = useParams();
  const fileRef = useRef<HTMLInputElement>(null);

  const {
    image,
    preview,
    isEdit,
    handleClearPreview,
    handlePreview,
    setPreview,
  } = useImagePreview(fileRef);

  const [content, setContent] = useState("");

  const { data: article, isLoading } = useGetSingleArticleQuery(id || "", {
    refetchOnMountOrArgChange: true,
  });
  const [updateArticle, { isSuccess, isLoading: updatePending, error }] =
    useUpdateArticleMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<UpdateArticleData>();

  const tags = article?.tagList.map((tag) => tag.name);
  const title = watch("title");
  const isDisabled =
    !content ||
    !isValid ||
    isSuccess ||
    (title === article?.title && content === article?.body && !isEdit);

  useDelayedRedirect(isSuccess, error, "Article updated successfully");

  useEffect(() => {
    if (article?.image) setPreview(`${IMAGE_URL}articles/${article.image}`);
    if (article?.body) setContent(article.body);
  }, [article, setPreview]);

  const onSubmit = (data: UpdateArticleData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", content);
    formData.append("id", id || "");
    formData.append("image", image);

    updateArticle(formData);
  };

  return (
    <Layout>
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
                <ImagePreview
                  preview={preview}
                  fileRef={fileRef}
                  handlePreview={handlePreview}
                  handleClearPreview={handleClearPreview}
                />

                <Box className="form-field" sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    type="text"
                    defaultValue={article?.title}
                    {...register("title")}
                  />
                </Box>

                <Box className="form-field">
                  <Editor
                    content={article?.body}
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
                  disabled={isDisabled}
                  loading={updatePending}
                >
                  Update article
                </LoadingButton>
              </form>
            </CardContent>
          </Card>
        </Container>
      )}
    </Layout>
  );
};
