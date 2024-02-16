import React from "react";
import { Layout } from "../../components/Layout/Layout";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useGetReadingListQuery } from "../../features/articles/articlesApi";
import { ReadingListItem } from "../../components/ReadingListItem/ReadingListItem.tsx/ReadingListItem";

export const ReadingList: React.FC = () => {
  const { data, isLoading } = useGetReadingListQuery();

  return (
    <Layout>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {!isLoading && data && (
        <Container maxWidth="lg" sx={{ mt: 9, pb: 3, minHeight: "100vh" }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ fontSize: { xs: 28, md: 34 }, mb: 2 }}
          >
            Reading list ({data._count})
          </Typography>
          <Paper>
            {data.articles.map((article) => (
              <ReadingListItem key={article.id} article={article} />
            ))}
          </Paper>
        </Container>
      )}
    </Layout>
  );
};
