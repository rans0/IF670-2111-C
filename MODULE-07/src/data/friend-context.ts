import React from "react";

export interface Friend {
  id: string;
  avatar: string;
  name: string;
}

interface Context {
  friends: Friend[];
  addFriend: (friendName: string, friendAvatar: string) => void;
  editFriend: () => void;
  deleteFriend: () => void;
}

const FriendsContext = React.createContext<Context>({
  friends: [],
  addFriend: () => {},
  editFriend: () => {},
  deleteFriend: () => {},
});

export default FriendsContext;
