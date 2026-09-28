import { Card, CardContent, Grid, Skeleton } from "@mui/material";

export const TagsListSkeleton = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(8)].map((_, index) => (
        <Grid item key={index} xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Skeleton
                variant="text"
                sx={{
                  fontSize: { xs: "20px", md: "23px" },
                  width: "150px",
                  mt: { xs: 1, md: 2 },
                  mb: { xs: 1, md: 1.5 },
                }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: { xs: "19px", md: "23px" }, width: "170px" }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
