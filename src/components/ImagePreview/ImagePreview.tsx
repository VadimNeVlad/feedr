import { Box, Button } from "@mui/material";
import React from "react";

interface ImagePreviewProps {
  preview: string;
  fileRef: React.RefObject<HTMLInputElement>;
  handlePreview: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearPreview: () => void;
}

export const ImagePreview = ({
  preview,
  fileRef,
  handlePreview,
  handleClearPreview,
}: ImagePreviewProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        mb: 2,
      }}
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        style={{ display: "none" }}
        onChange={(e) => handlePreview(e)}
      />
      {preview && (
        <Box
          component="img"
          sx={{
            width: 200,
            height: 200,
            objectFit: "contain",
            mr: { xs: 0, sm: 2 },
          }}
          alt="Article cover preview"
          src={preview}
        />
      )}
      <Box>
        <Button
          variant="outlined"
          sx={{ mr: 1 }}
          onClick={() => fileRef.current?.click()}
        >
          {preview ? "Change image" : "Add a cover image"}
        </Button>
        {preview && (
          <Button variant="text" color="error" onClick={handleClearPreview}>
            Remove Image
          </Button>
        )}
      </Box>
    </Box>
  );
};
