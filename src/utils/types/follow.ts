import { User } from "./user";

export interface Follow {
  followerId: string;
  followingId: string;
  follower: User;
  following: User;
}
