import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { ArticleFeed } from "../../components/ArticleFeed/ArticleFeed";
import { SortingButtons } from "../../components/SortingButtons/SortingButtons";
import { usePaginate } from "../../hooks/usePaginate";

export const Tag = () => {
  const { tagName } = useParams();
  const { sortBy, handleSortChange } = usePaginate();

  return (
    <Container maxWidth="lg" sx={{ mt: 9, pb: 3, minHeight: "100vh" }}>
      <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
        #{tagName}
      </Typography>
      <SortingButtons value={sortBy} handleSortChange={handleSortChange} />
      {tagName && <ArticleFeed kind="tag" tagName={tagName} sortBy={sortBy} />}
    </Container>
  );
};
