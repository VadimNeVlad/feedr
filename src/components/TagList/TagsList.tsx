import React from "react";
import { TagslistProps } from "../../utils/types/props";
import { TagItem } from "../TagItem/TagItem";
import { Box, CircularProgress, Grid } from "@mui/material";
import { NoResultMessage } from "../NoResultMessage/NoResultMessage";
import { TagsListSkeleton } from "../Skeletons/TagsListSkeleton/TagsListSkeleton";

export const TagList: React.FC<TagslistProps> = ({
  tags,
  isLoading,
  isFetching,
}) => {
  return (
    <>
      {isLoading && <TagsListSkeleton />}

      {isFetching && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "calc(100vh - 154px)",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!isFetching && tags && (
        <Grid container spacing={2}>
          {tags &&
            (tags.length > 0 ? (
              tags.map((tag) => <TagItem key={tag.id} tag={tag} />)
            ) : (
              <NoResultMessage msg="There are no tags yet" />
            ))}
        </Grid>
      )}
    </>
  );
};
