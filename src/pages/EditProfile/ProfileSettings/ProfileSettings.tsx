import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation,
} from "../../../features/users/usersApi";
import { QueryError } from "../../../components/QueryError/QueryError";
import { toast } from "react-toastify";
import { apiErrorMessage } from "../../../utils/helpers/apiError";
import { User } from "../../../utils/types/user";

type ProfileFields = {
  name: string;
  websiteUrl: string;
  location: string;
  bio: string;
};

const optionalFields = [
  { name: "websiteUrl", label: "Website URL", limit: 2048 },
  { name: "location", label: "Location", limit: 100 },
  { name: "bio", label: "Bio", limit: 1000 },
] as const;

export const ProfileSettings = () => {
  const query = useGetCurrentUserQuery();

  if (!query.currentData) {
    if (query.isError) {
      return <QueryError error={query.error} retry={query.refetch} />;
    }

    return <CircularProgress aria-label="Loading profile" />;
  }

  return (
    <>
      {query.isError && <QueryError error={query.error} retry={query.refetch} />}
      <ProfileForm key={query.currentData.id} user={query.currentData} />
    </>
  );
};

function ProfileForm({ user }: { user: User }) {
  const [update, { isLoading }] = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<ProfileFields>({
    defaultValues: profileFields(user),
  });
  const values = watch();

  const onSubmit = async (data: ProfileFields) => {
    if (isLoading) return;

    try {
      const result = await update({
        name: data.name.trim(),
        websiteUrl: data.websiteUrl.trim(),
        location: data.location.trim(),
        bio: data.bio.trim(),
      }).unwrap();
      reset(profileFields(result));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(apiErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader title="Profile information" />
        <CardContent>
          <TextField
            fullWidth
            label="Name"
            autoComplete="name"
            sx={{ mb: 3 }}
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name", {
              validate: (value) => !!value.trim() || "Name is required",
              maxLength: { value: 100, message: "Maximum 100 characters" },
            })}
          />
          <TextField
            fullWidth
            label="Email"
            value={user.email ?? ""}
            disabled
            sx={{ mb: 3 }}
          />
          {optionalFields.map(({ name: field, label, limit }) => (
            <TextField
              key={field}
              fullWidth
              label={label}
              multiline={field === "bio"}
              minRows={field === "bio" ? 2 : undefined}
              sx={{ mb: 3 }}
              error={!!errors[field]}
              helperText={
                errors[field]?.message ||
                `${values[field]?.length || 0}/${limit}`
              }
              {...register(field, {
                maxLength: {
                  value: limit,
                  message: `Maximum ${limit} characters`,
                },
                validate: field === "websiteUrl" ? validateWebsite : undefined,
              })}
            />
          ))}
          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            loading={isLoading || isSubmitting}
            disabled={!isDirty}
          >
            Save profile information
          </LoadingButton>
        </CardContent>
      </Card>
    </form>
  );
}

function profileFields(user: User): ProfileFields {
  return {
    name: user.name,
    websiteUrl: user.websiteUrl ?? "",
    location: user.location ?? "",
    bio: user.bio ?? "",
  };
}

function validateWebsite(value: string) {
  if (!value.trim()) return true;

  try {
    return (
      ["http:", "https:"].includes(new URL(value.trim()).protocol) ||
      "Use an HTTP or HTTPS URL"
    );
  } catch {
    return "Enter a valid website URL";
  }
}
