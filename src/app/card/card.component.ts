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
    items = ['item1', 'item2', 'item3', 'item4'];
    postsFromApi: any = undefined
    displayFormAddPost: boolean = false

    addItem(newItem: any) {
        this.items.push(newItem)
        console.log(newItem);
    }
    constructor(
        private http: HttpClient,
    ) { }

    ngOnInit(): void {
        this.http.get<any>('https://jsonplaceholder.typicode.com/posts').subscribe(response => { console.log(response), this.postsFromApi = response })
    }

    toggleFormAddPost(): void {
        this.displayFormAddPost ? this.displayFormAddPost = false : this.displayFormAddPost = true
    }

}
