import { Component, OnInit, ViewChild } from '@angular/core';
import { IGame } from '../../../interface/igame';
import { BiliardService } from '../../../service/biliard.service';
import { NgForm } from '@angular/forms';
import { PlayerService } from '../../../service/player.service';
import { DatePipe } from '@angular/common';
import { ConfigService } from '../../../service/config.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from '../../../model/user';
import { Player } from '../../../model/player';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-biliard-create',
  templateUrl: './biliard-create.component.html',
  styleUrls: ['./biliard-create.component.css']
})
export class BiliardCreateComponent implements OnInit {

  radioButtons : string[] = ["Free", "League"];
  tableNumbers: number[] = [1, 2, 3];
  isValid: boolean = false;

  game: IGame = {
  	id: null,
  	startTime: new Date(),
  	endTime: null,
  	type: null,
  	paid: false,
  	tableNumber: null,
  	players: null,
  	user: null,
  };

  @ViewChild("f") form : NgForm;

  constructor(private biliardService: BiliardService, private playerService: PlayerService, private datePipe: DatePipe,
  	private config: ConfigService, private toastr: ToastrService, private router: Router, private userService : UserService) { }

  ngOnInit() {
  	this.playerService.getActivePlayers();
    if(this.userService.isTokenExpired()) {
      this.userService.logout();
    }
  }

  radioChange(event) {
  	 this.game.type = event.value;
      if(event.value == "Free") {
       this.isValid = true;
     }
  }

  checkIfTwoPlayersSelected(event) {
    console.log(this.game.type);
    if(event.value.length == 2) {
      this.isValid = true;
    }
     
  }

  createGame(form : NgForm) {
  	// this.game.startTime = this.datePipe.transform(new Date(), "yyyy-MM-dd HH:mm:ss"); 
    this.game.user = new User(+sessionStorage.getItem("userId"));
    if(this.game.players != null) {
      for(let i=0; i < this.game.players.length; i++) {
         this.game.players[i] = new Player(+this.game.players[i])
      }  
    }
    
  	this.biliardService.create(this.game)
  		.subscribe(
  			(response) => {
  				form.reset();
  				this.toastr.success("The game has been successfully created", "Game created");
  				this.biliardService.getActiveGames();
          this.router.navigate(['/biliard']);
  			},
  			(error) => {
  				console.log(error);
  			}
  		)

  }
 
}
