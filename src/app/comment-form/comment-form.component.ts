import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface NewComment {
  postId: number,
  email: string,
  name: string,
  body: string
}

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})

export class CommentFormComponent {

  @Input() PostId!: number
  @Output() newItemEvent = new EventEmitter<any>();

  loader: boolean = false
  newComment!: NewComment
  addCommentForm = this.formBuilder.group({
    email: '',
    name: '',
    body: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  addNewComment(email: string, name: string, body: string) {
    this.loader = true
    this.newComment = {
      "postId": this.PostId,
      "email": email,
      "name": name,
      "body": body
    }
    this.http.post<NewComment>(`https://jsonplaceholder.typicode.com/posts/${this.newComment.postId}/comments`, this.newComment)
      .subscribe(response => {
        this.newItemEvent.emit(response);
        this.addCommentForm.reset();
        this.loader = false;
      })
  }

}
