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
import { generateColor } from "../../utils/helpers/generateColor";
import { usePaginate } from "../../hooks/usePaginate";

export const Profile: React.FC = () => {
  const { id } = useParams();
  const { page, handleNextPage } = usePaginate(false);

  const { data: user, isLoading: userIsLoading } = useGetUserByIdQuery(
    id as string
  );

  const { data: articles, isLoading: articlesIsLoading } =
    useGetArticlesByAuthorQuery({ authorId: id as string, page });

  const { data: following, isLoading: followingsIsLoading } =
    useGetFollowingsQuery({ id: id as string, perPage: 5 });

  const isLoading = userIsLoading || articlesIsLoading || followingsIsLoading;
  const data = user && articles && following;

  return (
    <Layout>
      {isLoading && <ProfileSkeleton />}

      {!isLoading && data && (
        <>
          <Box
            sx={{
              width: "100%",
              height: "170px",
              bgcolor: generateColor(user.name),
            }}
          ></Box>
          <Container maxWidth="lg" sx={{ mt: -4, pb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ProfileContent user={user} />
              </Grid>
              <Grid item xs={3}>
                <FollowingList
                  listType="followings"
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
                  articles={articles.articles}
                  articlesCount={articles._count}
                  handleNextPage={handleNextPage}
                />
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </Layout>
  );
};
