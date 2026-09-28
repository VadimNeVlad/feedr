import * as Yup from "yup";

export const articleSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Title is required")
    .max(200, "Title must be at most 200 characters"),
  tagList: Yup.array()
    .of(
      Yup.string()
        .trim()
        .required()
        .max(50, "Tag names must be at most 50 characters"),
    )
    .max(20, "Choose up to 20 tags")
    .required(),
});

export type ArticleFormFields = Yup.InferType<typeof articleSchema>;
