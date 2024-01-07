import { BaseSyntheticEvent } from "react";

export interface AuthFormProps {
  title: string;
  text: string;
  onSubmit: (data: BaseSyntheticEvent) => void;
}
