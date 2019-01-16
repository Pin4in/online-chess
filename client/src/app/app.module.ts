import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DraggableModule } from './draggable/draggable.module';
import { ChessFieldModule } from './chess-field/chess-field.module';
import { AppRoutingModule } from './/app-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { GameUiComponent } from './game-ui/game-ui.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    GameUiComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    DraggableModule,
    ChessFieldModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
