import './FriendCard.css';
import {Button} from "../Button/Button";
import {useState} from "react";
import image from "../../static/img/ava.png";

interface FriendCardProps {
    id: number;
    name: string;
    age: number;
    university: string;
    avatar: string;
}

export const FriendCard = ({id, name, age, avatar, university}: FriendCardProps) => {
    const [isDeleted, setFriendIsDeleted] = useState(false);

    const onDeleteButtonClick = () => {
        let url = '';
        if (!isDeleted) {
            url = 'https://www.boredapi.com/api/activity';
        } else {
            // другой запрос на отмену удаления
            url = 'https://www.boredapi.com/api/activity';
        }
        fetch(url)
            .then((res) => {
                setFriendIsDeleted(!isDeleted);
            })
            .catch((error) => console.log(`Ошибка: ${error}`));
    };

    return (
        <div className="friendCard">
            {/*TODO уюрать 200px*/}
            <img className="friendCard__avatar" src={avatar} alt={'avatar' + id}/>
            <div className="friendCard__infoContainer">
                <strong>{name}</strong>
                <p>{'Возраст: ' + age}</p>
                <p>{'Вуз: ' + university}</p>
                <Button text={!isDeleted ? 'Удалить' : 'Отменить'} onClick={onDeleteButtonClick}/>
            </div>
        </div>
    );
};
