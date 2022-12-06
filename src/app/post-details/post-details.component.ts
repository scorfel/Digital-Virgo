import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
/**
 * @title Card with footer
 */

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})

export class PostDetailsComponent implements OnInit {

  id!: string
  postDetails!: any
  postComments!: any
  userDetails!: any
  showComments: boolean = false

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.http.get<any>('https://jsonplaceholder.typicode.com/posts/' + this.id)
      .subscribe(response => {
        this.postDetails = response
        this.http.get<any>('https://jsonplaceholder.typicode.com/users/' + this.postDetails.userId)
          .subscribe(response => {
            this.userDetails = response,
              this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${this.postDetails.id}/comments`)
                .subscribe(response => { console.log(response), this.postComments = response })
          })
      })

  }

  showComment() {
    this.showComments ? this.showComments = false : this.showComments = true
  }

}
