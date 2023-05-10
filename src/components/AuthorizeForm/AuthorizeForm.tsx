import './AuthorizeForm.css';
import {Button} from "../Button/Button";
import {MouseEventHandler, useRef, useState} from "react";
import {FileInput} from "../FileInput/FileInput";
import {useNavigate} from "react-router-dom";
import image from '../../static/img/ava.png';
import UserStore from "../../stores/UserStore";
import {usersList} from "../../mocks/apiMocks";

const AuthInputs = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    return (
        <form className="form__inputsContainer" onSubmit={(evt) => {
            evt.preventDefault();
            const fData = new FormData();
            fData.append('login', login);
            fData.append('password', password);

            const url = 'https://www.boredapi.com/api/activity';

            // иммитация запроса
            // fetch(url, {
            //     method: "POST",
            //     body: fData
            // });

            fetch(url)
                .then((res) => res.json())
                .then((res) => {
                    const randomUserCounter = Math.floor(Math.random() * 10);
                    res = usersList[randomUserCounter];
                    UserStore.setId(res.id);
                    UserStore.setName(res.name);
                    UserStore.setAge(res.age);
                    UserStore.setAvatar(res.avatar);
                    UserStore.setUniversity(res.university);
                    navigate(`/profile/${UserStore.id}`);
            })
                .catch((error) => console.log(`Ошибка: ${error}`));
            }}
        >
            <input
                id="login"
                value={login}
                className="form__input"
                placeholder="Логин"
                type="text"
                maxLength={12}
                onChange={(evt) => setLogin(evt.target.value)}
            />
            <input
                id="password"
                value={password}
                className="form__input"
                placeholder="Пароль"
                type="password"
                maxLength={16}
                onChange={(evt) => setPassword(evt.target.value)}
            />
            <Button text={'Далее'} isFormButton={true}/>
        </form>
    );
};

const RegInputs = () => {
    const ref = useRef<HTMLInputElement>(null);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [age, setAge] = useState('');
    const [university, setUniversity] = useState('');
    const navigate = useNavigate();

    return (
        <form className="form__inputsContainer" onSubmit={(evt) => {
            evt.preventDefault();
            const fData = new FormData();
            fData.append('login', login);
            fData.append('password', password);
            fData.append('passwordAgain', passwordAgain);
            fData.append('age', age);
            fData.append('university', university);
            fData.append('photo', (ref.current as unknown as HTMLInputElement)?.files![0]);

            const url = 'https://www.boredapi.com/api/activity';

            // иммитация запроса
            // fetch(url, {
            //     method: "POST",
            //     body: fData
            // });

            fetch(url)
                .then((res) => res.json())
                .then((res) => {
                    const randomUserCounter = Math.floor(Math.random() * 10);
                    res = usersList[randomUserCounter];
                    UserStore.setId(res.id);
                    UserStore.setName(res.name);
                    UserStore.setAge(res.age);
                    UserStore.setAvatar(res.avatar);
                    UserStore.setUniversity(res.university);
                    navigate(`/profile/${UserStore.id}`);
                })
                .catch((error) => console.log(`Ошибка: ${error}`));
        }}>
            <input
                id="login"
                className="form__input"
                placeholder="Логин"
                type="text"
                maxLength={12}
                onChange={(evt) => setLogin(evt.target.value)}
            />
            <input
                id="password"
                className="form__input"
                placeholder="Пароль"
                type="password"
                maxLength={16}
                onChange={(evt) => setPassword(evt.target.value)}
            />
            <input
                id="passwordAgain"
                className="form__input"
                placeholder="Повторите пароль"
                type="password"
                maxLength={16}
                onChange={(evt) => setPasswordAgain(evt.target.value)}
            />
            <input
                id="age"
                className="form__input"
                placeholder="Возраст"
                type="text"
                maxLength={3}
                onChange={(evt) => setAge(evt.target.value)}
            />
            <input
                id="university"
                className="form__input"
                placeholder="Вуз"
                type="text"
                maxLength={10}
                onChange={(evt) => setUniversity(evt.target.value)}
            />
            <FileInput ref={ref}/>
            <Button text={'Далее'} isFormButton={true}/>
        </form>
    );
};

export const AuthorizeForm = () => {
    const [isAuth, setIsAuth] = useState<boolean>(true);

    const onAuthClick = () => {
        if (!isAuth) {
            setIsAuth(!isAuth);
        }
    };

    const onRegClick = () => {
        if (isAuth) {
            setIsAuth(!isAuth);
        }
    };

    return (
        <div className="form">
            <div className="form__checker">
                <span
                    className={'form__checkerValue' + (!isAuth ? ' form__checkerValue--unchecked' : '')}
                    onClick={onAuthClick}
                >Авторизация</span>
                <span
                    className={'form__checkerValue' + (isAuth ? ' form__checkerValue--unchecked' : '')}
                    onClick={onRegClick}
                >Регистрация</span>
            </div>
            {isAuth ?
                <AuthInputs/> :
                <RegInputs/>
            }
        </div>
    );
};
