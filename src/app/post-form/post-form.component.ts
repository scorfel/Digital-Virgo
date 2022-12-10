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

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

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

}

