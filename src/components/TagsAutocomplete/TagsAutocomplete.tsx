import { Autocomplete, Chip, TextField } from "@mui/material";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useGetTagsQuery } from "../../features/tags/tagsApi";
import { useDebounce } from "../../hooks/useDebounce";
import { TagsAutocompleteProps } from "../../utils/types/props";

export const TagsAutocomplete: React.FC<TagsAutocompleteProps> = ({
  control,
  disabled = false,
  defaultValues,
  setTags,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data } = useGetTagsQuery(debouncedSearchQuery, {
    skip: !debouncedSearchQuery,
  });

  return (
    <Controller
      control={control}
      name="tagList"
      defaultValue={defaultValues || []}
      render={({ field }) => (
        <Autocomplete
          {...field}
          multiple
          freeSolo
          autoSelect
          defaultValue={[]}
          value={field.value}
          disabled={disabled}
          options={data?.map((option) => option.name) || []}
          onChange={(_, value) => {
            field.onChange(value);
            setTags?.(value.join(","));
          }}
          disableCloseOnSelect
          filterSelectedOptions
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Tags"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
        />
      )}
    />
  );
};
