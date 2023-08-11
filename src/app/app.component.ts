import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'natacion';

  isLogged(){
    return localStorage.getItem("userId") != null && localStorage.getItem("user") != null;
  }
}
