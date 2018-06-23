import { Component, OnInit } from '@angular/core';
import { BiliardService } from '../../../service/biliard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-biliard-active',
  templateUrl: './biliard-active.component.html',
  styleUrls: ['./biliard-active.component.css']
})
export class BiliardActiveComponent implements OnInit {

  constructor(private biliardService : BiliardService, private toastr: ToastrService) { }

  waiter : string;

  ngOnInit() {
  	this.waiter = sessionStorage.getItem("username");
  	this.biliardService.getActiveGames();
  }

  finishGame(id) {
  	this.biliardService.finishGame(id)
  		.subscribe(
  			(data) => {
  				console.log(data);
  				this.toastr.success("Game finished", "");
  				this.biliardService.getActiveGames();
  			}
  		)
  }

  payGame(id: number) {
  	this.biliardService.payGame(id)
  		.subscribe(
  			(result) => {
  				this.toastr.success("Game paid successfully");
  				this.biliardService.getActiveGames();
  			}
  		)
  }

}