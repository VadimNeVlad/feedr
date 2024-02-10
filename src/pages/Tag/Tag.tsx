import React, { useEffect, useState } from "react";
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
import { usePaginate } from "../../utils/types/usePaginate";

export const Tag: React.FC = () => {
  const { tagName } = useParams();

  const [customFetching, setCustomFetching] = useState(true);

  const { page, sortBy, handleNextPage, handleSortChange } = usePaginate();

  const {
    data: data,
    isFetching,
    status,
  } = useGetTagArticlesQuery(
    {
      tagName,
      page,
      sortBy,
    },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (status === "fulfilled") setCustomFetching(false);
    if (status === "pending" && page === 0) setCustomFetching(true);
  }, [status, page]);

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
                    bgcolor: "#000",
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

                {isFetching && (
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "17px", width: "270px" }}
                  />
                )}

                {!isFetching && data && (
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
              isFetching={customFetching}
              articlesCount={data?._count.articles as number}
              handleNextPage={handleNextPage}
            />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};
