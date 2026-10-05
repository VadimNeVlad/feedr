import { ToggleButton, ToggleButtonGroup } from "@mui/material";

interface SortingButtonsProps {
  value: string;
  handleSortChange: (value: string) => void;
}

export const SortingButtons = ({
  value,
  handleSortChange,
}: SortingButtonsProps) => {
  return (
    <ToggleButtonGroup
      value={value}
      color="primary"
      size="medium"
      exclusive
      sx={{ mb: 2 }}
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
