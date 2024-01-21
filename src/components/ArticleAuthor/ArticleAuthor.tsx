import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { ArticleAuthorProps } from "../../utils/types/props";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { formatDate } from "../../utils/helpers/formatDate";
import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../features/users/usersApi";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import LoadingButton from "@mui/lab/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { useToggle } from "../../hooks/useToggle";
import { useDeleteArticleMutation } from "../../features/articles/articlesApi";
import { ToastContainer, toast } from "react-toastify";

export const ArticleAuthor: React.FC<ArticleAuthorProps> = ({
  author,
  slug,
  isFetching,
}) => {
  const [open, setOpen] = useToggle();
  const navigate = useNavigate();
  const [followUser, { isLoading: isFollowing }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowing }] =
    useUnfollowUserMutation();
  const [deleteArticle, { isLoading: isDeleting, isSuccess }] =
    useDeleteArticleMutation();
  const user = useSelector((state: RootState) => state.auth.user);

  const exists = author.followers.some((followingUser) =>
    user ? followingUser.followerId === user.id : null
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Article deleted successfully");
      const redirect = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(redirect);
    }
  }, [isSuccess, navigate]);

  const handleFollowUser = () => {
    if (!exists) followUser(author.id);
    else unfollowUser(author.id);
  };

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ width: "46px", height: "46px" }}>
              {trimFirstLetter(author.name)}
            </Avatar>
          }
          titleTypographyProps={{ variant: "h6", fontWeight: 700 }}
          title={author.name}
        />

        <CardContent>
          {user?.id !== author.id && (
            <LoadingButton
              variant="contained"
              sx={{ width: "100%", mb: 2 }}
              loading={isFollowing || isUnfollowing || isFetching}
              onClick={handleFollowUser}
            >
              {!exists ? "Follow" : "Unfollow"}
            </LoadingButton>
          )}
          <Typography variant="body1" sx={{ mb: 2 }}>
            MERN Stack Developer | Machine Learning Developer | Content Reviewer
          </Typography>
          <Typography variant="subtitle1" fontWeight={700}>
            Email
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {author.email}
          </Typography>
          <Typography variant="subtitle1" fontWeight={700}>
            Joined
          </Typography>
          <Typography variant="body1">
            {formatDate(author.createdAt, false)}
          </Typography>
        </CardContent>
      </Card>

      {user?.id === author.id && (
        <>
          <Link to={`/edit-article/${slug}`}>
            <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
              Edit Article
            </Button>
          </Link>

          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{ mt: 1 }}
            onClick={setOpen}
          >
            Delete Article
          </Button>

          <Modal
            title="Delete Article"
            open={open}
            isDeleting={isDeleting}
            handleClose={setOpen}
            deleteAction={() => deleteArticle(slug)}
          >
            Are you sure you want to delete this article?
          </Modal>

          <ToastContainer />
        </>
      )}
    </>
  );
};
