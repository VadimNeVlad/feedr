import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface ProfileCountInfoProps {
  commentsCount: number;
  articlesCount: number;
}

export const ProfileCountInfo = ({
  commentsCount,
  articlesCount,
}: ProfileCountInfoProps) => {
  return (
    <Card sx={{ display: { xs: "none", md: "block" } }}>
      <CardContent sx={{ pt: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <ArticleOutlinedIcon color="action" />
          <Typography fontSize="15px">
            {articlesCount} posts published
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CommentOutlinedIcon color="action" />
          <Typography fontSize="15px">
            {commentsCount} comments written
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
