import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { Article } from "../../utils/types/articles";
import { Editor } from "../../components/Editor/Editor";
import LoadingButton from "@mui/lab/LoadingButton";
import { IMAGE_URL } from "../../utils/constants/constants";
import { ImagePreview } from "../../components/ImagePreview/ImagePreview";
import { useDelayedRedirect } from "../../hooks/useDelayedRedirect";
import { useImagePreview } from "../../hooks/useImagePreview";
import { Layout } from "../../components/Layout/Layout";
import { TagsAutocomplete } from "../../components/TagsAutocomplete/TagsAutocomplete";

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
    control,
    formState: { isValid },
  } = useForm<Pick<Article, "title">>();

  const tags = useMemo(
    () => article?.tagList.map((tag) => tag.name),
    [article?.tagList]
  );

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

  const onSubmit = (data: Pick<Article, "title">) => {
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
            height: "100vh",
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

                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    type="text"
                    defaultValue={article?.title}
                    {...register("title")}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <TagsAutocomplete
                    disabled
                    control={control}
                    defaultValues={tags}
                  />
                </Box>

                <Box>
                  <Editor
                    content={article?.body}
                    setContent={setContent}
                    isEditable
                    showToolbar
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
