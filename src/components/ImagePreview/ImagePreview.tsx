import { Box, Button } from "@mui/material";
import React from "react";
import { ImagePreviewProps } from "../../utils/types/props";

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  preview,
  fileRef,
  handlePreview,
  handleClearPreview,
}) => {
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
          src={preview}
        />
      )}
      <Box>
        <Button
          variant="outlined"
          component="label"
          sx={{ mr: 1 }}
          onClick={() => fileRef.current?.click()}
        >
          {preview ? "Change image" : "Add a cover image"}
        </Button>
        {preview && (
          <Button
            variant="text"
            color="error"
            component="label"
            onClick={handleClearPreview}
          >
            Remove Image
          </Button>
        )}
      </Box>
    </Box>
  );
};
