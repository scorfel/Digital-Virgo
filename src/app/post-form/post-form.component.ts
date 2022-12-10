import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface NewPost {
  userId: number,
  title: string,
  body: string
}

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})

export class PostFormComponent {

  @Output() newItemEvent = new EventEmitter<any>();

  newPost!: NewPost
  checkoutForm = this.formBuilder.group({
    title: '',
    body: ''
  });
  loader: boolean = false
  titleValidate: boolean = false
  postValidate: boolean = false
  formValidate: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  createNewPost(title: string, body: string) {
    this.loader = true
    this.newPost = { "userId": 1, "title": title, "body": body }
    this.http.post<NewPost>('https://jsonplaceholder.typicode.com/posts', this.newPost)
      .subscribe(response => {
        this.newItemEvent.emit(response);
        this.checkoutForm.reset();
        this.loader = false;
      })
  }

  enableButtonSubmit(titleValidate: boolean, postValidate: boolean) {
    if (titleValidate && postValidate) {
      this.formValidate = true
    }
  }

  checkTitleNotEmpty(event: string) {
    if (event != '') {
      this.titleValidate = true
      this.enableButtonSubmit(this.titleValidate, this.postValidate)
    } else {
      this.titleValidate = false
      this.formValidate = false
    }
  }

  checkPostNotEmpty(event: string) {
    if (event != '') {
      this.postValidate = true
      this.enableButtonSubmit(this.titleValidate, this.postValidate)
    } else {
      this.postValidate = false
      this.formValidate = false
    }
  }

}

