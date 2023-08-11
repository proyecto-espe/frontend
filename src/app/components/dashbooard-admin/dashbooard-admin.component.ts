import { Component } from '@angular/core';

@Component({
  selector: 'app-dashbooard-admin',
  templateUrl: './dashbooard-admin.component.html',
  styleUrls: ['./dashbooard-admin.component.css']
})
export class DashbooardAdminComponent {
  show: string = ""

  showOptions() {
    if(this.show === "") {
      this.show = "links-show"
    } else {
      this.show = ""
    }
  }
}
