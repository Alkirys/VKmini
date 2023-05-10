import './AuthScreen.css';
import {Header} from "../../components/Header/Header";
import {AuthorizeForm} from "../../components/AuthorizeForm/AuthorizeForm";
import UserStore from "../../stores/UserStore";

export const AuthScreen = () => {
    return (
        <>
            <Header isAuthorized={UserStore.id > 0}/>
            <main className="authMainContainer">
                <AuthorizeForm/>
            </main>
        </>
    );
}
