import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useImagePreview = (
  ref: React.RefObject<HTMLInputElement>,
  initialImage = "",
) => {
  const [preview, setPreview] = useState(initialImage);
  const [image, setImage] = useState<File | "">("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(
    () => () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  const handlePreview = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) return;

      if (
        !["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
          file.type,
        ) ||
        file.size > 5 * 1024 * 1024
      ) {
        toast.error("Choose a JPEG, PNG, GIF or WebP image up to 5 MiB.");
        event.target.value = "";
        return;
      }

      setPreview(URL.createObjectURL(file));
      setImage(file);
      setIsEdit(true);
    },
    [],
  );

  const handleClearPreview = useCallback(() => {
    if (ref.current) ref.current.value = "";

    setPreview("");
    setImage("");
    setIsEdit(true);
  }, [ref]);

  return {
    preview,
    image,
    isEdit,
    handlePreview,
    handleClearPreview,
  };
};
