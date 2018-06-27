import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../service/player.service';
import { IPlayer } from '../../../interface/iplayer';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  counter : number = 0;

  constructor(private playerService : PlayerService, private toastr : ToastrService, private userService: UserService) { }

  ngOnInit() {
    if(this.userService.isTokenExpired()) {
      this.userService.logout();
    }
	  this.playerService.getActivePlayers();
  }


  deletePlayer(player : IPlayer) {
  	this.playerService.deletePlayer(player)
  		.subscribe(
  			() => { 
  				this.toastr.error("Player has been successfully deleted", "Player deleted");
  				this.playerService.getRemovedPlayers();
  				this.playerService.getActivePlayers();
  			}
  		)
  }
}
