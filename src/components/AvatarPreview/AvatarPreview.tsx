import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "@mui/material";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { AvatarPreviewProps } from "../../utils/types/props";
import { useUpdateUserAvatarMutation } from "../../features/users/usersApi";
import { useForm } from "react-hook-form";
import { IMAGE_URL } from "../../utils/constants/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import LoadingButton from "@mui/lab/LoadingButton";

export const AvatarPreview: React.FC<AvatarPreviewProps> = ({
  userName,
  userId,
  avatar,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState<string | File>("");
  const [updateAvatar, { isLoading, isSuccess }] =
    useUpdateUserAvatarMutation();
  const { handleSubmit } = useForm();

  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (isSuccess) {
      handleClearPreview();
    }
  }, [isSuccess]);

  const handlePreview = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const urlImage = URL.createObjectURL(file);

    setPreview(urlImage);
    setImage(file);
  };

  const handleClearPreview = () => {
    if (fileRef.current) fileRef.current.value = "";
    setPreview("");
    setImage("");
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("avatar", image);

    updateAvatar(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Avatar
        src={preview || (avatar && `${IMAGE_URL}avatars/${avatar}`)}
        onClick={
          currentUser?.id === userId
            ? () => fileRef.current?.click()
            : undefined
        }
        sx={{
          width: "80px",
          height: "80px",
          fontSize: "36px",
          margin: "0 auto",
          mb: 3,
          mt: "-50px",
          border: "5px solid #000",
          cursor: "pointer",
        }}
      >
        {trimFirstLetter(userName)}
      </Avatar>

      <input
        ref={fileRef}
        type="file"
        style={{ display: "none" }}
        onChange={(e) => handlePreview(e)}
      />
      {preview && (
        <LoadingButton
          loading={isLoading}
          variant="outlined"
          type="submit"
          sx={{ mb: 1, mt: -2 }}
        >
          Update Avatar
        </LoadingButton>
      )}
    </form>
  );
};
