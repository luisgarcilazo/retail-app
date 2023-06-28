import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  goToGithub(){
    window.open('https://github.com/luisgarcilazo/retail-app', "_blank");
  }

}
