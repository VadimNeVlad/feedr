import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, Container, Stack, Typography } from "@mui/material";
import { FollowingList } from "../../components/FollowingList/FollowingList";
import {
  useGetFollowersQuery,
  useGetFollowingsQuery,
} from "../../features/follows/followsApi";
import { FOLLOWS_PAGE_SIZE } from "../../features/follows/constants";
import { useGetUserByIdQuery } from "../../features/users/usersApi";
import { FollowSkeleton } from "../../components/Skeletons/FollowSkeleton/FollowSkeleton";
import { QueryError } from "../../components/QueryError/QueryError";

export const Follow = () => {
  const { id = "" } = useParams();
  const location = useLocation();
  const followers = location.pathname.endsWith("/followers");

  return (
    <FollowContent key={`${id}:${followers}`} id={id} followers={followers} />
  );
};

function FollowContent({ id, followers }: { id: string; followers: boolean }) {
  const [page, setPage] = useState(0);
  const followersQuery = useGetFollowersQuery(
    { id, page },
    { skip: !followers },
  );
  const followingQuery = useGetFollowingsQuery(
    { id, page },
    { skip: followers },
  );
  const query = followers ? followersQuery : followingQuery;
  const user = useGetUserByIdQuery(id);
  const total = followers
    ? user.currentData?._count.followers
    : user.currentData?._count.following;
  const isLastPage =
    total !== undefined
      ? (page + 1) * FOLLOWS_PAGE_SIZE >= total
      : (query.currentData?.length ?? 0) < FOLLOWS_PAGE_SIZE;

  return (
    <Container maxWidth="lg" sx={{ mt: 11, pb: 3, minHeight: "100vh" }}>
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        {total ?? ""} {followers ? "Followers" : "Following"}
      </Typography>
      {query.isLoading && <FollowSkeleton />}
      {query.isError ? (
        <QueryError error={query.error} retry={query.refetch} />
      ) : (
        <FollowingList
          listType={followers ? "followers" : "followings"}
          followType={query.currentData}
        />
      )}
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          disabled={page === 0 || query.isFetching}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <Typography sx={{ py: 1 }}>Page {page + 1}</Typography>
        <Button
          disabled={query.isFetching || !query.currentData || isLastPage}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </Stack>
    </Container>
  );
}
