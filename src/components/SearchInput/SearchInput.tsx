import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, TextField } from "@mui/material";
import { SearchInputProps } from "../../utils/types/props";

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  inputRef,
  setSearchValue,
}) => {
  return (
    <TextField
      inputRef={inputRef}
      type="text"
      placeholder={placeholder}
      variant="outlined"
      size="small"
      sx={{ bgcolor: "background.paper" }}
      InputProps={{
        endAdornment: (
          <IconButton
            type="submit"
            onClick={() => setSearchValue(inputRef.current?.value as string)}
          >
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
};
