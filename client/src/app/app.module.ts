import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DraggableModule } from './draggable/draggable.module';
import { ChessFieldModule } from './chess-field/chess-field.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    DraggableModule,
    ChessFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
