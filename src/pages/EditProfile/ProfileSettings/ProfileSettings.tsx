import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { User } from "../../../utils/types/user";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from "../../../features/users/usersApi";
import { useDelayedRedirect } from "../../../hooks/useDelayedRedirect";

export const ProfileSettings: React.FC = () => {
  const [characterCounts, setCharacterCounts] = useState({
    websiteUrl: 0,
    location: 0,
    bio: 0,
  });

  const characterLimit = 200;

  const { data: currentUser } = useGetCurrentUserQuery();
  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation();

  const { register, handleSubmit } = useForm<Partial<User>>();

  useDelayedRedirect(isSuccess, error, "Profile updated successfully");

  useEffect(() => {
    if (currentUser) {
      setCharacterCounts({
        websiteUrl: currentUser.websiteUrl?.length || 0,
        location: currentUser.location?.length || 0,
        bio: currentUser.bio?.length || 0,
      });
    }
  }, [currentUser]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (value.length <= characterLimit) {
      setCharacterCounts((prevCharacterCounts) => ({
        ...prevCharacterCounts,
        [name]: value.length,
      }));
    }

    if (value.length >= characterLimit) {
      event.target.value = value.substring(0, characterLimit);
    }
  };

  const onSubmit = (data: Partial<User>) => {
    updateUser(data);
  };

  return (
    <>
      {currentUser && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{ mb: 4 }}>
            <CardHeader
              title="User"
              titleTypographyProps={{ variant: "h5", fontWeight: 700, mb: 1 }}
            />
            <CardContent>
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  type="text"
                  defaultValue={currentUser.name}
                  {...register("name")}
                />
              </Box>
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="text"
                  defaultValue={currentUser.email}
                  disabled
                />
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              title="Basic"
              titleTypographyProps={{ variant: "h5", fontWeight: 700, mb: 1 }}
            />
            <CardContent>
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label="Website URL"
                  variant="outlined"
                  type="text"
                  placeholder="https://yoursite.com"
                  defaultValue={currentUser.websiteUrl}
                  {...register("websiteUrl")}
                  onChange={handleInputChange}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="right"
                  sx={{ mt: 1 }}
                >
                  {characterCounts.websiteUrl}/{characterLimit}
                </Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label="Location"
                  variant="outlined"
                  type="text"
                  placeholder="Dublin, Ireland"
                  defaultValue={currentUser.location}
                  {...register("location")}
                  onChange={handleInputChange}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="right"
                  sx={{ mt: 1 }}
                >
                  {characterCounts.location}/{characterLimit}
                </Typography>
              </Box>
              <Box sx={{ mb: 4 }}>
                <TextField
                  multiline
                  fullWidth
                  rows={2}
                  label="Bio"
                  placeholder="A short bio..."
                  defaultValue={currentUser.bio}
                  sx={{ borderRadius: 0 }}
                  {...register("bio")}
                  onChange={handleInputChange}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  textAlign="right"
                  sx={{ mt: 1 }}
                >
                  {characterCounts.bio}/{characterLimit}
                </Typography>
              </Box>

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isLoading}
                disabled={isSuccess}
              >
                Save Profile Information
              </LoadingButton>
            </CardContent>
          </Card>
        </form>
      )}
    </>
  );
};
