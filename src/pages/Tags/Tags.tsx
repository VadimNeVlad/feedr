import React, { useRef, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { Box, Container, Typography } from "@mui/material";
import { useGetTagsQuery } from "../../features/tags/tagsApi";
import { TagList } from "../../components/TagList/TagsList";
import { SearchInput } from "../../components/SearchInput/SearchInput";

export const Tags: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState("");
  const { data: tags, isLoading, isFetching } = useGetTagsQuery(searchValue);

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 9, pb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h4" fontWeight={700} sx={{ mb: 0 }}>
            Tags
          </Typography>
          <SearchInput
            inputRef={inputRef}
            placeholder="Search for tags"
            setSearchValue={setSearchValue}
          />
        </Box>
        <TagList tags={tags} isLoading={isLoading} isFetching={isFetching} />
      </Container>
    </Layout>
  );
};
