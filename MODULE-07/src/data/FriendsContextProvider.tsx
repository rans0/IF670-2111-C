import React, { useState } from "react";
import FriendsContext, { Friend } from "./friend-context";

const FriendsContextProvider: React.FC = (props) => {
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: "f1",
      avatar: "",
      name: "John Thor",
    },
  ]);

  const addFriend = (name: string, avatar: string) => {
    const newFriend: Friend = {
      id: Math.random().toString(),
      avatar: avatar,
      name: name,
    };

    setFriends((currFriends: Friend[]) => {
      return currFriends.concat(newFriend);
    });
  };

  const editFriend = () => {};
  const deleteFriend = () => {};

  return (
    <FriendsContext.Provider
      value={{
        friends,
        addFriend,
        editFriend,
        deleteFriend,
      }}
    >
      {props.children}
    </FriendsContext.Provider>
  );
};

export default FriendsContextProvider;
