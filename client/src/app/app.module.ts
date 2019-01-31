import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { DraggableModule } from './draggable/draggable.module';
import { ChessFieldModule } from './chess-field/chess-field.module';
import { AppRoutingModule } from './/app-routing.module';
import { GameUiComponent } from './game-ui/game-ui.component';

import { UnauthorizedInterceptor } from './helpers/unauthorized.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    GameUiComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DraggableModule,
    ChessFieldModule,
    AppRoutingModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
