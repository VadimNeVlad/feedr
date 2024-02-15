import React, { useEffect, useRef } from "react";
import { Avatar, Box } from "@mui/material";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { AvatarPreviewProps } from "../../utils/types/props";
import { useUpdateUserAvatarMutation } from "../../features/users/usersApi";
import { useForm } from "react-hook-form";
import { IMAGE_URL } from "../../utils/constants/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import LoadingButton from "@mui/lab/LoadingButton";
import { useImagePreview } from "../../hooks/useImagePreview";
import { generateColor } from "../../utils/helpers/generateColor";
import LocalSeeIcon from "@mui/icons-material/LocalSee";

export const AvatarPreview: React.FC<AvatarPreviewProps> = ({
  userName,
  userId,
  avatar,
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const { image, preview, handlePreview, handleClearPreview } =
    useImagePreview(fileRef);

  const [updateAvatar, { isLoading, isSuccess }] =
    useUpdateUserAvatarMutation();
  const { handleSubmit } = useForm();

  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (isSuccess) {
      handleClearPreview();
    }
  }, [isSuccess, handleClearPreview]);

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
          width: { xs: "60px", md: "100px" },
          height: { xs: "60px", md: "100px" },
          fontSize: { xs: "30px", md: "40px" },
          margin: { xs: "0", md: "0 auto" },
          mb: { xs: 4, md: 3 },
          mt: { xs: "-50px", md: "-75px" },
          border: { xs: "3px solid #000", md: "5px solid #000" },
          borderColor: {
            xs: generateColor(userName),
            md: generateColor(userName),
          },
          cursor: "pointer",
        }}
      >
        {trimFirstLetter(userName)}
      </Avatar>

      {currentUser?.id === userId && (
        <Box
          sx={{
            position: "absolute",
            top: { xs: 10, md: 26 },
            left: { xs: "60px", md: "52%" },
            transform: { xs: "translateX(0%)", md: "translateY(-50%)" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: generateColor(userName),
            p: 0.4,
            pb: 0.25,
            pointerEvents: "none",
            borderRadius: "50%",
          }}
        >
          <LocalSeeIcon sx={{ fontSize: { xs: 16, md: 24 }, color: "white" }} />
        </Box>
      )}

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
