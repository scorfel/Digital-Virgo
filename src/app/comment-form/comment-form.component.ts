import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})

export class CommentFormComponent implements OnInit {
  @Input() PostId!: number
  @Output() newItemEvent = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    console.log(this.PostId)
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
      "postId": this.PostId,
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
