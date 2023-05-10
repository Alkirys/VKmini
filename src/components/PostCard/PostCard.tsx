import './PostCard.css';
import {Button} from "../Button/Button";
import {useState} from "react";

interface PostCardProps {
    id: number
    image?: string | null;
    text: string;
    likes: number;
    owner: string;
    date: string;
    isLiked: boolean;
}

export const PostCard = ({id, image, date, likes, owner, text, isLiked}: PostCardProps) => {
    const [likesCounter, setLikesCounter] = useState(likes);
    const [wasLiked, setPostWasLiked] = useState(isLiked);

    const onLikeClick = () => {
        let url = '';
        if (wasLiked) {
            // запрос на отмену лайка по id поста
            const postId = id;
            url = 'https://www.boredapi.com/api/activity';
            fetch(url)
                .then((res) => {
                    setLikesCounter(likesCounter - 1);
                })
                .catch((error) => console.log(`Ошибка: ${error}`));
        } else {
            // запрос на добавление лайка по id поста
            const postId = id;
            url = 'https://www.boredapi.com/api/activity';
            fetch(url)
                .then((res) => {
                    setLikesCounter(likesCounter + 1);
                })
                .catch((error) => console.log(`Ошибка: ${error}`));
        }
        setPostWasLiked(!wasLiked);
    };

    return (
        <div className="postCard">
            <div className="postCard__content">
                {/*TODO убрать 300px*/}
                {image && <img height="120px" className="postCard__image" src={image} alt="postImage"/>}
                <p className="postCard__text">{text}</p>
            </div>
            <div className="postCard__info">
                <p className="postCard__text">{owner + ' от ' + date}</p>
                <p className="postCard__text">{likesCounter + ' likes'}</p>
                <Button text={wasLiked ? '-1' : '+1'} onClick={onLikeClick}/>
            </div>
        </div>
    );
};
