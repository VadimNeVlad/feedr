import React, { useEffect, useRef, useState } from "react";
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
import { IMAGE_URL } from "../../utils/constants/constants";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ImagePreview } from "../../components/ImagePreview/ImagePreview";

export const EditArticle: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fileRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | File>("");
  const [isEdit, setIsEdit] = useState(false);

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

  useEffect(() => {
    if (isSuccess) {
      toast.success("Article changed successfully");
      setIsEdit(false);

      const redirect = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(redirect);
    } else if (error) {
      const err = (error as FetchBaseQueryError).data as Error;
      toast.error(err.message);
    }
  }, [isSuccess, navigate, error]);

  useEffect(() => {
    if (article?.image) setPreview(`${IMAGE_URL}articles/${article.image}`);
    if (article?.body) setContent(article.body);
  }, [article]);

  const handlePreview = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const urlImage = URL.createObjectURL(file);

    setPreview(urlImage);
    setImage(file);
    setIsEdit(true);
  };

  const handleClearPreview = () => {
    if (fileRef.current) fileRef.current.value = "";
    setPreview("");
    setImage("");
    setIsEdit(true);
  };

  const onSubmit = (data: UpdateArticleData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", content);
    formData.append("id", id || "");
    formData.append("image", image);

    updateArticle(formData);
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
                  disabled={
                    !content ||
                    !isValid ||
                    (title === article.title &&
                      content === article.body &&
                      !isEdit)
                  }
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
