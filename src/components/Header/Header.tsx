import './Header.css';
import {Link, useNavigate} from "react-router-dom";
import image from "../../static/img/ava.png";
import UserStore from "../../stores/UserStore";

interface HeaderProps {
    isAuthorized: boolean;
}

export const Header = ({isAuthorized}: HeaderProps) => {
    const navigate = useNavigate();

    const onExitButtonClick = () => {
        const url = 'https://www.boredapi.com/api/activity';
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                UserStore.clear();
                navigate('/auth');
            })
            .catch((error) => console.log(`Ошибка: ${error}`));
    };

    return (
        <header className="header">
            <nav className="header__container">
                {isAuthorized ?
                    <>
                        <ul className="header__linkList">
                            <li><Link className="header__logo header__button" to="/posts"><span>VKmini</span></Link></li>
                            <li><Link className="header__button" to={`/profile/${UserStore.id}`}><span>Профиль</span></Link></li>
                            <li><Link className="header__button" to="/posts"><span>Лента</span></Link></li>
                            <li><Link className="header__button" to="/friends"><span>Друзья</span></Link></li>
                        </ul>
                        <button onClick={onExitButtonClick} className="header__exitButton header__button">Выйти</button>
                    </> :
                    <Link className="header__logo header__button" to="/posts"><span>VKmini</span></Link>
                }
            </nav>
        </header>
    )
};
