import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Posts {
    userId: number,
    id: number,
    title: string,
    body: string
}

@Component({
    selector: 'display-posts',
    templateUrl: './display-posts.component.html',
    styleUrls: ['./display-posts.component.scss']
})

export class DisplayPosts {

    postsFromApi!: Array<Posts>
    displayFormAddPost: boolean = false
    getAllPosts: boolean = false

    constructor(
        private http: HttpClient,
    ) { }

    ngOnInit(): void {
        this.http.get<Array<Posts>>(environment.urlApi + '/posts')
            .subscribe({
                next: (data) => { this.postsFromApi = data, this.getAllPosts = true },
                error: (e) => console.error(e),
                complete: () => console.info('complete')
            })
    }

    addNewPost(newPost: any) {
        this.postsFromApi.splice(0, 0, newPost)
        this.displayFormAddPost = false
    }

    toggleFormAddPost(): void {
        this.displayFormAddPost ? this.displayFormAddPost = false : this.displayFormAddPost = true
    }

}
