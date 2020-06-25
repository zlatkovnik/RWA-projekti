import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import Post from '../models/post.model';
import Auth from 'src/app/auth/models/auth.model';

//Loading posts
export const loadPosts = createAction('[Post Component] Load Posts');
export const loadPostsSuccess = createAction(
  '[Post Effect] Load Posts Success',
  props<{ posts: Post[] }>()
);
export const loadPostsFailure = createAction(
  '[Post Effect] Load Posts Failure',
  props<{ error: any }>()
);
//Loading individual post
export const loadPost = createAction(
  '[Post Component] Load Post',
  props<{ id: number }>()
);
export const loadPostSuccess = createAction(
  '[Post Effect] Load Post Success',
  props<{ post: Post }>()
);
export const loadPostFailure = createAction(
  '[Post Effect] Load Post Failure',
  props<{ error: any }>()
);
//Edit single post
export const editPost = createAction(
  '[Post Component] Edit Post',
  props<{ post: Update<Post> }>()
);
//Add new post
export const addPost = createAction(
  '[Post Component] Add Post',
  props<{ title: string; imageURL: string; user: Auth }>()
);
export const addPostSuccess = createAction(
  '[Post Effect] Add Post Success',
  props<{ post: Post }>()
);
export const addPostFailure = createAction(
  '[Post Effect] Add Post Failure',
  props<{ error: any }>()
);

export const upsertPost = createAction(
  '[Post/API] Upsert Post',
  props<{ post: Post }>()
);

export const addPosts = createAction(
  '[Post/API] Add Posts',
  props<{ posts: Post[] }>()
);

export const upsertPosts = createAction(
  '[Post/API] Upsert Posts',
  props<{ posts: Post[] }>()
);

export const updatePost = createAction(
  '[Post/API] Update Post',
  props<{ post: Update<Post> }>()
);

export const updatePosts = createAction(
  '[Post/API] Update Posts',
  props<{ posts: Update<Post>[] }>()
);

export const deletePost = createAction(
  '[Post/API] Delete Post',
  props<{ id: string }>()
);

export const deletePosts = createAction(
  '[Post/API] Delete Posts',
  props<{ ids: string[] }>()
);

export const clearPosts = createAction('[Post/API] Clear Posts');