import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, TextField } from "@mui/material";
import { SearchInputProps } from "../../utils/types/props";
import { createSearchParams, useNavigate } from "react-router-dom";

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  inputRef,
  isGeneralSearch = false,
  setSearchValue,
}) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    setSearchValue?.(inputRef.current?.value as string);

    if (isGeneralSearch) {
      navigate({
        pathname: "/search",
        search: `?${createSearchParams({
          q: inputRef.current?.value as string,
        })}`,
      });
    }
  };

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
          <IconButton type="submit" onClick={onClickHandler}>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
};
