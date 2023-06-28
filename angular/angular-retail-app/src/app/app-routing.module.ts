import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LicensingComponent } from './components/licensing/licensing.component';
import { CartComponent } from './components/cart/cart.component';
import { StoreFrontComponent } from './components/store-front/store-front.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'store', component: StoreFrontComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'create-account', component: CreateAccountComponent
  },
  {
    path: 'licensing', component: LicensingComponent
  },
  {
    path: 'cart', component: CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
