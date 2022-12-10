import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})

export class CommentFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }


  newComment!: {
    postId: number,
    email: '',
    name: '',
    body: ''
  }

  addCommentForm = this.formBuilder.group({
    email: '',
    name: '',
    body: ''
  });

  addNewComment(email: any, name: any, body: any) {
    this.newComment = {
      "postId": 1,
      "email": email,
      "name": name,
      "body": body
    }
    console.log(this.newComment)

  }
}
