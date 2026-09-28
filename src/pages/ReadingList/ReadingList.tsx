import { Container, Typography } from "@mui/material";
import { ArticleFeed } from "../../components/ArticleFeed/ArticleFeed";
import { useGetReadingListQuery } from "../../features/articles/articlesApi";

export const ReadingList = () => {
  // Shares the first feed page's cache entry, so the total costs no extra request.
  const { currentData } = useGetReadingListQuery({ page: 0 });

  return (
    <Container maxWidth="lg" sx={{ mt: 9, pb: 3, minHeight: "100vh" }}>
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        Reading list{currentData && ` (${currentData._count})`}
      </Typography>
      <ArticleFeed kind="saved" />
    </Container>
  );
};
