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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });

    this.http.get<any>('https://jsonplaceholder.typicode.com/posts/' + this.id).subscribe(response => {

      this.postDetails = response,
        console.log(this.postDetails),

        this.http.get<any>('https://jsonplaceholder.typicode.com/users/' + this.postDetails.userId).subscribe(response => {
          this.userDetails = response
        })
    })

  }

  showComment() {
    this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${this.postDetails.id}/comments`)
      .subscribe(response => /*console.log(response),*/ this.postComments = response)
  }

}

// import {Component} from '@angular/core';


// @Component({
//   selector: 'card-footer-example',
//   templateUrl: 'card-footer-example.html',
//   styleUrls: ['card-footer-example.css'],
// })
// export class CardFooterExample {
//   longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
//   from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
//   originally bred for hunting.`;
// }
