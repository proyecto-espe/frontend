import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  show: string = ""

  showOptions() {
    if(this.show === "") {
      this.show = "links-show"
    } else {
      this.show = ""
    }
  }
}
