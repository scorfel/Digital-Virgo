import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})

export class CommentFormComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  loader: boolean = false
  newComment!: {
    postId: number,
    email: string,
    name: string,
    body: string
  }
  addCommentForm = this.formBuilder.group({
    email: '',
    name: '',
    body: ''
  });

  addNewComment(email: any, name: any, body: any) {
    this.loader = true
    this.newComment = {
      "postId": 8,
      "email": email,
      "name": name,
      "body": body
    }
    console.log(this.newComment)
    this.http.post<any>(`https://jsonplaceholder.typicode.com/posts/${this.newComment.postId}/comments`, this.newComment)
      .subscribe(response => {
        console.log(response)

        this.newItemEvent.emit(response);
        this.addCommentForm.reset();
        this.loader = false;
      })

  }
}
