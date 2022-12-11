import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  emailValidate: boolean = false
  nameValidate: boolean = false
  commentValidate: boolean = false
  formValidate: boolean = false

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
    this.http.post<NewComment>(environment.urlApi + `/posts/${this.newComment.postId}/comments`, this.newComment)
      .subscribe({
        next: (response) => { this.newItemEvent.emit(response); this.addCommentForm.reset(); this.loader = false; },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      })
  }

  enableButtonSubmit(emailValidate: boolean, nameValidate: boolean, commentValidate: boolean) {
    if (emailValidate && nameValidate && commentValidate) {
      this.formValidate = true
    }
  }
  checkEmail(event: string) {
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if (regex.test(event)) {
      this.emailValidate = true
      this.enableButtonSubmit(this.emailValidate, this.nameValidate, this.commentValidate)
    }
    else {
      this.emailValidate = false
      this.formValidate = false
    }
  }

  checkNameNotEmpty(event: string) {
    if (event != '') {
      this.nameValidate = true
      this.enableButtonSubmit(this.emailValidate, this.nameValidate, this.commentValidate)
    } else {
      this.nameValidate = false
      this.formValidate = false
    }
  }
  checkCommentNotEmpty(event: string) {
    if (event != '') {
      this.commentValidate = true
      this.enableButtonSubmit(this.emailValidate, this.nameValidate, this.commentValidate)
    } else {
      this.commentValidate = false
      this.formValidate = false
    }
  }

}
