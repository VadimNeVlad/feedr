import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Tag } from "../../utils/types/tag";
import { generateColor } from "../../utils/helpers/generateColor";
import { tagPath } from "../../utils/helpers/routes";

type ArticleTagItemProps = {
  tag: Pick<Tag, "name">;
};

export const ArticleTagItem = ({ tag }: ArticleTagItemProps) => (
  <Button
    component={Link}
    to={tagPath(tag.name)}
    variant="outlined"
    size="small"
    color="inherit"
    sx={{ fontSize: 12, color: generateColor(tag.name) }}
  >
    #{tag.name}
  </Button>
);
