import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { DraggableModule } from './draggable/draggable.module';
import { ChessFieldModule } from './chess-field/chess-field.module';
import { AppRoutingModule } from './/app-routing.module';

import { UnauthorizedInterceptor } from './helpers/unauthorized.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { GameComponent } from './game/game.component';
import { config } from './config';

const socketConfig: SocketIoConfig = { url: config.publicApi, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    GameComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DraggableModule,
    ChessFieldModule,
    AppRoutingModule,
    SocketIoModule.forRoot(socketConfig)
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
