import React from "react";
import { Link } from "react-router-dom";
import { ArticleTagItemProps } from "../../utils/types/props";
import { Button } from "@mui/material";
import { generateColor } from "../../utils/helpers/generateColor";

export const ArticleTagItem: React.FC<ArticleTagItemProps> = ({ tag }) => {
  return (
    <Link to={`/tag/${tag.name}`} key={tag.name}>
      <Button
        variant="outlined"
        size="small"
        color="inherit"
        sx={{ mr: 0.5, fontSize: 12, color: generateColor(tag.name) }}
      >
        #{tag.name}
      </Button>
    </Link>
  );
};
