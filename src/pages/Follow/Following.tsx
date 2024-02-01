import React from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Box, CircularProgress, Container } from "@mui/material";
import { FollowingList } from "../../components/FollowingList/FollowingList";
import { useGetFollowingsQuery } from "../../features/follows/followsApi";

export const Following: React.FC = () => {
  const { id } = useParams();

  const { data: following, isFetching: followingsListLoading } =
    useGetFollowingsQuery(
      { id: id || "" },
      { refetchOnMountOrArgChange: true }
    );

  const isLoading = followingsListLoading;
  const data = following;

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
          <FollowingList following={following} />
        </Container>
      )}
    </>
  );
};
