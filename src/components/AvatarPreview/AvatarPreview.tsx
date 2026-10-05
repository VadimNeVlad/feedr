import { FormEvent, useRef } from "react";
import { Avatar, Box, ButtonBase } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LocalSeeIcon from "@mui/icons-material/LocalSee";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../app/store";
import { useUpdateUserAvatarMutation } from "../../features/users/usersApi";
import { useImagePreview } from "../../hooks/useImagePreview";
import { apiErrorMessage } from "../../utils/helpers/apiError";
import { generateColor } from "../../utils/helpers/generateColor";
import { trimFirstLetter } from "../../utils/helpers/trimString";

type AvatarPreviewProps = {
  userName: string;
  userId: string;
  avatar?: string;
};

const avatarSize = { xs: "60px", md: "100px" };

export const AvatarPreview = ({
  userName,
  userId,
  avatar,
}: AvatarPreviewProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { image, preview, handlePreview, handleClearPreview } =
    useImagePreview(fileRef);
  const [updateAvatar, { isLoading }] = useUpdateUserAvatarMutation();
  const isOwner = useSelector(
    (state: RootState) => state.auth.user?.id === userId,
  );
  const color = generateColor(userName);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image || isLoading) return;

    const formData = new FormData();
    formData.append("avatar", image);

    try {
      await updateAvatar(formData).unwrap();
      handleClearPreview();
    } catch (error) {
      toast.error(apiErrorMessage(error));
    }
  };

  const avatarElement = (
    <Avatar
      src={preview || avatar}
      alt={isOwner ? "" : userName}
      sx={{
        width: avatarSize,
        height: avatarSize,
        fontSize: { xs: "30px", md: "40px" },
        border: { xs: "3px solid", md: "5px solid" },
        borderColor: color,
      }}
    >
      {trimFirstLetter(userName)}
    </Avatar>
  );

  const placement = {
    display: "block",
    width: avatarSize,
    margin: { xs: "0", md: "0 auto" },
    mb: { xs: 4, md: 3 },
    mt: { xs: "-50px", md: "-75px" },
    borderRadius: "50%",
  };

  if (!isOwner) return <Box sx={placement}>{avatarElement}</Box>;

  return (
    <form onSubmit={onSubmit}>
      <ButtonBase
        aria-label="Change avatar"
        onClick={() => fileRef.current?.click()}
        sx={{ ...placement, position: "relative" }}
      >
        {avatarElement}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: { xs: -4, md: 0 },
            display: "flex",
            background: color,
            p: 0.4,
            borderRadius: "50%",
          }}
        >
          <LocalSeeIcon sx={{ fontSize: { xs: 16, md: 24 }, color: "white" }} />
        </Box>
      </ButtonBase>

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        hidden
        onChange={handlePreview}
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
