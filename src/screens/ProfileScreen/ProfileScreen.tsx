import './ProfileScreen.css';
import {Button} from "../../components/Button/Button";
import {Header} from "../../components/Header/Header";
import {CreatePost} from "../../components/CreatePost/CreatePost";
import {useParams} from "react-router-dom";
import { observer } from "mobx-react-lite";
import UserStore from "../../stores/UserStore";
import {useEffect, useState} from "react";
import {usersList} from "../../mocks/apiMocks";
import {UserInfo} from "../../interfaces/interfaces";
import image from '../../static/img/ava.png';

enum isFriend {
    unset = 0,
    friend = 1,
    notFriend = 2,
}

export const ProfileScreen = observer(() => {
    const params = useParams();
    const [isUserFriend, setIsUserFriend] = useState<isFriend>(isFriend.unset);
    let user: UserInfo;

    useEffect(() => {
        if (UserStore.id != +(params?.id)!) {
            const url = 'https://www.boredapi.com/api/activity';
            // запрос информации о пользователе
            fetch(url)
                .then((res) => res.json())
                .then((res) => {
                    const randUserCounter = Math.floor(Math.random() * 10);
                    user = usersList[randUserCounter];
                    setIsUserFriend(user.isFriend ? isFriend.friend : isFriend.notFriend);
                })
                .catch((error) => console.log(`Ошибка: ${error}`));
        }
        else {
            user = {id: UserStore.id, name: UserStore.name, age: UserStore.age, avatar: image, university: UserStore.university};
        }
    });

    const onAddFriendButtonClick = () => {
        let url = '';
        if (isUserFriend === isFriend.notFriend) {
            url = 'https://www.boredapi.com/api/activity';
        } else if (isUserFriend === isFriend.friend) {
            // другой запрос на удаление
            url = 'https://www.boredapi.com/api/activity';
        }
        fetch(url)
            .then((res) => {
                setIsUserFriend(user.isFriend ? isFriend.notFriend : isFriend.friend);
            })
            .catch((error) => console.log(`Ошибка: ${error}`));
    };

    return (
        <>
            <Header isAuthorized={true}/>
            <main className="profile">
                {/*TODO fix 500px*/}
                <img width="500px" className="profile__avatar" src={UserStore.avatar} alt="avatar"/>
                <div className="profile__info">
                        <h2>{UserStore.name}</h2>
                        <p>{'Возраст: ' + UserStore.age}</p>
                        <p>{'Вуз: ' + UserStore.university}</p>
                    {
                        UserStore.id == +(params?.id)! ?
                            <CreatePost/> :
                                isUserFriend !== isFriend.unset &&
                                <Button
                                    onClick={onAddFriendButtonClick}
                                    text={!isUserFriend ? 'Добавить в друзья' : 'Удалить из друзей'}
                                />
                    }
                </div>
            </main>
        </>
    );
});
