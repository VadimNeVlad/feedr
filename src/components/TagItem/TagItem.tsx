import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { TagItemProps } from "../../utils/types/props";

export const TagItem: React.FC<TagItemProps> = ({ tag }) => {
  return (
    <Grid item xs={3} key={tag.id}>
      <Link to={`/tag/${tag.name}`}>
        <Card>
          <CardContent>
            <Box
              sx={{
                width: "115%",
                height: "20px",
                bgcolor: "#000",
                ml: "-16px",
                mt: "-16px",
                mb: 3,
              }}
            ></Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              #{tag.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {tag._count.articles}
              {tag._count.articles === 1 ? " article" : " articles"}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};
