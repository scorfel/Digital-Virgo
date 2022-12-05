import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardOverviewExample } from './card/card.component'
import { PostDetailsComponent } from './post-details/post-details.component'
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '', component: CardOverviewExample,
  },
  { path: 'second-component', component: PostDetailsComponent },
];

// const routes: Routes = [
//   {
//     path: 'first-component', component: CardOverviewExample,
//     children: [
//       {
//         path: 'second-component', // child route path
//         component: PostDetailsComponent, // child route component that the router renders
//       },
//     ]
//   }

// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
