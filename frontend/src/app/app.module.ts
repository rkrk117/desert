import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Communicator } from './services/communicator.service';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { StartScreen } from './start_screen/start_screen.component';

const routes: Routes = [
  { path: 'start_screen', component: StartScreen },
  { path: "**", component: StartScreen }
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    StartScreen
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    HttpClient,
    Communicator
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
