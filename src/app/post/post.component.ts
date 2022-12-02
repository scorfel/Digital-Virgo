import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardOverviewExample } from '../card/card.component'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() card!: CardOverviewExample;
  postsFromApi: any = undefined

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://jsonplaceholder.typicode.com/posts').subscribe(response => { console.log(response), this.postsFromApi = response })
  }

}
