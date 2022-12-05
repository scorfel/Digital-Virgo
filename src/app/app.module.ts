import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarOverviewExample } from './header/header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CardOverviewExample } from './card/card.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarOverviewExample,
    CardOverviewExample,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
