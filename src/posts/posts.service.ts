import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
    constructor(
      @InjectRepository(PostsModel)
      private readonly postsRepository:Repository<PostsModel>
    ) {}

    insertInitData() {
        for (let i = 0; i < posts.length; i++) {
            this.postsRepository.insert(posts[i]);
        }
    }

    async getAllPosts() {
        return this.postsRepository.find();
    }

    async getPostById(id: number) {
        let post = await this.postsRepository.findOne({
            where: {
                id,
            },
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        return post;
    }

    async createPost(author: string, title: string, content: string) {
        const post = this.postsRepository.create({
            author,
            title,
            content,
            likeCount: 0,
            commentCount: 0,
        });

        return await this.postsRepository.save(post);
    }

    async updatePost(postId: number, author: string, title: string, content: string) {
        // save 기능
        // 1) 만약 데이터가 존재하지 않는다면 (id 기준) 새로 생성한다
        // 2) 만약 데이터가 존재하면 (id 기준) 존재하던 값을 업데이트 한다.

        const post= await this.postsRepository.findOne({
            where:{
                id: postId
            }
        })

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        if (author) {
            post.author = author;
        }

        if (title) {
            post.title = title;
        }

        if (content) {
            post.content = content;
        }

        return await this.postsRepository.save(post);
    }

    async deletePost(id:number) {
        const post = await this.postsRepository.findOne({
            where: {
                id: id,
            },
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        await this.postsRepository.delete(id);

        return id;
    }
}
