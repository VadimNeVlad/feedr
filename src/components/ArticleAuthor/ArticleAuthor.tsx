import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { trimFirstLetter } from "../../utils/helpers/trimString";
import { formatDate } from "../../utils/helpers/formatDate";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import { useFollowUser } from "../../hooks/useFollowUser";
import { generateColor } from "../../utils/helpers/generateColor";
import { userPath } from "../../utils/helpers/routes";
import { User } from "../../utils/types/user";

type ArticleAuthorProps = {
  author: User;
};

export const ArticleAuthor = ({ author }: ArticleAuthorProps) => {
  const [isFollow, toggleFollow, isPending] = useFollowUser(author);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Card>
      <Box
        sx={{
          width: "100%",
          height: "20px",
          bgcolor: generateColor(author.name),
        }}
      />
      <CardHeader
        component={Link}
        to={userPath(author.id)}
        avatar={
          <Avatar src={author.image} sx={{ width: "46px", height: "46px" }}>
            {trimFirstLetter(author.name)}
          </Avatar>
        }
        titleTypographyProps={{ variant: "h6", fontWeight: 700, fontSize: 18 }}
        title={author.name}
      />

      <CardContent sx={{ pt: 0 }}>
        {user?.id !== author.id && (
          <Button
            disabled={isPending}
            aria-pressed={isFollow}
            variant={!isFollow ? "contained" : "outlined"}
            onClick={toggleFollow}
            sx={{ width: "100%", mb: 2 }}
            data-testid="follow-button"
          >
            {!isFollow ? "Follow" : "Unfollow"}
          </Button>
        )}

        {author.bio && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            {author.bio}
          </Typography>
        )}

        {author.location && (
          <>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              textTransform="uppercase"
              fontSize={14}
            >
              Location
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              {author.location}
            </Typography>
          </>
        )}

        <Typography
          variant="subtitle2"
          fontWeight={700}
          textTransform="uppercase"
          fontSize={14}
        >
          Joined
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {formatDate(author.createdAt, false)}
        </Typography>
      </CardContent>
    </Card>
  );
};
