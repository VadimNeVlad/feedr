import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import React from "react";
import { SortingButtonsProps } from "../../utils/types/props";

export const SortingButtons: React.FC<SortingButtonsProps> = ({
  value,
  handleSortChange,
}) => {
  return (
    <ToggleButtonGroup
      value={value}
      color="primary"
      size="medium"
      exclusive
      sx={{ mb: 4 }}
    >
      <ToggleButton value="latest" onClick={() => handleSortChange("latest")}>
        Latest
      </ToggleButton>
      <ToggleButton value="oldest" onClick={() => handleSortChange("oldest")}>
        Oldest
      </ToggleButton>
      <ToggleButton value="top" onClick={() => handleSortChange("top")}>
        Top
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
