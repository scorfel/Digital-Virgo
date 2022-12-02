import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * @title Basic cards
 */
@Component({
    selector: 'card',
    templateUrl: 'card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardOverviewExample {

    postsFromApi: any = undefined

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.http.get<any>('https://jsonplaceholder.typicode.com/posts').subscribe(response => { console.log(response), this.postsFromApi = response })
    }
}
