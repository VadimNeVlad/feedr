import { BaseSyntheticEvent } from "react";

export interface AuthFormProps {
  title: string;
  text: string;
  isPending: boolean;
  onSubmit: (data: BaseSyntheticEvent) => void;
}
