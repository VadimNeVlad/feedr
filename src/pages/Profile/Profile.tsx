import { Box, Container, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../../features/users/usersApi";
import { useGetFollowingsQuery } from "../../features/follows/followsApi";
import { ProfileContent } from "../../components/ProfileContent/ProfileContent";
import { ProfileCountInfo } from "../../components/ProfileCountInfo/ProfileCountInfo";
import { FollowingList } from "../../components/FollowingList/FollowingList";
import { ProfileSkeleton } from "../../components/Skeletons/ProfileSkeleton/ProfileSkeleton";
import { ArticleFeed } from "../../components/ArticleFeed/ArticleFeed";
import { QueryError } from "../../components/QueryError/QueryError";
import { generateColor } from "../../utils/helpers/generateColor";

export const Profile = () => {
  const { id = "" } = useParams();
  const user = useGetUserByIdQuery(id);
  const following = useGetFollowingsQuery({ id, perPage: 5 });

  if (user.isLoading) return <ProfileSkeleton />;

  if (!user.currentData) {
    return (
      <Container sx={{ mt: 10, minHeight: "70vh" }}>
        {user.isError && <QueryError error={user.error} retry={user.refetch} />}
      </Container>
    );
  }

  return (
    <>
      <Box
        sx={{
          height: { xs: 135, md: 170 },
          bgcolor: generateColor(user.currentData.name),
        }}
      />
      <Container maxWidth="lg" sx={{ mt: -6, pb: 3, minHeight: "100vh" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProfileContent user={user.currentData} />
          </Grid>
          <Grid item xs={12} md={3}>
            {following.isError ? (
              <QueryError error={following.error} retry={following.refetch} />
            ) : (
              <FollowingList
                listType="followings"
                followType={following.currentData}
                id={id}
                size="sm"
              />
            )}
            <ProfileCountInfo
              commentsCount={user.currentData._count.comments}
              articlesCount={user.currentData._count.articles}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <ArticleFeed kind="author" authorId={id} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
