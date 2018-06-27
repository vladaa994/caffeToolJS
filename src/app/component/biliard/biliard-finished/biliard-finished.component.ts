import { Component, OnInit } from '@angular/core';
import { BiliardService } from '../../../service/biliard.service';
import { UserService } from '../../../service/user.service'

@Component({
  selector: 'app-biliard-finished',
  templateUrl: './biliard-finished.component.html',
  styleUrls: ['./biliard-finished.component.css']
})
export class BiliardFinishedComponent implements OnInit {

  constructor(private biliardService : BiliardService, private userService : UserService) { }

  ngOnInit() {
  	if(this.userService.isTokenExpired()) {
      this.userService.logout();
    }
  	this.biliardService.getFinishedGames();
  }

}
