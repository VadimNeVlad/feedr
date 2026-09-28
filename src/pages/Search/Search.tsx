import { Container, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { ArticleFeed } from "../../components/ArticleFeed/ArticleFeed";

export const Search = () => {
  const [params] = useSearchParams();
  const q = params.get("q")?.trim() || "";

  return (
    <Container maxWidth="lg" sx={{ mt: 9, pb: 3, minHeight: "100vh" }}>
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        {q ? `Search results for ${q}` : "Search articles"}
      </Typography>
      {q ? (
        <ArticleFeed q={q} />
      ) : (
        <Typography>Enter a search term in the search field.</Typography>
      )}
    </Container>
  );
};
