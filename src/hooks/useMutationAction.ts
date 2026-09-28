import { useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RootState } from "../app/store";
import { apiErrorMessage } from "../utils/helpers/apiError";

/**
 * Requires a session (guests are sent to login and brought back afterwards)
 * and prevents duplicate submissions before React rerenders.
 */
export const useMutationAction = (action: () => Promise<unknown>) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const locked = useRef(false);

  return async () => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (locked.current) return;

    locked.current = true;

    try {
      await action();
    } catch (error) {
      toast.error(apiErrorMessage(error));
    } finally {
      locked.current = false;
    }
  };
};
