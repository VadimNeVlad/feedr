import {
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../features/users/usersApi";
import { useMutationAction } from "./useMutationAction";

export const useFollowUser = (
  target: { id: string; isFollowing?: boolean },
): [isFollowing: boolean, toggle: () => Promise<void>, isPending: boolean] => {
  const [follow, following] = useFollowUserMutation();
  const [unfollow, unfollowing] = useUnfollowUserMutation();
  const isFollowing = target.isFollowing ?? false;

  const toggle = useMutationAction(() =>
    (isFollowing ? unfollow(target.id) : follow(target.id)).unwrap()
  );

  return [isFollowing, toggle, following.isLoading || unfollowing.isLoading];
};
