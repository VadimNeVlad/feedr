import { Tag } from "../../utils/types/tag";
import { TagItem } from "../TagItem/TagItem";
import { Box, CircularProgress, Grid } from "@mui/material";
import { NoResultMessage } from "../NoResultMessage/NoResultMessage";
import { TagsListSkeleton } from "../Skeletons/TagsListSkeleton/TagsListSkeleton";

interface TagslistProps {
  tags: Tag[] | undefined;
  isLoading?: boolean;
  isFetching?: boolean;
}

export const TagList = ({
  tags,
  isLoading,
  isFetching,
}: TagslistProps) => {
  return (
    <>
      {isLoading && <TagsListSkeleton />}

      {isFetching && !isLoading && (
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
