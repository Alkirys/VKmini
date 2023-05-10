import { makeAutoObservable, runInAction } from "mobx";

class UserStore {
    name = '';
    password = '';
    passwordAgain = '';
    id = -1;
    avatar = '';
    age = 0;
    university = '';
    city = '';

    constructor() {
        makeAutoObservable(this)
    }

    setName(name: string) {
        runInAction(() => {
            this.name = name;
        });
    }

    setPassword(password: string) {
        runInAction(() => {
            this.password = password;
        });
    }

    setPasswordAgain(passwordAgain: string) {
        runInAction(() => {
            this.passwordAgain = passwordAgain;
        });
    }

    setId(id: number) {
        runInAction(() => {
            this.id = id;
        });
    }

    setAvatar(avatar: string) {
        runInAction(() => {
            this.avatar = avatar;
        });
    }

    setUniversity(university: string) {
        runInAction(() => {
            this.university = university;
        });
    }

    setAge(age: number) {
        runInAction(() => {
            this.age = age;
        });
    }

    setCity(city: string) {
        runInAction(() => {
            this.city = city;
        });
    }

    clear() {
        runInAction(() => {
            this.name = '';
            this.password = '';
            this.passwordAgain = '';
            this.id = -1;
            this.avatar = '';
            this.age = 0;
            this.university = '';
            this.city = '';
        });
    }
}

export default new UserStore();