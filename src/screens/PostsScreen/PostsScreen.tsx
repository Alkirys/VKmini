import './PostsScreen.css';
import InfiniteGrid from "../../components/grid/grid";
import {PostCard} from "../../components/PostCard/PostCard";
import {Header} from "../../components/Header/Header";
import {useEffect, useState} from "react";
import {postsList} from "../../mocks/apiMocks";
import {PostInfo} from "../../interfaces/interfaces";

export const PostsScreen = () => {
    const [posts, setPosts] = useState<PostInfo[]>(postsList);

    useEffect(() => {
        // запрос списка постов
        const url = 'https://www.boredapi.com/api/activity';
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                res = postsList;
                setPosts(res);
                console.log(posts);
            })
            .catch((error) => console.log(`Ошибка: ${error}`));
    });

    const array = posts.map((post) => (
        <PostCard
            image={post.image}
            key={`${post.id}${post.owner}`}
            id={post.id}
            text={post.text}
            likes={post.likes}
            owner={post.owner}
            date={post.date}
            isLiked={post.isLiked}
        />
    ));

    return (
        <>
            <Header isAuthorized={true}/>
            <main className="posts">
                <InfiniteGrid
                    entries={array}
                    height={240}
                    lazyCallback={() => {}}
                />
            </main>
        </>
    );
};
