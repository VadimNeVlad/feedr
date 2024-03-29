import React from "react";
import { EditorToolbarProps } from "../../../utils/types/props";
import { Divider, Paper, ToggleButton, ToggleButtonGroup } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import UndoIcon from "@mui/icons-material/Undo";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import RedoIcon from "@mui/icons-material/Redo";
import CodeIcon from "@mui/icons-material/Code";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import ClearIcon from "@mui/icons-material/Clear";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import FormatTextdirectionRToLIcon from "@mui/icons-material/FormatTextdirectionRToL";
import FormatStrikethroughIcon from "@mui/icons-material/FormatStrikethrough";
import SubscriptIcon from "@mui/icons-material/Subscript";
import SuperscriptIcon from "@mui/icons-material/Superscript";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { HeadingToolbarButtons } from "../HeadingToolbarButtons/HeadingToolbarButtons";

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ editor }) => {
  if (!editor) null;

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          position: "sticky",
          top: 10,
          zIndex: 10,
        }}
      >
        <HeadingToolbarButtons editor={editor} />
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
        <ToggleButtonGroup
          size="small"
          exclusive
          aria-label="text alignment"
          sx={{ flexWrap: "wrap" }}
        >
          <ToggleButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            selected={editor.isActive({ textAlign: "left" })}
            value="left"
            aria-label="left aligned"
          >
            <FormatAlignLeftIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            selected={editor.isActive({ textAlign: "center" })}
            value="center"
            aria-label="Center aligned"
          >
            <FormatAlignCenterIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            selected={editor.isActive({ textAlign: "right" })}
            value="right"
            aria-label="Right aligned"
          >
            <FormatAlignRightIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            selected={editor.isActive({ textAlign: "justify" })}
            value="justify"
            aria-label="Justify aligned"
          >
            <FormatAlignJustifyIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

        <ToggleButtonGroup
          size="small"
          aria-label="text formatting"
          sx={{ flexWrap: "wrap" }}
        >
          <ToggleButton
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            selected={editor.isActive("superscript")}
            value="superscript"
            aria-label="superscript"
          >
            <SuperscriptIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            selected={editor.isActive("subscript")}
            value="subscript"
            aria-label="subscript"
          >
            <SubscriptIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            selected={editor.isActive("bold")}
            value="bold"
            aria-label="bold"
          >
            <FormatBoldIcon />
          </ToggleButton>

          <ToggleButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            value="italic"
            aria-label="italic"
            selected={editor.isActive("italic")}
          >
            <FormatItalicIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            value="strike"
            aria-label="strike"
            selected={editor.isActive("strike")}
          >
            <FormatStrikethroughIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            value="code"
            aria-label="code"
            selected={editor.isActive("code")}
          >
            <CodeIcon />
          </ToggleButton>

          <ToggleButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            value="highlight"
            aria-label="highlight"
            selected={editor.isActive("highlight")}
          >
            <BorderColorIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            value="blockQuote"
            aria-label="blockQuote"
            selected={editor.isActive("blockQuote")}
          >
            <FormatQuoteIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            selected={editor.isActive("HorizontalRule")}
            value="HorizontalRule"
            aria-label="HorizontalRule"
          >
            <HorizontalRuleIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            selected={editor.isActive("paragraph")}
            value="paragraph"
            aria-label="paragraph"
          >
            <FormatTextdirectionRToLIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            selected={editor.isActive("underline")}
            value="underline"
            aria-label="underline"
          >
            <FormatUnderlinedIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              const previousUrl = editor.getAttributes("link").href;
              const url = window.prompt("URL", previousUrl);

              // cancelled
              if (url === null) {
                return;
              }

              // empty
              if (url === "") {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .unsetLink()
                  .run();

                return;
              }

              // update link
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
            }}
            selected={editor.isActive("link")}
            value="link"
            aria-label="link"
          >
            <LinkIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            value="bullettList"
            aria-label="bullettList"
            selected={editor.isActive("bulletList")}
          >
            <FormatListBulletedIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            value="orderedList"
            aria-label="orderedList"
            selected={editor.isActive("orderedList")}
          >
            <FormatListNumberedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

        <ToggleButtonGroup
          size="small"
          exclusive
          aria-label="text alignment"
          sx={{ flexWrap: "wrap" }}
        >
          <ToggleButton
            onClick={() => editor.chain().focus().undo().run()}
            value="undo"
            aria-label="undo"
          >
            <UndoIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().redo().run()}
            value="redo"
            aria-label="redo"
          >
            <RedoIcon />
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

        <ToggleButtonGroup
          size="small"
          exclusive
          aria-label="text alignment"
          sx={{ flexWrap: "wrap" }}
        >
          <ToggleButton
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            value="clear-mark"
            aria-label="clear-mark"
          >
            <LayersClearIcon />
          </ToggleButton>
          <ToggleButton
            onClick={() => editor.chain().focus().clearNodes().run()}
            value="clear-node"
            aria-label="clear-node"
          >
            <ClearIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>
    </>
  );
};
