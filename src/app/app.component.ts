import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contact-app';
  userButton: boolean = false;

  changeSelectedButton(){
    this.userButton = !this.userButton
  }
}
