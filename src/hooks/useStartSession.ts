import { useDispatch } from "react-redux";
import { Location, useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../features/auth/authSlice";
import { AuthResponse } from "../utils/types/auth";

/** Stores a new session and returns to the page that required signing in. */
export const useStartSession = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: Location } | null)?.from;

  return (session: AuthResponse) => {
    dispatch(setUser(session));
    navigate(from ? from.pathname + from.search : "/", { replace: true });
  };
};
