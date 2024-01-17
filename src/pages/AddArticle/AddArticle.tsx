import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { splitTags } from "../../utils/helpers/splitTags";
import { ToastContainer, toast } from "react-toastify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { yupResolver } from "@hookform/resolvers/yup";
import { articleSchema } from "../../utils/validators/articleSchema";

export const AddArticle: React.FC = () => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const [createArticle, { isSuccess, isLoading, error }] =
    useCreateArticleMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleData>({
    resolver: yupResolver<any>(articleSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Article created successfully");
      const redirect = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(redirect);
    } else if (error) {
      const err = (error as FetchBaseQueryError).data as Error;
      toast.error(err.message);
    }
  }, [isSuccess, navigate, error]);

  const onSubmit = (data: ArticleData) => {
    const formattedTags = splitTags(tags);
    const newArticle = { ...data, body: content, tagList: formattedTags };

    createArticle(newArticle);
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
              <Box className="form-field" sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  error={!!errors.title}
                  label="Title"
                  variant="outlined"
                  type="text"
                  helperText={errors.title ? "Title is required" : null}
                  {...register("title", { required: true })}
                />
              </Box>

              <Box className="form-field">
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

              <Box className="form-field" sx={{ mt: 4, mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Tags separated by commas, word by either dashes or underscores
                </Typography>
                <TextField
                  fullWidth
                  error={!!errors.tagList}
                  value={tags}
                  label="Tags"
                  variant="outlined"
                  type="text"
                  helperText={errors.tagList ? "Tags are required" : null}
                  {...register("tagList", { required: true })}
                  onChange={(e) => setTags(e.target.value.replace(/ /g, ""))}
                />
              </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isLoading}
                disabled={!content}
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
