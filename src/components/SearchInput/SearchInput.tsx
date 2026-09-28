import { FormEvent } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, TextField } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";

type SearchInputProps = {
  placeholder: string;
  /** Handles the query in place; without it the query opens the article search page. */
  onSearch?: (query: string) => void;
};

export const SearchInput = ({ placeholder, onSearch }: SearchInputProps) => {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = String(new FormData(event.currentTarget).get("q") ?? "").trim();

    if (onSearch) onSearch(q);
    else navigate({ pathname: "/search", search: `?${createSearchParams({ q })}` });
  };

  return (
    <Box
      component="form"
      role="search"
      onSubmit={handleSubmit}
      sx={{ width: "100%" }}
    >
      <TextField
        name="q"
        type="search"
        placeholder={placeholder}
        inputProps={{ "aria-label": placeholder }}
        variant="outlined"
        size="small"
        sx={{ bgcolor: "background.paper", width: "100%" }}
        InputProps={{
          endAdornment: (
            <IconButton type="submit" aria-label="Search">
              <SearchIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
};
