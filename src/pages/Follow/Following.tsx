import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { FollowingList } from "../../components/FollowingList/FollowingList";
import { useGetFollowingsQuery } from "../../features/follows/followsApi";
import { useGetUserByIdQuery } from "../../features/users/usersApi";

export const Following: React.FC = () => {
  const { id } = useParams();

  const { data: user, isLoading: userIsLoading } = useGetUserByIdQuery(
    id || ""
  );
  const { data: following, isLoading: followingsListLoading } =
    useGetFollowingsQuery({ id: id || "" });

  const isLoading = userIsLoading && followingsListLoading;
  const data = user && following;

  return (
    <>
      <Header></Header>

      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 170px)",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && data && (
        <Container maxWidth="lg" sx={{ mt: 11, pb: 3 }}>
          <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
            {user.followingCount} Following
          </Typography>
          <FollowingList following={following} />
        </Container>
      )}
    </>
  );
};
