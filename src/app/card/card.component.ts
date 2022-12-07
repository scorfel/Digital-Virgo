import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

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
    checkoutForm = this.formBuilder.group({
        name: '',
        address: ''
    });

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.http.get<any>('https://jsonplaceholder.typicode.com/posts').subscribe(response => { console.log(response), this.postsFromApi = response })
    }

    onSubmit(): void {
        // Process checkout data here
        // this.items = this.cartService.clearCart();
        console.warn('Your order has been submitted', this.checkoutForm.value);
        this.checkoutForm.reset();
    }
}
