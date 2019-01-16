import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { GameUiComponent } from './game-ui/game-ui.component';

const routes: Routes = [
  { path: 'game', component: GameUiComponent },
  { path: '', component: SignInComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
