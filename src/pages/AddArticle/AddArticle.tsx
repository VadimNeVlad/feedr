import React, { useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Editor } from "../../components/Editor/Editor";
import { useForm } from "react-hook-form";
import { Article } from "../../utils/types/articles";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCreateArticleMutation } from "../../features/articles/articlesApi";
import { splitTags } from "../../utils/helpers/splitTags";
import { yupResolver } from "@hookform/resolvers/yup";
import { articleSchema } from "../../utils/validators/articleSchema";
import { ImagePreview } from "../../components/ImagePreview/ImagePreview";
import { useDelayedRedirect } from "../../hooks/useDelayedRedirect";
import { useImagePreview } from "../../hooks/useImagePreview";
import { Layout } from "../../components/Layout/Layout";
import { TagsAutocomplete } from "../../components/TagsAutocomplete/TagsAutocomplete";

export const AddArticle: React.FC = () => {
  const fileRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const { image, preview, handlePreview, handleClearPreview } =
    useImagePreview(fileRef);

  const [createArticle, { isSuccess, isLoading, error }] =
    useCreateArticleMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<Pick<Article, "title">>({
    resolver: yupResolver<any>(articleSchema),
  });

  const isDisabled = !content || !isValid || !tags || isSuccess;

  useDelayedRedirect(isSuccess, error, "Article created successfully");

  const onSubmit = (data: Pick<Article, "title">) => {
    const formData = new FormData();
    const formattedTags = splitTags(tags);

    formData.append("title", data.title);
    formData.append("body", content);
    formData.append("tagList", JSON.stringify(formattedTags));
    formData.append("image", image);

    createArticle(formData);
  };

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 10, pb: 3, minHeight: "100vh" }}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ fontSize: { xs: 28, md: 34 }, mb: 2 }}
        >
          Create new article
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
                  label="New article title"
                  variant="outlined"
                  type="text"
                  {...register("title")}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TagsAutocomplete control={control} setTags={setTags} />
              </Box>

              <Box>
                <Editor
                  content=""
                  setContent={setContent}
                  isEditable
                  showToolbar
                />
              </Box>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
                disabled={isDisabled}
                sx={{ mt: 3.5 }}
              >
                Create article
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};
