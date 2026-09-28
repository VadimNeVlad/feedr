import { useState } from "react";
import { QueryError } from "../../components/QueryError/QueryError";
import { Box, Button, Container, Typography } from "@mui/material";
import { useGetTagsQuery } from "../../features/tags/tagsApi";
import { TagList } from "../../components/TagList/TagsList";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import {
  PaginatedFeed,
  FeedPageProps,
} from "../../components/PaginatedFeed/PaginatedFeed";
import { TAGS_PAGE_SIZE } from "../../features/tags/constants";

export const Tags = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Container maxWidth="lg" sx={{ mt: 9, pb: 3, minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          fontWeight={700}
          sx={{ fontSize: { xs: 28, md: 34 }, mb: 0, pr: 3 }}
        >
          Tags
        </Typography>
        <SearchInput placeholder="Search for tags" onSearch={setSearchValue} />
      </Box>
      <PaginatedFeed key={searchValue}>
        {(pagination) => <TagsPage q={searchValue} {...pagination} />}
      </PaginatedFeed>
    </Container>
  );
};

function TagsPage({ q, page, onLoadMore }: FeedPageProps & { q: string }) {
  const {
    currentData: tags,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetTagsQuery({ q, page });

  if (isError) return <QueryError error={error} retry={refetch} />;

  if (page > 0 && tags?.length === 0) return null;

  return (
    <>
      <TagList tags={tags} isLoading={!tags} isFetching={isFetching} />

      {onLoadMore && tags?.length === TAGS_PAGE_SIZE && (
        <Button onClick={onLoadMore} disabled={isFetching} sx={{ my: 2 }}>
          Load more tags
        </Button>
      )}
    </>
  );
}
