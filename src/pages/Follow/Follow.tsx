import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container } from "@mui/material";
import { FollowingList } from "../../components/FollowingList/FollowingList";
import {
  useGetFollowersQuery,
  useGetFollowingsQuery,
} from "../../features/follows/followsApi";
import { Layout } from "../../components/Layout/Layout";
import { FollowSkeleton } from "../../components/Skeletons/FollowSkeleton/FollowSkeleton";

export const Follow: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const isFollowers = location.pathname.includes("/followers");

  const { data: followers, isLoading: followersListIsLoading } =
    useGetFollowersQuery({ id: id || "" }, { skip: !isFollowers });

  const { data: following, isLoading: followingsListIsLoading } =
    useGetFollowingsQuery({ id: id || "" }, { skip: isFollowers });

  const isLoading = followingsListIsLoading || followersListIsLoading;
  const data = following || followers;

  return (
    <Layout>
      {isLoading && <FollowSkeleton />}

      {!isLoading && data && (
        <Container maxWidth="lg" sx={{ mt: 11, pb: 3, minHeight: "100vh" }}>
          <FollowingList
            listType={isFollowers ? "followers" : "followings"}
            followType={isFollowers ? followers : following}
          />
        </Container>
      )}
    </Layout>
  );
};
