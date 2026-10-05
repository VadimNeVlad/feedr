import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Card, CardContent, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { Article } from "../../utils/types/articles";
import { apiErrorMessage } from "../../utils/helpers/apiError";
import {
  articleSchema,
  ArticleFormFields,
} from "../../utils/validators/articleSchema";
import { Editor } from "../Editor/Editor";
import { ImagePreview } from "../ImagePreview/ImagePreview";
import { TagsAutocomplete } from "../TagsAutocomplete/TagsAutocomplete";
import { useImagePreview } from "../../hooks/useImagePreview";
import {
  clearArticleDraft,
  readArticleDraft,
  useArticleDraft,
} from "./useArticleDraft";

type ArticleFormProps = {
  article?: Article;
  /** Persists the article; rejects with an API error on failure. */
  save: (body: FormData) => Promise<Article>;
  /** Runs after the draft is cleared, so it may navigate away immediately. */
  onSaved: (article: Article) => void;
};

export const ArticleForm = (props: ArticleFormProps) => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const draftKey = `feedr:draft:${userId}:${props.article?.id ?? "new"}`;

  return <ArticleFormContent key={draftKey} draftKey={draftKey} {...props} />;
};

function ArticleFormContent({
  article,
  save,
  onSaved,
  draftKey,
}: ArticleFormProps & { draftKey: string }) {
  const [draft] = useState(() => readArticleDraft(draftKey));
  const [content, setContent] = useState(draft?.content ?? article?.body ?? "");
  const [saved, setSaved] = useState(false);
  const methods = useForm<ArticleFormFields>({
    resolver: yupResolver(articleSchema),
    mode: "onChange",
    defaultValues: {
      title: draft?.title ?? article?.title ?? "",
      tagList: draft?.tagList ?? article?.tagList.map((t) => t.name) ?? [],
    },
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const preview = useImagePreview(fileRef, article?.image);
  const [title, tagList] = methods.watch(["title", "tagList"]);
  const originalTags = article?.tagList.map((tag) => tag.name) ?? [];
  const dirty =
    title !== (article?.title ?? "") ||
    content !== (article?.body ?? "") ||
    tagList.length !== originalTags.length ||
    tagList.some((tag, index) => tag !== originalTags[index]) ||
    preview.isEdit;
  const { isSubmitting, isValid, errors } = methods.formState;

  useArticleDraft(draftKey, { title, tagList, content }, dirty && !saved);

  const onSubmit = async (data: ArticleFormFields) => {
    if (saved || !content.trim()) return;

    const body = new FormData();
    body.append("title", data.title.trim());
    body.append("body", content);
    body.append(
      "tagList",
      JSON.stringify(
        [...new Set(data.tagList.map((t) => t.trim()).filter(Boolean))].map(
          (name) => ({ name }),
        ),
      ),
    );

    if (preview.image) {
      body.append("image", preview.image);
    } else if (article && preview.isEdit && !preview.preview) {
      body.append("removeImage", "true");
    }

    let result: Article;

    try {
      result = await save(body);
    } catch (error) {
      toast.error(apiErrorMessage(error));
      return;
    }

    clearArticleDraft(draftKey);
    setSaved(true);
    onSaved(result);
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ImagePreview {...preview} fileRef={fileRef} />
          <TextField
            fullWidth
            label="Title"
            {...methods.register("title")}
            error={!!errors.title}
            helperText={errors.title?.message}
            inputProps={{ maxLength: 200 }}
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            <TagsAutocomplete control={methods.control} />
          </Box>
          <Editor
            content={content}
            setContent={setContent}
            isEditable
            showToolbar
          />
          <LoadingButton
            fullWidth
            type="submit"
            loading={isSubmitting}
            disabled={
              saved ||
              !content.trim() ||
              !isValid ||
              (!!article && !dirty)
            }
            variant="contained"
            sx={{ mt: 3 }}
          >
            {article ? "Update article" : "Create article"}
          </LoadingButton>
        </form>
      </CardContent>
    </Card>
  );
}
