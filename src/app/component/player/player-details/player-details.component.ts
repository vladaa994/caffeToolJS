import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../../service/player.service';
import { IPlayer } from '../../../interface/iplayer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.css']
})
export class PlayerDetailsComponent implements OnInit {

  player : IPlayer = {
  	id: 0,
  	firstname: "",
  	lastname: "",
  	win: 0,
  	lost: 0,
    image: null
  }

  constructor(private playerService: PlayerService, private activatedRoute : ActivatedRoute) { }

  ngOnInit() {
  	this.activatedRoute.params.subscribe(
  		(route) => {
  			this.playerService.getPlayerById(+route.id)
  				.subscribe(
  					(data) => {
  						this.player = data;
  					},
  					(error) => {
  						console.log(error);
  					}	
  				)
  		}
  	)
  }

}
