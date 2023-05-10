import './CreatePost.css';
import {Button} from "../Button/Button";
import {FormEventHandler, MouseEventHandler, useRef, useState} from "react";
import {FileInput} from "../FileInput/FileInput";

export const CreatePost = () => {
    const [isCreating, setIsCreating] = useState(false);
    const ref = useRef<HTMLInputElement>(null);
    const [postText, setPostText] = useState('');

    const onButtonClick = (evt: SubmitEvent) => {
        setIsCreating(!isCreating);
    }

    return (
        <div className="createPost">
            {!isCreating && <Button
                text={'Создать пост'}
                onClick={(onButtonClick as unknown as MouseEventHandler<HTMLButtonElement>)}
            />}
            {
                isCreating &&
                <form className="createPost__container" onSubmit={(evt) => {
                    evt.preventDefault();
                    const fData = new FormData();
                    fData.append('photo', (ref.current as unknown as HTMLInputElement)?.files![0]);
                    fData.append('text', postText);

                    const url = 'https://www.boredapi.com/api/activity';

                    // иммитация запроса
                    // fetch(url, {
                    //     method: "POST",
                    //     body: fData
                    // });

                    fetch(url)
                        .then((res) => res.json())
                        .then((res) => {
                            setIsCreating(!isCreating);
                        })
                        .catch((error) => console.log(`Ошибка: ${error}`));
                }}>
                    <Button
                        text={'Опубликовать'}
                        isFormButton={true}
                    />
                    <textarea value={postText} className="createPost__text" onChange={(evt) => setPostText(evt.target.value)}></textarea>
                    <FileInput ref={ref}/>
                </form>
            }
        </div>
    );
};
