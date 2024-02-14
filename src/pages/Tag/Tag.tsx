import React from "react";
import { Layout } from "../../components/Layout/Layout";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetTagArticlesQuery } from "../../features/tags/tagsApi";
import { ArticlesList } from "../../components/ArticlesList/ArticlesList";
import { SortingButtons } from "../../components/SortingButtons/SortingButtons";
import { usePaginate } from "../../hooks/usePaginate";
import { generateColor } from "../../utils/helpers/generateColor";

export const Tag: React.FC = () => {
  const { tagName } = useParams();
  const { page, sortBy, handleNextPage, handleSortChange } = usePaginate();
  const { data: data, isLoading } = useGetTagArticlesQuery({
    tagName,
    page,
    sortBy,
  });

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 9, pb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box
                  sx={{
                    width: "105%",
                    height: "20px",
                    bgcolor: generateColor(tagName as string),
                    ml: "-16px",
                    mt: "-16px",
                    mb: 3,
                  }}
                ></Box>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  textTransform={"capitalize"}
                  sx={{ mb: 2 }}
                >
                  {tagName}
                </Typography>

                {isLoading && (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "17px", width: "270px" }}
                  />
                )}

                {!isLoading && data && (
                  <Typography variant="body1" color="text.secondary">
                    {data._count.articles}
                    {data._count.articles === 1 ? " Article " : " Articles "}
                    published
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <SortingButtons
              value={sortBy}
              handleSortChange={handleSortChange}
            />
            <ArticlesList
              articles={data?.articles}
              isLoading={isLoading}
              articlesCount={data?._count.articles as number}
              handleNextPage={handleNextPage}
            />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
