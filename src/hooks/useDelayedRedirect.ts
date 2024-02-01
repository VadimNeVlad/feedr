import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useDelayedRedirect = (
  isSuccess: boolean,
  error: FetchBaseQueryError | SerializedError | undefined,
  toastMsg: string
) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(toastMsg);

      const redirect = setTimeout(() => {
        navigate("/");
      }, 2000);

      return () => clearTimeout(redirect);
    } else if (error) {
      const err = (error as FetchBaseQueryError).data as Error;
      toast.error(err.message);
    }
  }, [isSuccess, navigate, error, toastMsg]);
};
