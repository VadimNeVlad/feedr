import { Alert, Button } from "@mui/material";
import { apiErrorMessage } from "../../utils/helpers/apiError";
export const QueryError = ({
  error,
  retry,
}: {
  error: unknown;
  retry?: () => unknown;
}) => (
  <Alert
    severity="error"
    sx={{ my: 2 }}
    action={
      retry && (
        <Button color="inherit" onClick={() => retry()}>
          Try again
        </Button>
      )
    }
  >
    {apiErrorMessage(error)}
  </Alert>
);
