export interface UserInfo {
    id: number;
    name: string;
    age: number;
    university: string;
    avatar: string;
    isFriend?: boolean;
}

export interface PostInfo {
    id: number,
    text: string,
    likes: number,
    owner: string,
    date: string,
    image: string | null,
    isLiked: boolean,
}
