import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { Container, TextField, Typography } from "@mui/material";
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
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const [createArticle, { isSuccess, error }] = useCreateArticleMutation();
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
      navigate("/");
    } else if (error) {
      const err = (error as FetchBaseQueryError).data as Error;
      toast.error(err.message);
      setPending(false);
    }
  }, [isSuccess, navigate, error]);

  const onSubmit = (data: ArticleData) => {
    const formattedTags = splitTags(tags);
    const newArticle = { ...data, body: content, tagList: formattedTags };

    setPending(true);
    createArticle(newArticle);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight={700}>
          Create new article
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-field">
            <TextField
              fullWidth
              error={!!errors.title}
              label="Title"
              variant="outlined"
              type="text"
              helperText={errors.title ? "Title is required" : null}
              {...register("title", { required: true })}
            />
          </div>

          <div className="form-field">
            <Editor content="" setContent={setContent} isEditable showToolbar />
            <TextField
              type="hidden"
              sx={{ display: "none" }}
              value={content}
              {...register("body", { required: true })}
            />
          </div>

          <div className="form-field">
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
          </div>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={pending}
            disabled={!content}
          >
            Create article
          </LoadingButton>
        </form>
      </Container>

      <ToastContainer />
    </>
  );
};
