import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, CircularProgress, Container } from "@mui/material";
import { FollowingList } from "../../components/FollowingList/FollowingList";
import {
  useGetFollowersQuery,
  useGetFollowingsQuery,
} from "../../features/follows/followsApi";
import { Layout } from "../../components/Layout/Layout";

export const Follow: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const isFollowers = location.pathname.includes("/followers");

  const { data: followers, isFetching: followersListIsLoading } =
    useGetFollowersQuery(
      { id: id || "" },
      { refetchOnMountOrArgChange: true, skip: !isFollowers }
    );

  const { data: following, isFetching: followingsListIsLoading } =
    useGetFollowingsQuery(
      { id: id || "" },
      { refetchOnMountOrArgChange: true, skip: isFollowers }
    );

  const isLoading = followingsListIsLoading || followersListIsLoading;
  const data = following || followers;

  return (
    <Layout>
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
          <FollowingList
            listType={isFollowers ? "followers" : "followings"}
            followType={isFollowers ? followers : following}
          />
        </Container>
      )}
    </Layout>
  );
};
