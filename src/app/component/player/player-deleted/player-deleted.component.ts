import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../service/player.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-player-deleted',
  templateUrl: './player-deleted.component.html',
  styleUrls: ['./player-deleted.component.css']
})
export class PlayerDeletedComponent implements OnInit {

  constructor(private playerService : PlayerService, private toastr: ToastrService) { }

  ngOnInit() {
  	this.playerService.getRemovedPlayers();
  }


  enablePlayer(id : number) {
  	this.playerService.enablePlayer(id)
  		.subscribe(
  			() => {
  				this.toastr.success("Player has been successfully enabled.", "Player enabled.");
  				this.playerService.getRemovedPlayers();
  				this.playerService.getActivePlayers();
  			}
  		)
  }

}
