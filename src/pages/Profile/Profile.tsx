import React from "react";
import { Box, Container, Grid } from "@mui/material";
import { useGetUserByIdQuery } from "../../features/users/usersApi";
import { useParams } from "react-router-dom";
import { ProfileContent } from "../../components/ProfileContent/ProfileContent";
import { ProfileCountInfo } from "../../components/ProfileCountInfo/ProfileCountInfo";
import { useGetArticlesByAuthorQuery } from "../../features/articles/articlesApi";
import { ArticlesList } from "../../components/ArticlesList/ArticlesList";
import { FollowingList } from "../../components/FollowingList/FollowingList";
import { useGetFollowingsQuery } from "../../features/follows/followsApi";
import { Layout } from "../../components/Layout/Layout";
import { ProfileSkeleton } from "../../components/Skeletons/ProfileSkeleton/ProfileSkeleton";

export const Profile: React.FC = () => {
  const { id } = useParams();

  const { data: user, isFetching: userIsFetching } = useGetUserByIdQuery(
    id || "",
    { refetchOnMountOrArgChange: true }
  );
  const {
    data: articles,
    isLoading: articlesIsLoading,
    isFetching: articlesIsFetching,
  } = useGetArticlesByAuthorQuery(id || "", {
    refetchOnMountOrArgChange: true,
  });
  const {
    data: following,
    isLoading: followingsIsLoading,
    isFetching: followingsIsFetching,
  } = useGetFollowingsQuery(
    { id: id || "", perPage: 5 },
    { refetchOnMountOrArgChange: true }
  );

  const isLoading = userIsFetching || articlesIsLoading || followingsIsLoading;
  const data = user && articles && following;

  return (
    <Layout>
      <Box sx={{ width: "100%", height: "170px", bgcolor: "#000" }}></Box>

      {isLoading && <ProfileSkeleton />}

      {!isLoading && data && (
        <Container maxWidth="lg" sx={{ mt: -4, pb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ProfileContent user={user} />
            </Grid>
            <Grid item xs={3}>
              <FollowingList
                listType="followings"
                isFetching={followingsIsFetching}
                followType={following}
                id={user.id}
                size="sm"
              />
              <ProfileCountInfo
                commentsCount={user._count.comments}
                articlesCount={user._count.articles}
              />
            </Grid>
            <Grid item xs={9}>
              <ArticlesList
                articles={articles}
                articlesCount={user._count.articles}
                isFetching={articlesIsFetching}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </Layout>
  );
};
