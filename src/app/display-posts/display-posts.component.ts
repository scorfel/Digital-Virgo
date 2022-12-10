import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * @title Basic cards
 */

@Component({
    selector: 'display-posts',
    templateUrl: './display-posts.component.html',
    styleUrls: ['./display-posts.component.scss']
})

export class DisplayPosts {

    postsFromApi: any = undefined
    displayFormAddPost: boolean = false
    getAllPosts: boolean = false

    constructor(
        private http: HttpClient,
    ) { }

    ngOnInit(): void {
        this.http.get<any>('https://jsonplaceholder.typicode.com/posts')
            .subscribe(response => { this.postsFromApi = response, this.getAllPosts = true })
    }

    addNewPost(newPost: any) {
        this.postsFromApi.splice(0, 0, newPost)
        this.displayFormAddPost = false
    }

    toggleFormAddPost(): void {
        this.displayFormAddPost ? this.displayFormAddPost = false : this.displayFormAddPost = true
    }

}
