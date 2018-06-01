import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FigureComponent } from './figure/figure.component';
import { DraggableModule } from './draggable/draggable.module';

@NgModule({
  declarations: [
    AppComponent,
    FigureComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    DraggableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
