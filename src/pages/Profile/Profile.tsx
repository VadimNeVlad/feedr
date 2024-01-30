import React from "react";
import { Header } from "../../components/Header/Header";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import { useGetUserByIdQuery } from "../../features/users/usersApi";
import { useParams } from "react-router-dom";
import { ProfileContent } from "../../components/ProfileContent/ProfileContent";
import { ProfileCountInfo } from "../../components/ProfileCountInfo/ProfileCountInfo";
import { useGetArticlesByAuthorQuery } from "../../features/articles/articlesApi";
import { ArticlesList } from "../../components/ArticlesList/ArticlesList";
import { FollowingList } from "../../components/FollowingList/FollowingList";
import { useGetFollowingsQuery } from "../../features/follows/followsApi";

export const Profile: React.FC = () => {
  const { id } = useParams();

  const { data: user, isLoading: userIsLoading } = useGetUserByIdQuery(
    id || ""
  );
  const {
    data: articles,
    isLoading: articlesIsLoading,
    isFetching,
  } = useGetArticlesByAuthorQuery(id || "");
  const { data: following, isLoading: followingsListLoading } =
    useGetFollowingsQuery(id || "");

  const isLoading =
    (userIsLoading && articlesIsLoading && followingsListLoading) || isFetching;
  const data = user && articles && following;

  return (
    <>
      <Header />
      <Box sx={{ width: "100%", height: "170px", bgcolor: "#000" }}></Box>

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
        <Container maxWidth="lg" sx={{ mt: -4, pb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ProfileContent user={user}></ProfileContent>
            </Grid>
            <Grid item xs={3}>
              <FollowingList
                following={following}
                followingCount={user.followingCount}
                id={user.id}
                size="sm"
              />
              <ProfileCountInfo
                commentsCount={user.commentsCount}
                articlesCount={articles.length}
              />
            </Grid>
            <Grid item xs={9}>
              <ArticlesList articles={articles} />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
