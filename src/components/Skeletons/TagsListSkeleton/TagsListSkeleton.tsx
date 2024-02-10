import { Card, CardContent, Grid, Skeleton } from "@mui/material";
import React from "react";

export const TagsListSkeleton: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(8)].map((_, index) => (
        <Grid item xs={3} key={index}>
          <Card>
            <CardContent>
              <Skeleton
                variant="text"
                sx={{ fontSize: "23px", width: "150px", mt: 3, mb: 2 }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "23px", width: "170px" }}
              />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
