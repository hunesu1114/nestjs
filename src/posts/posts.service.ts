import {Injectable, NotFoundException} from '@nestjs/common';

/**
 * author : string;
 * title : string;
 * content : string;
 * likeCount : number;
 * commentCount : number;
 */
export interface PostModel{
    id: number;
    author : string;
    title : string;
    content : string;
    likeCount : number;
    commentCount : number;
}

let posts:PostModel[]=[
    {
        id: 1,
        author: 'newjeans_official',
        title: '뉴진스 민지',
        content: '메이크업 고치고 있는 민지',
        likeCount: 1000000,
        commentCount: 999999,
    },
    {
        id: 2,
        author: 'newjeans_official',
        title: '뉴진스 해린',
        content: '노래 연습 하고 있는 해린',
        likeCount: 1000000,
        commentCount: 999999,
    },
    {
        id: 3,
        author: 'blackpink_official',
        title: '블랙핑크 로제',
        content: '종합운동장에서 공연중인 로제',
        likeCount: 1000000,
        commentCount: 999999,
    },
]

@Injectable()
export class PostsService {
    getAllPosts() {
        return posts;
    }

    getPostById(id: number) {
        const post = posts.find((post) => post.id === +id);

        if (!post) {
            throw new NotFoundException();
        }

        return post;
    }

    createPost(author: string, title: string, content: string) {
        const post={
            id: posts.length+1,
            author: author,
            title: title,
            content: content,
            likeCount: 0,
            commentCount: 0
        }

        posts = [
            ...posts,
            post
        ];

        return post;
    }

    updatePost(postId: number, author: string, title: string, content: string) {
        let findPost = posts.find((post) => post.id === postId);
        if (!findPost) {
            throw new NotFoundException();
        }

        if (author) {
            findPost.author = author;
        }

        if (title) {
            findPost.title = title;
        }

        if (content) {
            findPost.content = content;
        }

        return findPost;
    }

    deletePost(id:number) {
        const post = posts.find((post) => post.id === id);

        if (!post) {
            throw new NotFoundException();
        }

        posts = posts.filter(post => post.id !== id);
        return id;
    }
}
