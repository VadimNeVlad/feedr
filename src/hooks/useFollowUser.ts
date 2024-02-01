import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { User } from "../utils/types/user";

export const useFollowUser = (
  user: User
): [boolean, (value: boolean) => void] => {
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const isCurrentUserFollowing = useMemo(
    () =>
      user.followers.some((following) =>
        currentUser ? following.followerId === currentUser.id : null
      ),
    [user.followers, currentUser]
  );

  const [isFollow, setIsFollow] = useState(isCurrentUserFollowing);

  return [isFollow, setIsFollow];
};
