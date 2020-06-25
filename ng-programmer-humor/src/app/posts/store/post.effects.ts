import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import * as fromPostActions from './post.actions';
import { PostsService } from '../services/posts.service';
import { of } from 'rxjs';
import Post from '../models/post.model';
import { Router } from '@angular/router';

@Injectable()
export class PostEffects {
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.loadPosts),
      mergeMap((action) =>
        this.postsService.getPosts().pipe(
          map((posts) => fromPostActions.loadPostsSuccess({ posts: posts })),
          catchError((error) =>
            of(
              fromPostActions.loadPostsFailure({
                error: 'Connection timed out',
              })
            )
          )
        )
      )
    )
  );

  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.loadPost),
      mergeMap((action) =>
        this.postsService.getPost(action.id).pipe(
          map((post) => fromPostActions.loadPostSuccess({ post: post })),
          catchError((error) =>
            of(fromPostActions.loadPostFailure({ error: error }))
          )
        )
      )
    )
  );

  addPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromPostActions.addPost),
      mergeMap((action) => {
        const post: Post = {
          title: action.title,
          imageURL: action.imageURL,
          likedBy: [action.user.id],
          postedBy: action.user.username,
          date: new Date().toUTCString(),
        };
        return this.postsService.createPost(post).pipe(
          map((post) => fromPostActions.addPostSuccess({ post })),
          catchError((error) => of(fromPostActions.addPostFailure({ error })))
        );
      }),
      tap(() => this.router.navigate(['/posts/list']))
    )
  );

  editPost$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromPostActions.editPost),
        concatMap((action) => {
          return this.postsService.editPost(
            action.post.id,
            action.post.changes
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private router: Router
  ) {}
}