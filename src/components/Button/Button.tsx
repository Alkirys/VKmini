import './Button.css';
import {FormEventHandler, MouseEventHandler} from "react";

interface ButtonProps {
    text: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    isFormButton?: boolean;
}

export const Button = ({text, onClick, isFormButton}: ButtonProps) => {
    return (
        <button
            type={isFormButton ? 'submit' : 'button'}
            className="button"
            onClick={onClick}
        >
            {text}
        </button>
    );
};
