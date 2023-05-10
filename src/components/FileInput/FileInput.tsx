import './FileInput.css';
import {ChangeEvent, ForwardedRef, useState} from "react";
import React from 'react';

export type Ref = HTMLInputElement;

export const FileInput = React.forwardRef<Ref>((props, ref) => {
    const [text, setText] = useState('Файл не выбран');

    const onInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        if (evt.target.files?.length === 1) {
            setText(evt.target.files[0].name);
        }
    }

    return (
        <div className="fileInputContainer">
            <input ref={ref} type="file" name="file" id="fileInput" className="fileInput" onChange={onInputChange}/>
                <label className="fileInputLabel" htmlFor="fileInput">
                    <div className="fileInput__button">Выбрать</div>
                    <div className="fileInput__description">{text}</div>
                </label>
        </div>
    );
});
