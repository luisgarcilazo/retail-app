import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import { Router } from '@angular/router';
import { CATEGORIES } from './Categories';
import { Category } from 'src/app/entities/Category';
@Component({
  selector: 'app-store-front',
  templateUrl: './store-front.component.html',
  styleUrls: ['./store-front.component.css']
})
export class StoreFrontComponent {

  categories:Category[] = CATEGORIES;

  constructor(private router: Router){}

  goToCategory(category: Category){
    this.router.navigate([`/store/${category.pathname}`]);
  }
}
