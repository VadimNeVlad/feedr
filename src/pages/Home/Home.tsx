import { Box, Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { ArticleFeed } from "../../components/ArticleFeed/ArticleFeed";
import { SortingButtons } from "../../components/SortingButtons/SortingButtons";
import { NavSidebar } from "../../components/NavSidebar/NavSidebar";
import { Welcome } from "../../components/Welcome/Welcome";
import { usePaginate } from "../../hooks/usePaginate";

export const Home = () => {
  const { sortBy, handleSortChange } = usePaginate();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Container maxWidth="lg" sx={{ mt: 9, pb: 3, minHeight: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item md={3} sx={{ display: { xs: "none", md: "block" } }}>
          <Box>
            {!user && <Welcome />}
            <NavSidebar />
          </Box>
        </Grid>
        <Grid item xs={12} md={9}>
          <SortingButtons value={sortBy} handleSortChange={handleSortChange} />
          <ArticleFeed sortBy={sortBy} />
        </Grid>
      </Grid>
    </Container>
  );
};
