import { User } from "./user";

export interface Follow {
  followerId: string;
  followingId: string;
  follower: User;
  following: User;
}

export interface FollowParams {
  id: string;
  perPage?: number;
}
