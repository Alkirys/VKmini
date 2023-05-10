import './FriendsScreen.css';
import {Header} from "../../components/Header/Header";
import {FriendCard} from "../../components/FriendCard/FriendCard";
import {useEffect, useState} from "react";
import {usersList} from '../../mocks/apiMocks';
import {UserInfo} from "../../interfaces/interfaces";

export const FriendsScreen = () => {
    const [friends, setFriends] = useState<UserInfo[]>([]);

    useEffect(() => {
        // запрос списка друзей
        const url = 'https://www.boredapi.com/api/activity';
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                res = usersList;
                setFriends(usersList)
            })
            .catch((error) => console.log(`Ошибка: ${error}`));
    });

    return (
      <>
          <Header isAuthorized={true}/>
          <main className="friendsList">
              {friends.map((friend) => {
                  return (
                      <FriendCard
                          key={'user' + friend.id}
                          id={friend.id}
                          name={friend.name}
                          age={friend.age}
                          university={friend.university}
                          avatar={friend.avatar}
                      />
                  );
              })}
          </main>
      </>
    );
};
