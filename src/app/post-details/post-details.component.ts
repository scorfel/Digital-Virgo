import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Post, Comment, User } from './post'

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})

export class PostDetailsComponent implements OnInit {

  id!: string
  postDetails!: Post
  postComments!: Array<Comment>
  userDetails!: User
  showComments: boolean = false
  showFormToAddComment: boolean = false

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/' + this.id)
      .subscribe(response => {
        this.postDetails = response
        this.http.get<User>('https://jsonplaceholder.typicode.com/users/' + this.postDetails.userId)
          .subscribe(response => {
            this.userDetails = response,
              this.http.get<Array<Comment>>(`https://jsonplaceholder.typicode.com/posts/${this.postDetails.id}/comments`)
                .subscribe(response => { this.postComments = response })
          })
      })
  }

  showComment(): void {
    this.showComments ? this.showComments = false : this.showComments = true
  }

  showFormAddComment(): void {
    this.showFormToAddComment ? this.showFormToAddComment = false : this.showFormToAddComment = true
  }

  addNewComment(newComment: any): void {
    this.postComments.splice(0, 0, newComment)
    this.showFormToAddComment = false
  }
}
