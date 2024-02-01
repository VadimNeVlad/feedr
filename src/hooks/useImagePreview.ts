import { useState } from "react";

export const useImagePreview = (ref: React.RefObject<HTMLInputElement>) => {
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState<string | File>("");
  const [isEdit, setIsEdit] = useState(false);

  const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const urlImage = URL.createObjectURL(file);

    setPreview(urlImage);
    setImage(file);
    setIsEdit(true);
  };

  const handleClearPreview = () => {
    if (ref.current) ref.current.value = "";
    setPreview("");
    setImage("");
    setIsEdit(true);
  };

  return {
    preview,
    image,
    isEdit,
    handlePreview,
    handleClearPreview,
    setPreview,
  };
};
