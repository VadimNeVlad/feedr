import React from "react";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { EditorToolbarProps } from "../../../utils/types/props";

export const HeadingToolbarButtons: React.FC<EditorToolbarProps> = ({
  editor,
}) => {
  return (
    <ToggleButtonGroup size="small" exclusive aria-label="text alignment">
      <ToggleButton
        value="h1"
        aria-label="H1 Text"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        selected={editor.isActive("heading", { level: 1 })}
      >
        <Typography fontWeight={900}>H1</Typography>
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        selected={editor.isActive("heading", { level: 2 })}
        value="h2"
        aria-label="H2 Text"
      >
        <Typography fontWeight={800}>H2</Typography>
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        selected={editor.isActive("heading", { level: 3 })}
        value="h3"
        aria-label="H3 Text"
      >
        <Typography fontWeight={800}>H3</Typography>
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        selected={editor.isActive("heading", { level: 4 })}
        value="h4"
        aria-label="H4 Text"
      >
        <Typography fontWeight={700}>H4</Typography>
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        selected={editor.isActive("heading", { level: 5 })}
        value="h5"
        aria-label="H5 Text"
      >
        <Typography fontWeight={600}>H5</Typography>
      </ToggleButton>
      <ToggleButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        selected={editor.isActive("heading", { level: 6 })}
        value="h6"
        aria-label="H6 Text"
      >
        <Typography fontWeight={500}>H6</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
