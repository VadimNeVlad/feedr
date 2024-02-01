import React, { useRef, useState } from "react";
import { Header } from "../../components/Header/Header";
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
import { ArticleData } from "../../utils/types/articles";
import LoadingButton from "@mui/lab/LoadingButton";
import { useCreateArticleMutation } from "../../features/articles/articlesApi";
import { splitTags } from "../../utils/helpers/splitTags";
import { ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { articleSchema } from "../../utils/validators/articleSchema";
import { ImagePreview } from "../../components/ImagePreview/ImagePreview";
import { useDelayedRedirect } from "../../hooks/useDelayedRedirect";
import { useImagePreview } from "../../hooks/useImagePreview";

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
    formState: { isValid },
  } = useForm<ArticleData>({
    resolver: yupResolver<any>(articleSchema),
  });

  const isDisabled = !content || !isValid || isSuccess;

  useDelayedRedirect(isSuccess, error, "Article created successfully");

  const onSubmit = (data: ArticleData) => {
    const formData = new FormData();
    const formattedTags = splitTags(tags);

    formData.append("title", data.title);
    formData.append("body", content);
    formData.append("tagList", JSON.stringify(formattedTags));
    formData.append("image", image);

    createArticle(formData);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 11, pb: 3 }}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
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
                  {...register("title", { required: true })}
                />
              </Box>

              <Box>
                <Editor
                  content=""
                  setContent={setContent}
                  isEditable
                  showToolbar
                />
                <TextField
                  type="hidden"
                  sx={{ display: "none" }}
                  value={content}
                  {...register("body", { required: true })}
                />
              </Box>

              <Box sx={{ mt: 4, mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Tags separated by commas, word by either dashes or underscores
                </Typography>
                <TextField
                  fullWidth
                  value={tags}
                  label="Tags"
                  variant="outlined"
                  type="text"
                  {...register("tagList", {
                    required: true,
                    onChange: (e) => setTags(e.target.value.replace(/ /g, "")),
                  })}
                />
              </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
                disabled={isDisabled}
              >
                Create article
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
      </Container>

      <ToastContainer />
    </>
  );
};
