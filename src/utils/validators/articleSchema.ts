import * as Yup from "yup";

export const articleSchema = Yup.object().shape({
  title: Yup.string().required(),
  body: Yup.string(),
  tagList: Yup.array().of(Yup.string()),
});
