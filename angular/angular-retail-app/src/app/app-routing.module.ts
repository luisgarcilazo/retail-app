import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LicensingComponent } from './components/licensing/licensing.component';
import { CartComponent } from './components/cart/cart.component';
import { StoreFrontComponent } from './components/store-front/store-front.component';
import { PublicGuard } from './guard/public-guard';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ManagerGuard } from './guard/manager-guard';
import { ClothesComponent } from './components/categories/clothes/clothes.component';
import { ElectronicsComponent } from './components/categories/electronics/electronics.component';
import { FoodanddrinksComponent } from './components/categories/foodanddrinks/foodanddrinks.component';
import { FruitsComponent } from './components/categories/fruits/fruits.component';
import { HealthComponent } from './components/categories/health/health.component';
import { ToysComponent } from './components/categories/toys/toys.component';
import { VegetablesComponent } from './components/categories/vegetables/vegetables.component';
import { DisplayAllComponent } from './components/categories/display-all/display-all.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ClientGuard } from './guard/client-guard';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'store', component: StoreFrontComponent
  },
  {
    path: 'store/clothes', component: ClothesComponent
  },
  {
    path: 'store/electronics', component: ElectronicsComponent
  },
  {
    path: 'store/foodanddrinks', component: FoodanddrinksComponent
  },
  {
    path: 'store/fruits', component: FruitsComponent
  },
  {
    path: 'store/health', component: HealthComponent
  },
  {
    path: 'store/toys', component: ToysComponent
  },
  {
    path: 'store/vegetables', component: VegetablesComponent
  },
  {
    path: 'store/all', component: DisplayAllComponent
  },
  {
    path: 'login', component: LoginComponent,
    canActivate: [PublicGuard]
  },
  {
    path: 'create-account', component: CreateAccountComponent,
    canActivate: [PublicGuard]
  },
  {
    path: 'add-product', component:AddProductComponent,
    canActivate: [ManagerGuard]
  },
  {
    path: 'licensing', component: LicensingComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'orders', component: OrdersComponent,
    canActivate: [ClientGuard]
  },
  {
    path: 'manage-orders', component: ManageOrdersComponent,
    canActivate: [ManagerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
