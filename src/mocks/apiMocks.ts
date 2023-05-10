import image from "../static/img/ava.png";
import {UserInfo, PostInfo} from "../interfaces/interfaces";

export const usersList: UserInfo[]  = [
    {id: 1, name: 'Alkirys', age: 22, university: 'bmstu', avatar: image, isFriend: true},
    {id: 2, name: 'Alkirys', age: 22, university: 'bmstu', avatar: image, isFriend: false},
    {id: 3, name: 'Alkirys', age: 22, university: 'bmstu', avatar: image, isFriend: true},
    {id: 4, name: 'Alkirys', age: 22, university: 'bmstu', avatar: image, isFriend: false},
    {id: 5, name: 'Alkirys', age: 22, university: 'bmstu', avatar: image, isFriend: false},
    {id: 6, name: 'Alkirys', age: 22, university: 'bmstu', avatar: image, isFriend: true},
    {id: 7, name: 'Alkirys', age: 22, university: 'bmstu', avatar: image, isFriend: false},
    {id: 8, name: 'Alkirys', age: 22, university: 'bmstu', avatar: image, isFriend: true},
    {id: 9, name: 'Alkirys', age: 22, university: 'bmstu', avatar: image, isFriend: false},
    {id: 10, name: 'Alkirys', age: 22, university: 'bmstu', avatar: image, isFriend: true},
];

export const postsList: PostInfo[] = [
    {id: 0, text: 'kdjjkdnmfkv', likes: 4, owner: 'Alkirys', date: '09.05.23', image: image, isLiked: false},
    {id: 1, text: 'kdjjkdnmfkv', likes: 6, owner: 'Alkirys', date: '09.05.23', image: null, isLiked: true},
    {id: 2, text: 'kdjjkdnmfkv', likes: 2, owner: 'Alkirys', date: '09.05.23', image: null, isLiked: true},
    {id: 3, text: 'kdjjkdnmfkv', likes: 7, owner: 'Alkirys', date: '09.05.23', image: image, isLiked: false},
    {id: 4, text: 'kdjjkdnmfkv', likes: 9, owner: 'Alkirys', date: '09.05.23', image: null, isLiked: true},
    {id: 5, text: 'kdjjkdnmfkv', likes: 36, owner: 'Alkirys', date: '09.05.23', image: null, isLiked: false},
    {id: 6, text: 'kdjjkdnmfkv', likes: 4, owner: 'Alkirys', date: '09.05.23', image: image, isLiked: true},
    {id: 7, text: 'kdjjkdnmfkv', likes: 3, owner: 'Alkirys', date: '09.05.23', image: null, isLiked: false},
    {id: 8, text: 'kdjjkdnmfkv', likes: 6, owner: 'Alkirys', date: '09.05.23', image: null, isLiked: true},
    {id: 9, text: 'kdjjkdnmfkv', likes: 7, owner: 'Alkirys', date: '09.05.23', image: image, isLiked: true},
];
