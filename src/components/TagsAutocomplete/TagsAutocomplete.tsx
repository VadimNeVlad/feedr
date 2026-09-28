import { Autocomplete, Chip, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, Control } from "react-hook-form";
import { useGetTagsQuery } from "../../features/tags/tagsApi";
import { useDebounce } from "../../hooks/useDebounce";
import { ArticleFormFields } from "../../utils/validators/articleSchema";

export const TagsAutocomplete = ({
  control,
}: {
  control: Control<ArticleFormFields>;
}) => {
  const [search, setSearch] = useState("");
  const q = useDebounce(search, 500);
  const { currentData: data } = useGetTagsQuery({ q }, { skip: !q });

  return (
    <Controller
      control={control}
      name="tagList"
      render={({ field, fieldState }) => (
        <Autocomplete
          multiple
          freeSolo
          autoSelect
          value={field.value}
          options={data?.map((t) => t.name) || []}
          onBlur={field.onBlur}
          onChange={(_, value) =>
            field.onChange([
              ...new Set(value.map((t) => t.trim()).filter(Boolean)),
            ])
          }
          renderTags={(value, getProps) =>
            value.map((tag, index) => {
              const { key, ...props } = getProps({ index });

              return <Chip key={key} label={tag} {...props} />;
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tags"
              onChange={(e) => setSearch(e.target.value)}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
    />
  );
};
