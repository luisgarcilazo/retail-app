import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeNavComponent } from './components/home-nav/home-nav.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { LoginComponent } from './components/login/login.component';
import { LicensingComponent } from './components/licensing/licensing.component';
import { CartComponent } from './components/cart/cart.component';
import { StoreFrontComponent } from './components/store-front/store-front.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AddProductComponent } from './components/add-product/add-product.component';
import { FruitsComponent } from './components/categories/fruits/fruits.component';
import { VegetablesComponent } from './components/categories/vegetables/vegetables.component';
import { FoodanddrinksComponent } from './components/categories/foodanddrinks/foodanddrinks.component';
import { ElectronicsComponent } from './components/categories/electronics/electronics.component';
import { ClothesComponent } from './components/categories/clothes/clothes.component';
import { ToysComponent } from './components/categories/toys/toys.component';
import { HealthComponent } from './components/categories/health/health.component';
import { DisplayAllComponent } from './components/categories/display-all/display-all.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { CreateManagerComponent } from './components/create-manager/create-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CreateAccountComponent,
    LoginComponent,
    FooterComponent,
    HomeNavComponent,
    LicensingComponent,
    CartComponent,
    StoreFrontComponent,
    AddProductComponent,
    FruitsComponent,
    VegetablesComponent,
    FoodanddrinksComponent,
    ElectronicsComponent,
    ClothesComponent,
    ToysComponent,
    HealthComponent,
    DisplayAllComponent,
    OrdersComponent,
    ManageOrdersComponent,
    ManageProductsComponent,
    CreateManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatRippleModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
