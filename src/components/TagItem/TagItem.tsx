import { tagPath } from "../../utils/helpers/routes";
import { Tag } from "../../utils/types/tag";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { generateColor } from "../../utils/helpers/generateColor";

interface TagItemProps {
  tag: Tag;
}

export const TagItem = ({ tag }: TagItemProps) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Link to={tagPath(tag.name)}>
        <Card>
          <CardContent>
            <Box
              sx={{
                width: "2000px",
                height: { xs: "10px", md: "20px" },
                bgcolor: generateColor(tag.name),
                ml: "-16px",
                mt: "-16px",
                mb: { xs: 2.5, md: 3 },
              }}
            ></Box>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ mb: { xs: 1, md: 2 } }}
            >
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
