import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})

export class PostFormComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<any>();

  // emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  newPost!: any
  // matcher = new MyErrorStateMatcher();
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

  createNewPost(title: any, body: any) {
    this.loader = true
    console.log(title, body)
    this.newPost = { "userId": 1, "title": title, "body": body }
    this.http.post<any>('https://jsonplaceholder.typicode.com/posts', this.newPost)
      .subscribe(response => {
        this.newItemEvent.emit(response);
        this.checkoutForm.reset();
        this.loader = false;
      })

  }

  // onSubmit(): void {
  //   // Process checkout data here
  //   // this.items = this.cartService.clearCart();
  //   console.warn('Your order has been submitted', this.checkoutForm.value);
  //   this.checkoutForm.reset();
  // }
}

